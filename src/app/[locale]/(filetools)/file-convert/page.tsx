"use client";

// icons
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdClose, MdDone } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import { LuFileSymlink } from "react-icons/lu";
import { HiOutlineDownload } from "react-icons/hi";

import React, { useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

// ui components
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// types
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// utils
import fileToIcon from "@/utils/file-to-icon";
import compressFileName from "@/utils/compress-filename";
import bytesToSize from "@/utils/byte-to-size";
import convertFile from "@/utils/convert";
import ReactDropzone from "react-dropzone";
import loadFfmpeg from "@/utils/load-ffmpeg";
import { Action } from "@/types/types";
import { useTranslations } from "next-intl";

// file extensions
const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

const Dropzone = () => {
  const ffmpegRef = useRef<any>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<string>("video");
  const [selected, setSelected] = useState<string>("...");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isCoverting, setIsConverting] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const t = useTranslations('FileConvert');

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const downloadAll = (): void => {
    for (let action of actions) {
      !action.is_error && download(action);
    }
  };

  const handleUpload = (data: Array<any>): void => {
    handleExitHover();
    setFiles(data);

    const tmp: Action[] = [];
    data.forEach((file: any) => {
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });

    setActions(tmp);
  };

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const updateAction = (file_name: String, to: String) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          return {
            ...action,
            to,
          };
        }
        return action;
      })
    );
  };

  const convert = async (): Promise<any> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      isCoverting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);
    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);

        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
              ...elt,
              is_converted: true,
              isCoverting: false,
              url,
              output,
            }
            : elt
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
              ...elt,
              is_converted: false,
              isCoverting: false,
              is_error: true,
            }
            : elt
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);
  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  const accepted_files = {
    "image/*": [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".ico",
      ".tif",
      ".tiff",
      ".raw",
      ".tga",
    ],
    "audio/*": [],
    "video/*": [],
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);
  useEffect(() => {
    load();
  }, []);

  if (actions.length) {
    return (
      <div className="space-y-6 py-24 px-4 sm:px-6 md:px-10 lg:px-20 w-full">
        {actions.map((action: any, index: any) => (
          <div
            key={index}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!isLoaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl"></Skeleton>
            )}

            <div className="flex gap-4 items-center px-2">
              <span className="text-2xl text-indigo-500">
                {fileToIcon(action.file_type)}
              </span>

              <div className="flex items-center gap-1">
                <span className="text-md font-medium basis-auto whitespace-nowrap overflow-hidden text-ellipsis">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-gray-400 text-sm basis-auto whitespace-nowrap overflow-hidden text-ellipsis">
                  ({bytesToSize(action.file_size)})
                </span>
              </div>
            </div>

            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2 mr-4">
                <span>{t('ErrorConvertingFile')}</span>
                <BiError />
              </Badge>
            ) : action.is_converted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500 mr-4">
                <span>{t('Done')}</span>
                <MdDone />
              </Badge>
            ) : action.isCoverting ? (
              <Badge variant="default" className="flex gap-2 mr-4">
                <span>{t('Converting')}</span>
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </Badge>
            ) : (
              <div className="text-gray-400 text-md flex items-center gap-4 px-2">
                <span>{t('ConvertTo')}</span>
                <Select
                  onValueChange={(value) => {
                    if (extensions.audio.includes(value)) {
                      setDefaultValues("audio");
                    } else if (extensions.video.includes(value)) {
                      setDefaultValues("video");
                    }
                    updateAction(action.file_name, value);
                  }}
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.file_type.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes("video") && (
                      <Tabs defaultValue={defaultValues} className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            {t('Video')}
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            {t('Audio')}
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.file_type.includes("audio") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.is_converted ? (
              <Button
                className="lg:relative lg:static absolute right-4 bottom-4 lg:right-0 lg:bottom-0"
                variant="outline"
                onClick={() => download(action)}>
                {t('Download')}
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}

        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? t('DownloadAll') : t('Download')}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="outline"
                className="rounded-xl"
              >
                {t('ConvertAnotherFile')}
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!isReady || isCoverting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {isCoverting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>{t('ConvertNow')}</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
      <div className='flex flex-col justify-center items-center mb-4 space-y-2 px-4'>
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-3xl text-center">
          {t('FileConvert')}
        </h1>
        <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed text-center">
          {t('FileConvertDescription')}
        </h1>
      </div>
      <ReactDropzone
        onDrop={handleUpload}
        onDragEnter={handleHover}
        onDragLeave={handleExitHover}
        accept={accepted_files}
        onDropRejected={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: t('ErrorUploadingFile'),
            description: t('AllowedFiles'),
            duration: 5000,
          });
        }}
        onError={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: t('ErrorUploadingFile'),
            description: t('AllowedFiles'),
            duration: 5000,
          });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="flex flex-col w-[300px] md:w-[500px] lg:w-[600px] bg-gray-50 h-80 lg:h-80 xl:h-80 rounded-xl shadow-sm border border-dashed border-gray-500 cursor-pointer items-center justify-center hover:bg-primary/5 duration-300"
          >
            <input {...getInputProps()} />
            <div className="space-y-4 text-gray-500">
              {isHover ? (
                <>
                  <h1 className="flex justify-center text-xl">
                    <LuFileSymlink />
                  </h1>
                  <h1 className="text-lg text-center">
                    {t('DropHere')}
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="flex justify-center text-xl">
                    <IoCloudUploadOutline />
                  </h1>
                  <h1 className="text-lg">
                    {t('ClickOrDrop')}
                  </h1>
                </>
              )}
            </div>
          </div>
        )}
      </ReactDropzone>
    </div>
  );
};

export default Dropzone;

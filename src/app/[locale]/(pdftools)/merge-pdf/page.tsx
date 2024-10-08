"use client"
import React, { useState } from 'react';
import { ArrowLeftRight, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const t = useTranslations('Converter');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const pdfFiles = Array.from(selectedFiles).filter(file => file.type === 'application/pdf');
      if (pdfFiles.length === 0) {
        setError(t('OnlyPdfFilesAreAllowed'));
        return;
      }
      setFiles([...files, ...pdfFiles]);
      setError(null);

      const thumbnailUrls = await generateThumbnails(pdfFiles);
      setThumbnails([...thumbnails, ...thumbnailUrls]);
    }
  };

  const generateThumbnails = async (files: File[]) => {
    const thumbnails: string[] = [];
    for (let file of files) {
      const fileReader = new FileReader();
      const thumbnailUrl = await new Promise<string>((resolve, reject) => {
        fileReader.onload = async function () {
          const typedarray = new Uint8Array(this.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          const page = await pdf.getPage(1); // Sadece ilk sayfanın önizlemesi
          const viewport = page.getViewport({ scale: 0.2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext: any = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;
          resolve(canvas.toDataURL());
        };
        fileReader.readAsArrayBuffer(file);
      });
      thumbnails.push(thumbnailUrl);
    }
    return thumbnails;
  };

  const handleClearFiles = () => {
    setFiles([]);
    setThumbnails([]);
    setMergedPdfUrl(null);
    setError(null);
    setLoading(false);
    setProgress(0);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError(t('PleaseSelectAtLeastTwoFiles'));
      return;
    }

    setLoading(true);
    setProgress(25);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const existingPdfBytes = await file.arrayBuffer();
        const existingPdf = await PDFDocument.load(existingPdfBytes);
        const copiedPages = await mergedPdf.copyPages(existingPdf, existingPdf.getPageIndices());
        copiedPages.forEach((page: any) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const pdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setMergedPdfUrl(url);
      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setError(t('ErrorMergingPdfPleaseTryAgain'));
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (mergedPdfUrl) {
      const link = document.createElement('a');
      link.href = mergedPdfUrl;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newFiles = Array.from(files);
    const [movedFile] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, movedFile);
    setFiles(newFiles);

    const newThumbnails = Array.from(thumbnails);
    const [movedThumbnail] = newThumbnails.splice(result.source.index, 1);
    newThumbnails.splice(result.destination.index, 0, movedThumbnail);
    setThumbnails(newThumbnails);
  };

  return (
    <div className='flex flex-col justify-center items-center py-24 md:py-24 lg:py-24'>
      <div className='flex flex-col justify-center items-center mb-4 space-y-2'>
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-3xl text-center">
          {t('MergePdfFiles')}
        </h1>
        <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed text-center">
          {t('YouCanMergeMultiplePdfFilesIntoOneFile')}
        </h1>
      </div>
      <Card className="w-96 h-auto">
        <CardContent className="p-6 space-y-4">
          {!mergedPdfUrl && (
            <>
              <div className="space-y-2 text-sm">
                <Label htmlFor="file" className="text-sm font-medium">{t('Files')}</Label>
                <Input
                  id="file"
                  type="file"
                  placeholder={t('Files')}
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className='cursor-pointer'
                />
              </div>
            </>
          )}
          {loading && <Progress value={progress} className="w-full mb-4" />}
          {error && <div className="text-red-500">{error}</div>}
          {files.length > 0 && !mergedPdfUrl && (
            <div className="mt-4">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="pdfFiles">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {files.map((file, index) => (
                        <Draggable key={file.name} draggableId={file.name} index={index}>
                          {(provided) => (
                            <div
                              className="mb-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card className="w-24 h-32 p-2 flex flex-col justify-center items-center">
                                <CardContent className="p-2">
                                  <img
                                    src={thumbnails[index]}
                                    alt={`PDF File ${index + 1}`}
                                    className="object-contain rounded-lg w-16 h-24"
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Button onClick={handleClearFiles} className="mt-2">{t('ClearFiles')}</Button>
            </div>
          )}
          {mergedPdfUrl && (
            <div className='flex flex-col justify-center items-center'>
              <img
                src='/assets/icons/files/png/016-pdf.png'
                alt={t('MergedPdfIcon')}
                className="object-contain rounded-lg w-16 h-16 mt-4"
              />
              <div className="mt-4 text-xs text-muted-foreground text-center">
                {t('YourMergedPdfIsReady')}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {files.length > 0 && !mergedPdfUrl ? (
            <Button size="lg" onClick={handleMerge} className="flex justify-center items-center space-x-2 w-full">
              <ArrowLeftRight className='w-4 h-4' /> <p>{t('Merge')}</p>
            </Button>
          ) : (
            mergedPdfUrl && (
              <Button size="lg" onClick={handleDownload} className="flex justify-center items-center space-x-2 w-full">
                <Download className='w-4 h-4' /> <p>{t('Download')}</p>
              </Button>
            )
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

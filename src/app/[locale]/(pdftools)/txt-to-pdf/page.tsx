"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftRight, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { formatFileSize, getFileExtension } from '@/utils/getFileExtension';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image';

export default function TxtToPdfConversion() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [convertedFileIcon, setConvertedFileIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const t = useTranslations('Converter');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const fileSizeLimit = 10 * 1024 * 1024; // 10MB
      const validFileTypes = ['.txt'];

      if (!validFileTypes.includes(getFileExtension(selectedFile.name))) {
        setError(t('OnlyTxtFilesAreAllowed'));
        setFile(null);
      } else if (selectedFile.size > fileSizeLimit) {
        setError(t('FileSizeMustBeLessThan10MB'));
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileSizeLimit = 10 * 1024 * 1024; // 10MB
      const validFileTypes = ['.txt'];

      if (!validFileTypes.includes(getFileExtension(droppedFile.name))) {
        setError(t('OnlyTxtFilesAreAllowed'));
        setFile(null);
      } else if (droppedFile.size > fileSizeLimit) {
        setError(t('FileSizeMustBeLessThan10MB'));
        setFile(null);
      } else {
        setFile(droppedFile);
        setError(null);
      }
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setFileId(null);
    setConvertedFileIcon(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError(t('PleaseSelectAFile'));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const inputExt = getFileExtension(file.name);
    formData.append('inputExt', inputExt);
    formData.append('outputExt', ".pdf");

    try {
      setLoading(true);
      setProgress(25); // Simulate progress
      const response = await axios.post('http://localhost:8080/convert/convert-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFileId(response.data.fileId);
      setConvertedFileIcon('/assets/icons/files/png/016-pdf.png'); // Assuming converted file is always PDF
      setProgress(100); // Complete progress
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(t('ErrorUploadingFilePleaseTryAgain'));
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (fileId) {
      try {
        setLoading(true);
        setProgress(50); // Simulate progress
        const response = await axios.get(`http://localhost:8080/download/${fileId}`, {
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file!.name.replace(/\.[^/.]+$/, "") + ".pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        setProgress(100); // Complete progress
        setLoading(false);
      } catch (error) {
        console.error('Error downloading file:', error);
        setError(t('ErrorDownloadingFilePleaseTryAgain'));
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center py-24 md:py-24 lg:py-24'>
      <div className='flex flex-col justify-center items-center mb-4 space-y-2'>
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-3xl text-center">
          {t('ConvertTxtToPDF')}
        </h1>
        <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed text-center">
          {t('YouCanTurnTxtFilesIntoEasyToReadFilesByConvertingThemToPDF')}
        </h1>
      </div>
      <Card className="w-96 h-auto">
        <CardContent className="p-6 space-y-4">
          {!fileId && (
            <>
              <div
                className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <Image src="/assets/icons/files/png/026-txt.png" alt='txt' width={32} height={32} />
                <span className="text-sm font-medium text-gray-500">{t('DragAndDropOrClick')}</span>
                <span className="text-xs text-gray-500">txt</span>
              </div>
              <div className="space-y-2 text-sm">
                <Label htmlFor="file" className="text-sm font-medium">
                  {t('File')}
                </Label>
                <Input id="file"
                  type="file"
                  placeholder={t('File')}
                  accept=".txt"
                  onChange={handleFileChange}
                  className='cursor-pointer' />
              </div>
            </>
          )}
          {loading && <Progress value={progress} className="w-full mb-4" />}
          {error && <div className="text-red-500">{error}</div>}
          {file && !fileId && (
            <div className="mt-4">
              <div>{file.name} ({formatFileSize(file.size)})</div>
              <Button onClick={handleClearFile} className="mt-2">{t('ClearFile')}</Button>
            </div>
          )}
          {convertedFileIcon && fileId && (
            <div className='flex flex-col justify-center items-center'>
              <img
                src={convertedFileIcon}
                alt={t('ConvertedFileIcon')}
                className="object-contain rounded-lg w-16 h-16 mt-4"
              />
              <div className="mt-4 text-xs text-muted-foreground text-center">
                {file!.name.replace(/\.[^/.]+$/, ".pdf")} <br />({formatFileSize(file!.size)})
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {file && !fileId ? (
            <Button size="lg" onClick={handleSubmit} className="flex justify-center items-center space-x-2 w-full">
              <ArrowLeftRight className='w-4 h-4' /> <p>{t('Convert')}</p>
            </Button>
          ) : (
            <Button size="lg" onClick={handleDownload} className="flex justify-center items-center space-x-2 w-full">
              <Download className='w-4 h-4' /> <p>{t('Download')}</p>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftRight, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import FileUpload from '@/components/shared/file-upload';
import { formatFileSize, getFileExtension } from '@/utils/getFileExtension';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function JpgToPdfConversion() {
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
      const validFileTypes = ['.jpg', '.jpeg', '.png'];

      if (!validFileTypes.includes(getFileExtension(selectedFile.name))) {
        setError(t('OnlyJpgJpegAndPngFilesAreAllowed'));
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
      const validFileTypes = ['.jpg', '.jpeg', '.png'];

      if (!validFileTypes.includes(getFileExtension(droppedFile.name))) {
        setError(t('OnlyJpgJpegAndPngFilesAreAllowed'));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <section className="flex flex-col justify-center items-center w-full py-24 md:py-24 lg:py-24 px-20">
      <h1 className="text-2xl font-bold mb-4">{t('JpgToPDF')}</h1>
      <FileUpload
        file={file}
        error={error}
        onFileChange={handleFileChange}
        onDrop={handleDrop}
        onClearFile={handleClearFile}
      />
      <div className="w-full max-w-md mt-4">
        {loading && <Progress value={progress} className="w-full mb-4" />}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {file && !fileId && (
            <button type="submit" className="flex justify-center items-center space-x-2 w-full mt-4 p-2 bg-primary text-white rounded-lg">
              <div><ArrowLeftRight className='w-4 h-4' /></div> <p>{t('Convert')}</p>
            </button>
          )}
          {convertedFileIcon && fileId && (
            <>
              <Image
                src={convertedFileIcon}
                alt={t('ConvertedFileIcon')}
                className="object-contain rounded-lg w-16 h-16 mt-4"
              />
              <div className="mt-4 text-xs text-muted-foreground text-center">
                {file!.name.replace(/\.[^/.]+$/, ".pdf")} <br />({formatFileSize(file!.size)})
              </div>
              <button onClick={handleDownload} className="flex justify-center items-center space-x-2 w-full mt-4 p-2 bg-primary text-white rounded-lg">
                <div><Download className='w-4 h-4' /></div> <p>{t('Download')}</p>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

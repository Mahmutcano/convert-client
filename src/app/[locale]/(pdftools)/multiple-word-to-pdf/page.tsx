"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight, CloudUploadIcon, Download, XIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

export default function BulkFileConversion() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [bulkFileId, setBulkFileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    Array.from(e.dataTransfer.files).forEach(file => dataTransfer.items.add(file));
    setFiles(dataTransfer.files);
  };

  const handleClearFiles = () => {
    setFiles(null);
    setBulkFileId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setError('Please select files.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const inputExt = getFileExtension(files[0].name);
    formData.append('inputExt', inputExt);
    formData.append('outputExt', ".pdf");

    try {
      setLoading(true);
      setProgress(25); // Simulate progress
      const response = await axios.post('http://localhost:8080/convert/bulk-convert-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setBulkFileId(response.data.fileId);
      setProgress(100); // Complete progress
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Error uploading files. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (bulkFileId) {
      try {
        setLoading(true);
        setProgress(50); // Simulate progress
        const response = await axios.get(`http://localhost:8080/download/${bulkFileId}`, {
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'converted_files.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        setProgress(100); // Complete progress
        setLoading(false);
      } catch (error) {
        console.error('Error downloading files:', error);
        setError('Error downloading files. Please try again.');
        setLoading(false);
      }
    }
  };

  const getFileExtension = (fileName: string) => {
    return fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  };

  const getFileIcon = (fileName: string) => {
    const ext = getFileExtension(fileName);
    switch (ext) {
      case '.pdf':
        return '/assets/icons/files/png/016-pdf.png';
      case '.doc':
      case '.docx':
        return '/assets/icons/files/png/005-doc.png';
      case '.xls':
      case '.xlsx':
        return '/assets/icons/files/png/006-xls.png';
      case '.ppt':
      case '.pptx':
        return '/assets/icons/files/png/004-ppt.png';
      case '.txt':
        return '/assets/icons/files/png/013-txt.png';
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
        return URL.createObjectURL(new Blob([fileName]));
      default:
        return '/assets/icons/files/png/017-file.png';
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full py-24 md:py-24 lg:py-24">
      <h1 className="text-2xl font-bold mb-4">Multiple Word to PDF</h1>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center w-full max-w-md p-8 border border-dashed border-primary rounded-lg bg-background hover:bg-muted transition-colors h-[450px] overflow-y-auto"
      >
        {loading && (
          <Progress value={progress} className="w-full mb-4" />
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {files && files.length > 0 ? (
            <div className="w-full flex flex-wrap justify-center overflow-y-auto">
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex flex-col justify-center items-center border border-dashed p-2 m-2 rounded-lg shadow-md relative w-1/3">
                  <Image
                    src={getFileIcon(file.name)}
                    alt="Uploaded file preview"
                    className="object-contain rounded-lg w-16 h-16"
                  />
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    {file.name} <br />({(file.size / 1024 / 1024).toFixed(2)}MB)
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={handleClearFiles}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <CloudUploadIcon className="w-12 h-12 text-primary" />
              <div className="mt-4 text-lg font-medium">Drag and drop files</div>
              <div className="mt-2 text-sm text-muted-foreground">
                or{" "}
                <label htmlFor="file-input" className="text-primary underline cursor-pointer">
                  select files
                </label>
              </div>
            </>
          )}
          <Input id="file-input" type="file" className="sr-only" onChange={handleFileChange} multiple />
          {files && !bulkFileId && (
            <button type="submit" className="flex justify-center items-center space-x-2 w-full mt-4 p-2 bg-primary text-white rounded-lg">
              <div><ArrowLeftRight className='w-4 h-4' /></div> <p>PDF Convert</p>
            </button>
          )}
          {bulkFileId && (
            <>
              <button onClick={handleDownload} className="flex justify-center items-center space-x-2 w-full mt-4 p-2 bg-primary text-white rounded-lg">
                <div><Download className='w-4 h-4' /></div> <p>Download Multiple PDF Files</p>
              </button>
            </>
          )}
          {error && <div className="mt-4 text-sm font-medium text-red-500">{error}</div>}
        </form>
      </div>
    </section>
  );
}

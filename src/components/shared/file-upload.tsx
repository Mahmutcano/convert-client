"use client"
// FileUpload.tsx
import React from 'react';
import { CloudUploadIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getFileIcon } from '@/utils/getFileExtension';
import Image from 'next/image';

interface FileUploadProps {
  file: File | null;
  error: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClearFile: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, error, onFileChange, onDrop, onClearFile }) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="flex flex-col items-center justify-center w-full max-w-md p-8 border border-dashed border-primary rounded-lg bg-background hover:bg-muted transition-colors h-[250px]"
    >
      {file ? (
        <div className="w-full flex flex-col items-center border border-dashed p-4 m-2 rounded-lg shadow-md relative">
          <Image
            src={getFileIcon(file)}
            alt="Uploaded file preview"
            className="object-contain rounded-lg w-24 h-24"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            onClick={onClearFile}
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            {file.name} <br />({(file.size / 1024 / 1024).toFixed(2)}MB)
          </div>
        </div>
      ) : (
        <>
          <CloudUploadIcon className="w-12 h-12 text-primary" />
          <div className="mt-4 text-lg font-medium">Drag and drop a file</div>
          <div className="mt-2 text-sm text-muted-foreground">
            or{" "}
            <label htmlFor="file-input" className="text-primary underline cursor-pointer">
              select a file
            </label>
          </div>
        </>
      )}
      <Input id="file-input" type="file" className="sr-only" onChange={onFileChange} />
      {error && <div className="mt-4 text-sm font-medium text-red-500">{error}</div>}
    </div>
  );
};

export default FileUpload;

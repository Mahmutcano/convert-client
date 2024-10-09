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
import Image from 'next/image';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [splitPdfUrls, setSplitPdfUrls] = useState<string[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const t = useTranslations('Converter');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);

      // PDF küçük resimlerini oluştur
      const thumbnailUrls = await generateThumbnails(selectedFile);
      setThumbnails(thumbnailUrls);
    } else {
      setError(t('OnlyPdfFilesAreAllowed'));
      setFile(null);
    }
  };

  const generateThumbnails = async (file: File) => {
    const fileReader = new FileReader();
    return new Promise<string[]>((resolve, reject) => {
      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const totalPages = pdf.numPages;
        const thumbnailUrls: string[] = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
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
          thumbnailUrls.push(canvas.toDataURL());
        }

        resolve(thumbnailUrls);
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleClearFile = () => {
    setFile(null);
    setSplitPdfUrls([]);
    setThumbnails([]);
    setError(null);
    setLoading(false);
    setProgress(0);
  };

  const handleSplit = async () => {
    if (!file) {
      setError(t('PleaseSelectAFile'));
      return;
    }

    setLoading(true);
    setProgress(25);

    try {
      const existingPdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const totalPages = pdfDoc.getPageCount();
      const pdfUrls: string[] = [];

      for (let i = 0; i < totalPages; i++) {
        const splitPdf = await PDFDocument.create();
        const [copiedPage] = await splitPdf.copyPages(pdfDoc, [i]);
        splitPdf.addPage(copiedPage);

        const splitPdfBytes = await splitPdf.save();
        const pdfBlob = new Blob([splitPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        pdfUrls.push(url);
      }

      setSplitPdfUrls(pdfUrls);
      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      setError(t('ErrorSplittingPdfPleaseTryAgain'));
      setLoading(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `split_page_${index + 1}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col justify-center items-center py-24 md:py-24 lg:py-24'>
      <div className='flex flex-col justify-center items-center mb-4 space-y-2'>
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-3xl text-center">
          {t('SplitPdfFiles')}
        </h1>
        <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed text-center">
          {t('YouCanSplitSinglePdfIntoMultipleFiles')}
        </h1>
      </div>
      <Card className="w-96 h-auto">
        <CardContent className="p-6 space-y-4">
          {!file && (
            <>
              <div className="space-y-2 text-sm">
                <Label htmlFor="file" className="text-sm font-medium">{t('File')}</Label>
                <Input
                  id="file"
                  type="file"
                  placeholder={t('File')}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className='cursor-pointer'
                />
              </div>
            </>
          )}
          {loading && <Progress value={progress} className="w-full mb-4" />}
          {error && <div className="text-red-500">{error}</div>}
          {file && !splitPdfUrls.length && (
            <div className="mt-4">
              <div>{file.name}</div>
              <Button onClick={handleClearFile} className="mt-2">{t('ClearFile')}</Button>
            </div>
          )}
          {thumbnails.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {thumbnails.map((thumbnail, index) => (
                <Card key={index} className="flex flex-col justify-center items-center">
                  <CardContent className="p-4">
                    <Image
                      src={thumbnail}
                      alt={`Page ${index + 1}`}
                      className="object-contain rounded-lg w-32 h-32"
                    />
                  </CardContent>
                  <CardFooter className="w-full">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(splitPdfUrls[index], index)}
                      className="flex justify-center items-center space-x-2 w-full"
                    >
                      <Download className='w-4 h-4' /> <p>{t('DownloadPage')} {index + 1}</p>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {file && !splitPdfUrls.length ? (
            <Button size="lg" onClick={handleSplit} className="flex justify-center items-center space-x-2 w-full">
              <ArrowLeftRight className='w-4 h-4' /> <p>{t('Split')}</p>
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}

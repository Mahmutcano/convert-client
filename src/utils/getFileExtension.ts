// helpers.ts

export const getFileExtension = (fileName: string) => {
  return fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
};

export const getFileIcon = (file: File | null) => {
  if (!file) return '/assets/icons/files/png/017-file.png';

  const ext = getFileExtension(file.name);
  switch (ext) {
    case '.pdf':
      return '/assets/icons/files/png/016-pdf.png';
    case '.doc':
    case '.docx':
      return '/assets/icons/files/png/005-doc.png';
    case '.xls':
    case '.xlsx':
      return '/assets/icons/files/png/031-xls.png';
    case '.ppt':
    case '.pptx':
      return '/assets/icons/files/png/018-powerpoint.png';
    case '.txt':
      return '/assets/icons/files/png/026-txt.png';
    case '.html':
    case '.htm':
      return '/assets/icons/files/png/017-php.png';
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
      return URL.createObjectURL(file);
    default:
      return '/assets/icons/files/png/017-file.png';
  }
};

export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size.toFixed(2)} Bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
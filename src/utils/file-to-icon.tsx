// imports
  import Image from 'next/image';
import { FiFileText  } from 'react-icons/fi';
  
  export default function fileToIcon(file_type: any): any {
    if (file_type.includes('video')) return <Image src="/assets/icons/files/png/029-video.png" alt='video' width={32} height={32} />;
    if (file_type.includes('audio')) return <Image src="/assets/icons/files/png/013-mp3.png" alt='audio' width={32} height={32} />;
    if (file_type.includes('text')) return <Image src="/assets/icons/files/png/024-text.png" alt='text' width={32} height={32} />;
    if (file_type.includes('image')) return <Image src="/assets/icons/files/png/010-image.png" alt='image' width={32} height={32} />;
    else return <FiFileText />;
  }
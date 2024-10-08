// utils/getBlogPost.ts

export const getBlogPost = (locale: string) => [
    {
      slug: 'convert-pdf-to-word',
      title: locale === 'en' ? 'How to Convert PDF to Word' : 'PDF\'yi Word\'e Nasıl Çevrilir?',
      content: locale === 'en'
        ? 'This guide will teach you how to convert PDF to Word using our tools.'
        : 'Bu kılavuz, araçlarımızı kullanarak PDF\'yi Word\'e nasıl çevireceğinizi gösterecek.',
    },
    {
      slug: 'compress-pdf-file',
      title: locale === 'en' ? 'How to Compress PDF File' : 'PDF Dosyasını Nasıl Sıkıştırırsınız?',
      content: locale === 'en'
        ? 'In this article, you will learn to compress PDF files for optimal size.'
        : 'Bu makalede, PDF dosyalarını en uygun boyuta sıkıştırmayı öğreneceksiniz.',
    },
  ];
  
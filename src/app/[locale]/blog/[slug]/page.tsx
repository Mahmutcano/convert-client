import { GetStaticPaths, GetStaticProps } from 'next';
import { getBlogPost } from '@/utils/getBlogPost';

interface BlogPostProps {
  title: string;
  content: string;
}

export default function BlogPost({ title, content }: BlogPostProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

// Generate all possible slugs for static paths
export const getStaticPaths: GetStaticPaths = async () => {
  const blogPosts = getBlogPost('en'); // Default to English posts for paths
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // Returns 404 for undefined paths
  };
};

// Fetch the blog post based on the slug and locale
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const blogPosts = getBlogPost(locale || 'en');
  const post = blogPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      title: post.title,
      content: post.content,
    },
  };
};

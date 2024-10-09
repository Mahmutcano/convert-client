import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 'attr-accept' modülü için alias ekleniyor
    config.resolve.alias = {
      ...config.resolve.alias,
      'attr-accept': path.resolve(__dirname, 'node_modules/attr-accept'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig)

import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/, // process .md and .mdx files
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com'], // allow images from GitHub
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}


export default withMDX(nextConfig);
// module.exports = withMDX(nextConfig);
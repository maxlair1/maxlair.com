import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/, // process .md and .mdx files
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com'), new URL('https://github.com')], // allow images from GitHub
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  outputFileTracingIncludes: {
    '/**': ['./app/content/**/*']
  }
}


export default withMDX(nextConfig);
// module.exports = withMDX(nextConfig);
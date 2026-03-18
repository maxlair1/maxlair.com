import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/, // process .md and .mdx files
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  transpilePackages: ['three'],
  images: {
    remotePatterns: [{hostname: 'raw.githubusercontent.com'}, {hostname: 'github.com'}], // allow images from GitHub
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  outputFileTracingIncludes: {
    '/**': ['./app/content/**/*']
  },
  env: {
    GITHUB_USER: process.env.GITHUB_USER,
    GITHUB_REPO: process.env.GITHUB_REPO,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
}


export default withMDX(nextConfig);
// module.exports = withMDX(nextConfig);
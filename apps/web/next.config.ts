import createMDX from '@next/mdx';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // @ts-expect-error Turbopackではremarkプラグインをパッケージ名で指定する
    remarkPlugins: [['remark-gfm']],
  },
});

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  reactStrictMode: true,
};

export default withMDX(nextConfig);

import type { NextConfig } from "next";

// Static-export config for the GitHub Pages demo. Kept entirely separate
// from next.config.ts so the real app (dev/build/start, Prisma, API routes)
// is untouched. Only used by .github/workflows/deploy-pages.yml, which
// swaps this in as next.config.ts for the CI build only.
const REPO_NAME = "acecourt-tennis-booking";
const BASE_PATH = `/${REPO_NAME}`;

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: `${BASE_PATH}/`,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    STATIC_DEMO: "1",
    BASE_PATH,
  },
};

export default nextConfig;

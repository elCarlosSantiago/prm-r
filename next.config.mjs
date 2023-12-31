/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: ["images.clerk.dev", "images.clerk.staging.dev", "images.clerk"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

export default config

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // NOTE: You might need to configure assetPrefix for gh-pages if you are deploying to a subdirectory.
  // For example: assetPrefix: '/nextportfolio/',
  // basePath: '/nextportfolio',
};
module.exports = nextConfig;

// Content-Security-Policy: frame-ancestors 'self' https://www.google.com
//Possible Github Pages limitation to Google recaptcha

/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['ui']);
module.exports = withTM({
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'graphql', 'utils', 'app'],
  },
  async headers() {
    return [
      {
        source: '/fonts/RightGrotesk-SpatialBold.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/RightGrotesk-SpatialDark.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/RightGrotesk-WideBold.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  i18n,
});

const path = require('path')
const webpackConfig = require('./webpack.config')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

module.exports = withTypescript(withBundleAnalyzer(
  withMDX({
    exportPathMap: async function(defaultPathMap) {
      return {
        '/': { page: '/mining' }
      }
    },
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      config.resolve = {
        ...webpackConfig.resolve,
        ...config.resolve
      }
      return config
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    publicRuntimeConfig: {
      segmentWriteKey: process.env.SEGMENT_WRITE_KEY || 'ytmyrpwXzhFF34b0CpNxzdYTRcEFRMzq'
    },
    env: {
      INTL_DROPBOX_URL: process.env.INTL_DROPBOX_URL,
      US_DROPBOX_URL: process.env.US_DROPBOX_URL
    },
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: './bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: './bundles/client.html'
      }
    }
  })
))

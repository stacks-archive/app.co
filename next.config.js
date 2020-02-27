const path = require('path')
const webpackConfig = require('./webpack.config')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = withBundleAnalyzer(
  withMDX({
    webpack: (config) => {
      config.resolve = {
        ...webpackConfig.resolve,
        ...config.resolve
      }
      return config
    },
    publicRuntimeConfig: {
      segmentWriteKey: process.env.SEGMENT_WRITE_KEY || 'ytmyrpwXzhFF34b0CpNxzdYTRcEFRMzq'
    },
    env: {
      API_SERVER: process.env.API_SERVER || 'https://api.app.co',
      FATHOM_ID: process.env.FATHOM_ID
    }
  })
)

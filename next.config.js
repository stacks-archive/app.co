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
  })
)

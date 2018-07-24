const path = require('path')
const webpackConfig = require('./webpack.config')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve = webpackConfig.resolve
    return config
  }
})

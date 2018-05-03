const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@containers': path.resolve(__dirname, 'containers'),
      '@common': path.resolve(__dirname, 'common'),
      '@pages': path.resolve(__dirname, 'pages'),
    },
  },
};

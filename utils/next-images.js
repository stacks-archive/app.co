module.exports = (nextConfig = {}) => {
  return { ...nextConfig, webpack(config, options) {
      const { isServer } = options;
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      config.module.rules.push({
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          quality: 60,
          adapter: require('responsive-loader/sharp'),
          placeholder: true,
          placeholderSize: 80
        }
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }};
};

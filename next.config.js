/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (moduleLoader.loader?.includes('css-loader') && !moduleLoader.loader?.includes('postcss-loader')) {
          if (typeof moduleLoader.options.modules === 'object') {
            moduleLoader.options = {
              ...moduleLoader.options,
              modules: {
                ...moduleLoader.options.modules,
                exportLocalsConvention: 'camelCase',
              },
            };
          }
        }
      });
    });

    return config;
  },
}

module.exports = nextConfig;

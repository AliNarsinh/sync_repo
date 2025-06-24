const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { stderr } = require('process');

const paths = {
  build: path.resolve(__dirname, 'build'),
  node_modules: path.resolve(__dirname, 'node_modules'),
  html: path.resolve(__dirname, 'src/index.html'),
  icon: path.resolve(__dirname, 'src/favicon.ico'),
  src: path.resolve(__dirname, 'src'),
};


module.exports = {
  webpack: function override(config, env) {
    config.resolve = {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [paths.src, paths.node_modules],
      alias: {
        ...config.resolve.alias,
        '@app': path.resolve(__dirname, 'src'),
      }
    };
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.node_modules, '@binah/web-sdk/dist'),
            to: path.resolve(paths.build),
            globOptions: {
              ignore: ['**/main.*'],
            },
          },
        ],
      })
    ]
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
      ]
    }
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    const wasmExtensionRegExp = /\.wasm$/;
    config.resolve.extensions.push('.wasm');
    config.module.rules.forEach(rule => {
        (rule.oneOf || []).forEach(oneOf => {
            if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });

    config.module.rules.push({
      test: wasmExtensionRegExp,
      include: path.resolve(__dirname),
      use: [{ loader: require.resolve('wasm-loader'), options: {} }]
  });

    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      return {
        ...config,
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
        }
      };
    };
  },
};

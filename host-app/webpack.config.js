const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

// Environment variables for remote URLs
const CHAT_APP_URL = process.env.CHAT_APP_URL || 'http://localhost:3001';
const EMAIL_APP_URL = process.env.EMAIL_APP_URL || 'http://localhost:3002';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    mode: argv.mode || 'development',
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    output: {
      publicPath: isProduction ? '/' : 'http://localhost:3000/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          chatApp: `chatApp@${CHAT_APP_URL}/remoteEntry.js`,
          emailApp: `emailApp@${EMAIL_APP_URL}/remoteEntry.js`,
        },
        exposes: {
          './Button': './src/design-system/Button.jsx',
          './Card': './src/design-system/Card.jsx',
          './theme': './src/design-system/theme.css',
          './eventBus': './src/eventBus.js',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};

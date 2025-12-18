const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

// Environment variable for host URL
const HOST_APP_URL = process.env.HOST_APP_URL || 'http://localhost:3000';

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        mode: argv.mode || 'development',
        devServer: {
            port: 3002,
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        output: {
            publicPath: isProduction ? 'auto' : 'http://localhost:3002/',
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
                name: 'emailApp',
                filename: 'remoteEntry.js',
                remotes: {
                    host: `host@${HOST_APP_URL}/remoteEntry.js`,
                },
                exposes: {
                    './Email': './src/Email.jsx',
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

const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        main: './src/main.js',
        page: './src/page.js',
        popup: './src/popup.js'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.vue$/,
            use: ['vue-loader']
        },
        {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
        }
      ]
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/manifest.json'),
                to: path.resolve(__dirname, 'dist/')
            },
            {
                from: path.resolve(__dirname, 'src/popup.html'),
                to: path.resolve(__dirname, 'dist/')
            },
            {
                from: path.resolve(__dirname, 'src/page.html'),
                to: path.resolve(__dirname, 'dist/')
            },
            {
                from: path.resolve(__dirname, 'src/css/app.css'),
                to: path.resolve(__dirname, 'dist/css/')
            }
        ])
    ]
};
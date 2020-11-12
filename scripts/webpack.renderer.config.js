const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports= {
  devtool: process.env.NODE_ENV === 'production' ? 'none' : '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../src/renderer/index.js')
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,  
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env',{
                  targets: {
                    "chrome": "80",
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins:[
              [  "@babel/plugin-transform-runtime",
                {
                  "corejs": 2,
                }
              ],
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name:'[name].[ext]',
            outputPath:"images/"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,   
            name:'[name].[ext]',
            outputPath:"fonts/"
          }
        }
      }
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'../public/index.html')
    })
  ],
  output:{
    path:path.resolve(__dirname,'../build'),
    filename:'renderer.js'
  },
  target: 'electron-renderer'
}
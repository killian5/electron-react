const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports= {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../js_renderer/index.js')
  },
  module:{
    rules: [
      {
        test: /\.css|.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.js$/,  
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react']
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
            outputPath:'images/'
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
            outputPath:'fonts/'
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
  resolve: {
    extensions: ['.js','.json'],
    alias:{
      '@redux': path.resolve(__dirname, '../js_renderer/redux/'),
      'components':path.resolve(__dirname,'../js_renderer/components/')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output:{
    path:path.resolve(__dirname,'../build'),
    filename:'renderer.js'
  },
  target: 'electron-renderer'
}
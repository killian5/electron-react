const path = require('path');

module.exports= {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    main: path.join(__dirname, '../js_main/index.js')
  },
  module:{
    rules: [
      {
        test: /\.js$/,  
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  output:{
    path:path.resolve(__dirname,'../build'),
    filename:'main.js'
  },
  target: 'electron-main'
}
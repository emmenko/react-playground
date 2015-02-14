var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory()
}
var EXAMPLES_DIR = __dirname + '/examples'

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
    var isDraft = dir.charAt(0) === '_' || dir === 'node_modules'

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir)))
      entries[dir] = [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(EXAMPLES_DIR, dir, 'main.jsx')
      ]

    return entries
  }, {}),

  output: {
    path: './build',
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },

  module: {
    noParse: [],
    loaders: [
      { test: /\.scss$/, loader: 'style!css!sass' }, // use ! to chain loaders
      { test: /\.json$/, loader: 'json-loader' },
      { test: /(\.js|\.jsx)$/, loaders: ['react-hot', '6to5-loader', 'jsx-loader?harmony'], exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

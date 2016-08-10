var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackStripLoader = require('strip-loader');

var env = process.env.MIX_ENV || 'dev'
var prod = env === 'prod'

var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}

var hostname = process.env.HOST_NAME || 'command-center.lumaops.com'
var hostport = process.env.HOST_PORT || '4000'
var api_key = process.env.API_KEY || 'T66Tln77fwWeu7UDA3ApCj90h7v3U2Fc'

var webpackConfig = {
  output: {
    path: './priv/static',
    filename: '/js/app.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    'Config': JSON.stringify(prod ? {
      API_HOST: "https://" + hostname,
      API_KEY: api_key,
      API_SOCKET: "wss://" + hostname + ":" + hostport + "/socket"
    } : {
      API_HOST: "http://localhost:4000",
      API_SOCKET: "ws://localhost:4000/socket/websocket?vsn=1.0.0",
      API_KEY: api_key
    })
  }
};

if (prod == true) {
  console.log("*webpack production config");

  webpackConfig = merge(webpackConfig,{
    devtool: "source-map",
    entry : [
      './web/static/js/app.js'
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react,plugins[]=transform-runtime',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.json$/, loader: "json"},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
    ]},
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin("/css/app.css"),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  });

  var stripLoader = {
   test: [/\.js$/, /\.es6$/],
   exclude: /node_modules/,
   loader: WebpackStripLoader.loader('console.log')
  }
  webpackConfig.module.loaders.push(stripLoader);
}else{
  console.log("webpack development config");

  webpackConfig = merge(webpackConfig,{
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react,plugins[]=transform-runtime'],
        exclude: /node_modules/,
        include: __dirname,
        env: {
          development: {
            plugins: [
              'react-transform'
            ],
            extra: {
              'react-transform': {
                transforms: [{
                  transform:  'react-transform-hmr',
                  imports: ['react'],
                  locals:  ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react','redbox-react' ]
                }
              ]}
            }
          }
        }
      },
      { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.json$/, loader: "json"},
      //      { test: /\.css$/, loader: 'style-loader!css-loader'}
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }

    ]},
    entry : [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      './web/static/js/app.js'
    ],
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("/css/app.css")
    ]
  });

}

module.exports = webpackConfig;

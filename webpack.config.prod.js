const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Config = require("./_config");
const MarkdownRSSGeneratorPlugin = require("markdown-rss-generator-webpack-plugin").default;
const MarkdownToJS = require("markdown-to-js-webpack-plugin").default;
const MarkdownSiteMapGeneratorPlugin = require("markdown-sitemap-generator-webpack-plugin").default;
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: "production",
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, 'src/index.js')
  ],
  mode: "production",
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        loaders: ['unlazy'],
        include: /node_modules\/markdown-toc/
      },
      {
        test: /(\.css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'posts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyPlugin(
      [
        {
          context: __dirname + '/src',
          from: 'netlify.toml',
          to: '',
        },
        {
          context: __dirname + "/posts",
          from: 'images/**/*',
          to: '',
        }
      ]
    ),
    new MarkdownSiteMapGeneratorPlugin({
      host: Config.url,
      links: [
        "https://www.eatsomemore.com/posts/categories/%E6%B8%B8%E8%AE%B0?tags=%E8%8B%B1%E5%9B%BD&pagetype=uk-tour",
        "https://www.eatsomemore.com/posts/categories/%E7%BE%8E%E9%A3%9F?tags=%E8%8B%B1%E5%9B%BD&pagetype=uk-food",
        "https://www.eatsomemore.com/posts/categories/%E6%94%BB%E7%95%A5?tags=%E8%8B%B1%E5%9B%BD&pagetype=uk-play",
        "https://www.eatsomemore.com/posts/categories/%E9%A2%84%E5%AE%9A?tags=%E8%8B%B1%E5%9B%BD&pagetype=uk-guide",
        "https://www.eatsomemore.com/posts/categories/%E6%B8%B8%E8%AE%B0?extags=%E8%8B%B1%E5%9B%BD&pagetype=other-tour",
        "https://www.eatsomemore.com/aboutus"
      ],
      route: "/items",
      outputPath: "sitemap.txt"
    }),
    new MarkdownRSSGeneratorPlugin({
      title: Config.site,
      outputPath: "rss.xml", //rss file output path
      description: Config.description,
      link: Config.url,
      language: Config.language,
      image: Config.logo,
      favicon: Config.logo,
      copyright: "All rights reserved " + new Date().getFullYear() + " " + Config.site,
      updated: new Date(), //updated date
      generator: "Sporule",
      author: {
        name: Config.site,
        email: Config.email,
        link: Config.url
      },
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          disallow:"/404/",
          allow: "/"
        }
      ],
      sitemap: Config.url + "/sitemap.txt",
      host: Config.url
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'template/index.html',
      templateParameters: (compilation, assets, assetTags, options)=>{
        return{
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          Config
        }
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new MarkdownToJS(),
    new GenerateSW({
      maximumFileSizeToCacheInBytes: 1e+7,
      skipWaiting: true,
      runtimeCaching: [{
        urlPattern: new RegExp('/\.(js|css)$/i'),
        // urlPattern: new RegExp('/\.(js|css|png|jpe?g|gif|svg)$/i'),
        handler: 'StaleWhileRevalidate'
      }],
      exclude: [/\.(md|png|jpe?g|gif|xml|toml|txt|gz)$/i, /CNAME/i,/md\.js/i],
      // exclude: [/\.(md|xml|toml|txt|gz)$/i, /CNAME/i,/md\.js/i],
      swDest: 'sw.js'
    }),
    new WebpackPwaManifest({
      name: Config.site,
      short_name: Config.site,
      description: Config.description,
      display: "standalone",
      start_url: ".",
      crossorigin: null,
      background_color: '#ffffff',
      includeDirectory: true,
      orientation: 'any',
      crossorigin: 'anonymous', //can be null, use-credentials or anonymous
      "theme_color": "#3367D6",
      icons: [
        {
          src: path.resolve('publish_assets/logo-ios-black-512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
      ios: {
        'apple-mobile-web-app-title': Config.site,
        'apple-mobile-web-app-status-bar-style': 'black-translucent'
      }
    })
  ]
}

module.exports = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', 'js']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' }
    ]
  },
  watch: true,
  externals: [
    {"pixi.js": "PIXI"}
  ]
};


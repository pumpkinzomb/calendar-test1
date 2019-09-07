module.exports = {
  devServer: {
    host: "localhost",
    port: "8080"
  },
  watchOptions: {
    poll: true
  },
  loaders: [
    {
      test: /\.s[a|c]ss$/,
      loader: "style!css!sass"
    }
  ]
};

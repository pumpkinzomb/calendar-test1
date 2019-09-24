module.exports = {
  devServer: {
    host: "localhost",
    port: "3000",
    proxy: {
      '^/theraphist': {
      target: 'http://theraphist-test.ap-northeast-2.elasticbeanstalk.com/v1/',
      changeOrigin:true
    }
  }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/manrope.scss";
          @import "@/scss/default_theme.scss";
          @import "@/scss/custom_icons.scss";
        `
      }
    }
  }
}

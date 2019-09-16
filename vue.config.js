module.exports = {
  devServer: {
    host: "localhost",
    port: "3000"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/manrope.scss";
          @import "@/scss/default_theme.scss";
        `
      },
    }
  }
};
// 
//           @import "@/scss/custom_icons.scss";
module.exports = {
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    hotOnly: false,
    proxy: "https://one-for-all-b8cd4.web.app/",
  },
};

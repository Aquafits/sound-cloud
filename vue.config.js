module.exports = {
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: "0.0.0.0",
    port: 3000, // 服务端口
    https: false,
    hotOnly: false,
    proxy: {
      "/api/qq": {
        target: "https://c.y.qq.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api/qq": "/"
        }
      },
      "/api/itool": {
        target: "https://v1.itooi.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/api/itool": "/"
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        api: "@/api",
        assets: "@/assets",
        base: "@/base",
        common: "@/common",
        components: "@/components",
        views: "@/views"
      }
    }
  }
};

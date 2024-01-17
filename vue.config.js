const path = require("path");
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  build7z,
  version,
  author,
} = require("./src/config/settings");
const Webpack = require("webpack");
const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const dayjs = require("dayjs");
const date = new dayjs().format("YYYY_M_D");
const time = new dayjs().format("YYYY-M-D HH:mm:ss");
const Timestamp = new dayjs().format("YYYYMMDDHHmmss");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["html", "js", "css", "svg"];
process.env.VUE_APP_TITLE = title || "瑾瑜管理系统";
process.env.VUE_APP_AUTHOR = author || "sunzhiyang";
process.env.VUE_APP_UPDATE_TIME = time;
process.env.VUE_APP_VERSION = version;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    disableHostCheck: true,
    hot: true,
    port: devPort,
    open: false,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack() {
    return {
      /*output: {
        // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        chunkFilename: `static/js/[name].${version}.${Timestamp}.js`,
      },*/
      resolve: {
        alias: {
          "@": resolve("src"),
          "@jslib": resolve("public/static/js"),
        },
      },
      plugins: [
        //new Webpack.ProvidePlugin(providePlugin),
        new Webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        new WebpackBar({
          name: title,
        }),
      ],
    };
  },
  chainWebpack(config) {
    // config.plugin("preload").tap(() => [
    //   {
    //     rel: "preload",
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: "initial",
    //   },
    // ]);
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // config.module
    //   .rule("images")
    //   .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({ bypassOnDebug: true })
    //   .end();

    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("cheap-source-map");
    });
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.performance.set("hints", false);
      config.devtool("none");
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          fortawesome: {
            name: "chunk-fortawesome",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
          icon: {
            name: "chunk-icon-park",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?@icon-park(.*)/,
          },
        },
      });
      config
        .plugin("banner")
        .use(Webpack.BannerPlugin, [
          ` \u0063\u006f\u0070\u0079\u0072\u0069\u0067\u0068\u0074\u003a\u0020\u0073\u0075\u006e\u007a\u0068\u0069\u0079\u0061\u006e\u0067\u0020\u0039\u0037\u0035\u0032\u0036\u0033\u0031\u0037\u0039\u0040\u0071\u0071\u002e\u0063\u006f\u006d \n \u0074\u0069\u006d\u0065\u003a\u0020 ${time}`,
        ])
        .end();
      if (build7z) {
        config
          .plugin("compression")
          .use(CompressionWebpackPlugin, [
            {
              filename: "[path].gz[query]",
              algorithm: "gzip",
              test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
              threshold: 8192,
              minRatio: 0.8,
            },
          ])
          .end();
      }
      // config.module
      //   .rule("images")
      //   .use("image-webpack-loader")
      //   .loader("image-webpack-loader")
      //   .options({
      //     bypassOnDebug: true,
      //   })
      //   .end();
    });

    if (build7z) {
      config.when(process.env.NODE_ENV === "production", (config) => {
        config
          .plugin("fileManager")
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`,
                  },
                ],
              },
            },
          ])
          .end();
      });
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
};

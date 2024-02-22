import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
import path from "path";
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: "bike-tools",
    date: "2024-2-21",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "vue3",
    compiler: "webpack5",
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    alias: {
      "@/": path.resolve(__dirname, "..", "src"),
      "@/components": path.resolve(__dirname, "..", "src/components"),
      "@/pages": path.resolve(__dirname, "..", "src/pages"),
      "@/store": path.resolve(__dirname, "..", "src/store"),
      "@/utils": path.resolve(__dirname, "..", "src/utils"),
      "@/services": path.resolve(__dirname, "..", "src/services"),
      "@/assets": path.resolve(__dirname, "..", "src/assets"),
      "@/styles": path.resolve(__dirname, "..", "src/styles"),
      "@/hooks": path.resolve(__dirname, "..", "src/hooks"),
      "@/constants": path.resolve(__dirname, "..", "src/constants"),
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});

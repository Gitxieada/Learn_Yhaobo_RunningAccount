import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 按需引入ElementPlus组件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// Icon图标自动引入
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), // 这个是组件自动导入
        IconsResolver({
          // 自动注册图标组件
          // 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
          prefix: "icon",
          // 指定collection，即指定为elementplus图标集ep
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true, // Icons图标自动下载
    }),
    viteCompression({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /.js$|.css$|.html$/,
      threshold: 10240, // 对超过10k的数据压缩
      minRatio: 0.8, // 压缩率小于0.8才会压缩
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8081,
    host: "0.0.0.0",
    hmr: true,
  },
  build: {
    // 禁用 gzip 压缩大小报告，可略微减少打包时间
    reportCompressedSize: false,
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
      output: {
        chunkFileNames: "js/[name]-[hash].js", // 用于命名代码拆分时创建的共享块的输出命名
        entryFileNames: "js/[name]-[hash].js", // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        // 根据不同的js库 拆分包，减少index.js包体积 ;
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 最小化拆分包
            const basic = id.toString().split("node_modules/")[1];
            const sub1 = basic.split("/")[0];
            return sub1.toString();
          }
        },
      },
    },
  },
});

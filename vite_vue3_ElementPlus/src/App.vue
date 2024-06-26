<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineComponent({
  name: "app",
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    };
  }
});
</script>

<style>
#app {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  background-color: transparent;
}

html {
  background-image: url(assets/background.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}
</style>

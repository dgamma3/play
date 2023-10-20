<template>
  <div style="width: 100%;height: 100%;">
    <div style="display: flex;width: 100%;height: 100%;overflow: hidden;">
      <left ref="left"></left>
      <top @changeCollapse="changeCollapse"></top>
      <div :style="'background-color: #f0f2f5;'">
        <tags ref="tag"></tags>
        <!-- 页面展示容器 -->
        <keep-alive>
          <router-view class="vue-view" :style="'width: calc(100% - ' + l_left + 'px)'" v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view class="vue-view" :style="'left: ' + l_left + 'px;width: calc(100% - ' + l_left + 'px)'" v-if="!$route.meta.keepAlive"/>
      </div>
    </div>

  </div>
</template>

<script>
  import top from "./top";
  import left from "./left";
  import tags from "./tags";
  import {ttGet, ttPost, ttWebSocket, abrasion, quality, quality2, color, repair} from "@/utils/util.js";
  export default {
    components: {
      top,
      left,
      tags
    },
    name: "layout",
    data() {
      return {
        server_url: this.$server_url,
        img_url: this.$img_url,
        site: {},
        loading: true,
        isCollapse: false,
        activeIndex: '1',
        activeIndex2: '1',
        l_left: 180
      };
    },
    mounted() {
      this.get_global();
    },
    methods: {
      changeCollapse(){
        this.isCollapse = !this.isCollapse;
        this.l_left = !this.isCollapse ? 180 : 65;
        this.$refs.left.changeCollapse();
        this.$refs.tag.changeCollapse();
      },

      //获取全局设置
      get_global() {
        ttGet("/api.php/common/get_global", '', (res) => {
          if (res.code == 200) {
            this.site = res.data.site;
            document.title = res.data.site.web_name;
            document.querySelector('meta[name="keywords"]').setAttribute('content', res.data.site.keywords);
            document.querySelector('meta[name="description"]').setAttribute('content', res.data.site.description);
            document.querySelector('link[rel="icon"]').setAttribute('href', this.server_url + '/public/uploads/' + res.data.site.ico);
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .vue-view {
    padding: 10px !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    background-color: #f0f2f5 !important;
    position: absolute !important;
    height: auto !important;
    top: 100px;
  }
</style>

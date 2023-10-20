<template>
  <div class="TabbarBox">
    <div class="TabbarItem">首页</div>
    <div class="TabbarItem">资料</div>
    <div class="TabbarItem">活动</div>
    <div class="TabbarItem">我的</div>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
};
</script>
<style>
.TabbarBox {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: #dedede;
}
.TabbarItem {
  flex: 1;
  height: 49px;
  text-align: center;
}
</style>
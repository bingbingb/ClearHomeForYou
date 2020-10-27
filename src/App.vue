<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style type="text/css">
#app {
  overflow: hidden;
}
#app .main-container:nth-child(2) {
  background-color: #eee;
}
.app-main {
  background-color: #fff;
}
.sidebar-logo-container[data-v-6494804b] {
  background-color: #fff !important;
  border-bottom: 1px solid #ddd;
}
.sidebar-logo-container .sidebar-logo-link .sidebar-title[data-v-6494804b] {
  color: #303133 !important;
}
#app .sidebar-container {
  border-right: 1px solid #ddd;
}
</style>
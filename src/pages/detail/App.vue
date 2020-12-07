<template>
  <div id="app">
    <div class="page-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import OrientationTips from '@/components/orientation'
export default {
  name: 'App',
  components: {
    OrientationTips
  },
  data () {
    return {}
  },
  mounted () {
  }
}
</script>

<style lang="less">
  @import url('~@/assets/css/base.less');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .ispc-html{
    max-width: 750px;
    margin: 0 auto;
    overflow: hidden;
  }
  body {
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    font-size: 0.26rem;
    overflow: hidden;
    .page-container {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #f0f0f0;
    }
  }
</style>

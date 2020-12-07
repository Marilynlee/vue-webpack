<template>
  <div class="orientation-wrap">
    <van-dialog v-model="show" title="提示" message="请在竖屏下观看哦" :show-confirm-button="false"></van-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrientationTips',
  data () {
    return {
      show: true
    }
  },
  created () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import url('~@/assets/css/base.less');
  .orientation-wrap{
    .fullScreen();
    font-size: .24rem;
    .van-dialog__header{
      color: #181818;
    }
  }
  .landscape{
    .orientation-wrap{
      font-size: .2rem;
    }
  }
</style>

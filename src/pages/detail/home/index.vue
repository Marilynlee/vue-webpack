<template>
  <div class="home-wrap">
    <h1 v-text="title" @click="toggleTitle"></h1>
  </div>
</template>

<script>
export default {
  name: 'House',
  components: {
  },
  data () {
    return {
      title: 'Detail page!'
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    toggleTitle (val, item) {
      this.title = 'This is Vue!'
    }
  },
  async created () {

  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>

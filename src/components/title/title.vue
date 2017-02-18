<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{params}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default{
    props: {
      params: String
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
      flex 1
      position relative
      bottom 6px
      border-bottom 1px solid rgba(255, 255, 255, 0.2)
    .text
      margin 0 12px
      font-size 14px
      font-weight 700
</style>

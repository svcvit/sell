<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

  </div>
</template>

<script>

  export default{
    props: {
      food: Object
    },
    methods: {
      addCart(event){
        //去掉pc端的2次点击
        if (event._constructed) {
          if (!this.food.count) {
            //如果是后期加给对象的属性，就不会被Vue实时监测，要用vue.set
            this.$set(this.food, 'count', 1)
          } else {
            this.food.count++
          }

        }
      },
      decreaseCart(event){
        if (event._constructed) {
          if (this.food.count) {
            this.food.count--
          }
        }
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">

  .cartcontrol
    font-size 0px

    .move-enter-active, .move-leave-active
      transition all 0.4s linear
      opacity 1
      transform translate3D(0, 0, 0) rotate(0)

    .move-enter, .move-leave-active
      opacity: 0
      transform translate3D(24px, 0, 0) rotate(180deg)

    .cart-decrease
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color #000
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>

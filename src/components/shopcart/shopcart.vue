<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightlight':totalCount >0}">
            <i class="icon-shopping_cart" :class="{'hightlight':totalCount >0}">
            </i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'hightlight':totalPrice >0}">¥{{totalPrice}}元</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="up">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList">
      </div>
    </transition>



  </div>


</template>

<script>
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default{
    data(){
      return {
        fold: true
      }
    },
    props: {
      "deliveryPrice": {
        type: Number,
        default: 0
      },
      "minPrice": {
        type: Number,
        default: 0
      },
      "selectFoods": {
        type: Array,
        default: [
          {
            price: 10,
            count: 4
          },
        ]
      }
    },
    computed: {
      totalPrice(){
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount(){
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true
          return false
        }

        let show = !this.fold

        if (show) {
          this.$nextTick(() => {

            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs["list-content"], {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      toggleList(){
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty(){
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList(){
          this.fold = true
      },
      pay(){
          if (this.totalPrice < this.minPrice){
              return
          }
          window.alert(`支付${this.totalPrice}`)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.hightlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.hightlight
                color rgb(255, 255, 255)
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.hightlight
            color #fff

        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px

          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background #26333b
          &.not-enough
            background #26333b
          &.enough
            background #00b43c
            color #fff

    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)

    .up-enter-active, .up-leave-active
      transition all 0.3s ease
      transform translate3d(0, 0, 0)

    .up-enter, .up-leave-active
      transform translate3d(0, 100%, 0)

    .shopcart-list
      position absolute
      left 0
      bottom 46px
      z-index -1
      width 100%


      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

    .fade-enter-active, .fade-leave-active
      transition all 0.4s linear
      opacity 1

    .fade-enter, .fade-leave-active
      opacity 0

    .list-mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index -2
      background rgba(7,17,27,0.6)
      backdrop-filter blur(10px)

</style>

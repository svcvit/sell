<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="food-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>

        </li>
      </ul>
    </div>
    <food :food="selectedFood" ref="food"></food>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import _ from 'lodash'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'

  const ERR_OK = 0

  export default{
    events: {
      'cart.add'(target){
        this._drop(target)
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    props: {
      seller: Object
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods(){
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })

        })
        return foods
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      axios.get('/api/goods').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          //因为ajax异步加载，所以滚动条，计算高度的方法要等Dom渲染后回调
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      //点击事件
      selectMenu(index, event){
        //判断是否为移动端点击，否则pc会有2次事件。
        if (event._constructed) {
          //获取到foods的数组
          let foodList = this.$refs["food-wrapper"].getElementsByClassName("food-list-hook")
          let el = foodList[index]
          //better-scroll的一个接口，直接滚动到一个特定的element，300毫秒
          this.foodScroll.scrollToElement(el, 300);
        }

      },
      selectFood(food, event){
        //判断是否为移动端点击，否则pc会有2次事件。
        if (event._constructed) {
          this.selectedFood = food
          this.$refs.food.show()

        }
      },
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs["menu-wrapper"], {
          //允许点击事件
          click: true
        })
        this.foodScroll = new BScroll(this.$refs["food-wrapper"], {
          //允许pos滚动事件
          probeType: 3,
          click: true
        })

        this.foodScroll.on('scroll', (pos) => {
          //监听滚动事件,将y的高度取整数，取绝对值
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },

      _calculateHeight(){
        let foodList = this.$refs["food-wrapper"].getElementsByClassName("food-list-hook")
        let height = 0
        //第一个区块的高度为0
        this.listHeight.push(height)

        //剩下的区块高度加入list，此处不能用es6的for of，safari会报错
        _.each(foodList, (food) => {
          height += food.clientHeight
          this.listHeight.push(height)
        })
      },
      _drop(target){
        this.$refs["shopcart"].drop(target)
      }

    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px

        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          .text
            border-none()

        .icon
          display inline-block
          vertical-align middle
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')

        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px

    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom 12px
</style>

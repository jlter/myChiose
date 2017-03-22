<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,$index) in goods" class="menu-item" :class="{'current':currentIndex== $index}" @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods"  >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span class="">好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <car :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></car>
  </div>

</template>

<script type="text/ecmascript-6">
  import iscroll from 'better-scroll'
  import car from '../car/car.vue'

  const ERR_OK = 0

  export default{
      props:{
          seller:{
              type:Object
          }
      },
    data(){
        return{
            goods : [],
          //左右联动
            listHeight :[],
          scrollY:0
        }
    },
      created () {
        //对应表
        this.classMap = ['decrease','discount','special','invoice','guarantee']
          this.$http.get('/api/goods').then((response) => {
              response = response.body

              if(response.errno ===ERR_OK){
                this.goods = response.data
                this.$nextTick(()=>{
                  this._initScroll()
                  this._createHeight()
                })

              }
        })
      },
      computed:{
        currentIndex(){
            for(let i = 0; i<this.listHeight.length; i++){
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i+1]
                if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
                    return i
                }
            }
          return 0
        }
      },
      methods:{
        _initScroll(){
            this.menuScroll = new iscroll(this.$refs.menuWrapper,{
                click:true
            })

            this.foodScroll = new iscroll(this.$refs.foodWrapper,{
                probeType:3
            })

            this.foodScroll.on('scroll',(res)=>{
                this.scrollY = Math.abs(Math.round(res.y))
            })
        },
        _createHeight(){
            let foodslit = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
            let height = 0
            this.listHeight.push(height)
            //遍历
            for(let i = 0; i<foodslit.length; i++){
                let item = foodslit[i]
                height +=item.clientHeight
                this.listHeight.push(height)
            }
        },
        selectMenu($index,$event){

          if(!$event._constructed){
              return
          }
          //
          let foodslist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
          let elx = foodslist[$index]
          this.foodScroll.scrollToElement(elx,300)

        }
      },
      components:{
        car
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/maxin.styl"
.goods
  display: flex
  position: absolute
  top 174px
  bottom 46px
  overflow hidden
  .menu-wrapper
    display: inline-block
    flex 0 0 80px
    width 80px
    background #F3F5F7
    .menu-item
      display: table
      height 54px
      padding 0 12px
      &.current
        position: relative
        background #ffffff
        z-index 10

        margin-top -1px
        .text
          border-none()
          font-weight 700
      .icon
        display: inline-block
        width 16px
        height 16px
        vertical-align top
        margin-right 2px
        background-size 16px 16px
        background-repeat no-repeat
        &.decrease
          bg-img('decrease_3')
        &.discount
          bg-img('discount_3')
        &.guarantee
          bg-img('guarantee_3')
        &.invoice
          bg-img('invoice_3')
        &.special
          bg-img('special_3')

      .text
        display: table-cell
        font-size 12px
        width 56px
        vertical-align middle
        border-onePx (rgba(7,17,27,0.2))

  .foods-wrapper
    flex 1
    display: block
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147,153,159)
      background: #f3f5f7
    .food-item
      display: flex
      margin 18px
      padding-bottom 18px
      border-onePx (rgba(7,17,27,0.2))
      &::last-child
        border-none()
        margin-bottom 0
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
          color rgb(7,17,27)
        .desc,.extra
          font-size 10px
          color rgb(7,17,27)
        .desc
          margin-bottom 8px
          line-height 12px
        .extra
          line-height 10px
          .sellCount
            margin-right 12px
        .price
          font-weight 700
          .now
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(7,17,27)
</style>

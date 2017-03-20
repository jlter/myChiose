<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li class="food-list" v-for="item in goods ">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
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
  </div>

</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0

  export default{
      props:{
          seller:{
              type:Object
          }
      },
    data(){
        return{
            goods : []
        }
    },
      created () {
        //对应表
        this.classMap = ['decrease','discount','special','invoice','guarantee']
          this.$http.get('/api/goods').then((response) => {
              response = response.body

              if(response.errno ===ERR_OK){
                this.goods = response.data
                console.log(this.goods)

              }
        })
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
          line-height 10px
          font-size 10px
          color rgb(7,17,27)
        .desc
          margin-bottom 8px
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

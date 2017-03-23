<template>
  <div class="car">
    <div class="content">
      <div class="content-left">
        <!--购物车logo-->
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalprice>0}">￥{{totalprice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>


      </div>
      <div class="content-right">
        <div class="pay" :class="{'highlight':totalprice-minPrice>0}">
          {{periceCount}}
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props:{
        selectfoods:{
            type:Array,
            default(){
                return [
                  {
                    price: 16,
                    count: 1

                  }
                ]
            }
        }
        ,
      deliveryPrice:{

          type:Number,
          default : 0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    computed:{
        totalprice(){
            let total = 0
            this.selectfoods.forEach((food)=>{
                total+=food.price * food.count
          })
          return total
        },
        totalCount(){
              let count = 0
              this.selectfoods.forEach((food)=>{
                  count +=food.count

              })
              return count
        },
      periceCount(){
            if(this.totalprice === 0){
                return `需要￥${this.minPrice}起送`
            }else if(this.totalprice<this.minPrice){
                let diff =  this.minPrice -this.totalprice
                return `还需要￥${diff}元起送`
            }else{
                return '去结算'
            }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .car
      position fixed
      z-index 1
      left 0
      bottom 0
      width 100%
      height 48px
      background #000
      .content
        display flex
        background #141d27
        font-size 0
        .content-left
          flex 1
          .logo-wrapper
            display inline-block
            position: relative
            top -10px
            margin 0 12px
            padding 6px
            width 56px
            height 56px
            box-sizing border-box
            vertical-align top
            border-radius 50%
            background #141d27
            .logo
              width 100%
              height 100%
              border-radius 50%
              background #2b343c
              text-align center
              &.highlight
                background rgb(0,160,240)
              .icon-shopping_cart
               font-size 24px
               line-height 44px
               color #80858a
               &.highlight
                color #ffffff



            .num
              position: absolute
              top 0
              right 0
              width 24px
              height 16px
              line-height 16px
              text-align center
              font-size 9px
              color #ffffff
              background rgb(240,20,20)
              box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
              border-radius 10px
          .price
            display inline-block
            line-height 24px
            vertical-align top
            margin-top 12px
            border-sizing border-box
            padding-right 12px
            font-size 16px
            font-weight 700
            border-right 1px solid rgba(255,255,255,0.1)
            color rgba(255,255,255,0.4)
            &.highlight
              color #ffffff

          .desc
            display inline-block
            line-height 24px
            margin 12px 0 0 12px
            vertical-align top
            font-size 12px
            color rgba(255,255,255,0.4)

        .content-right
          flex 0 0 105px
          width 105px
          .pay
            height 48px
            line-height 48px
            font-size 12px
            font-weight 700
            text-align center
            color rgba(255,255,255,0.4)
            background #2b333b
            &.highlight
              background #00b43c
              color #ffffff

</style>

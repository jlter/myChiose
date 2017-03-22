<template>
  <div class="car">
    <div class="content">
      <div class="content-left">
        <!--购物车logo-->
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">23</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>


      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props:{
      deliveryPrice:{

          type:Number,
          default : 0
      },
      minPrice:{
        type:Number,
        default:0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .car
      position fixed
      z-index 100
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
              .icon-shopping_cart
               font-size 24px
               line-height 44px
               color #80858a
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

</style>

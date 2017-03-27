<template>
  <div class="shopcar">
    <div class="car">
      <div class="content" @click="togglelist">
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
          <div class="pay" :class="{'highlight':totalprice-minPrice >=0}" @click.stop.event="pay">
            {{periceCount}}
        </div>

        </div>

      </div>
      <transition name="fold">
        <div class="car-list fold-transition" v-show="listshow" >
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectfoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="carcontrol-wrapper">
                  <carcontrol :food="food"></carcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="mask fade-transition" @click="hidelist" v-show="listshow" ></div>
    </transition>
  </div>


</template>

<script type="text/ecmascript-6">
  import carcontrol from '../carcontrol/carcontrol.vue'
  import BScroll from 'better-scroll'
  export default{
    props:{
        selectfoods:{
            type:Array,
            default(){
                return []
            }
        },
      deliveryPrice:{
          type:Number,
          default : 0
      },
      minPrice:{
        type:Number,
        default : 0
      }
    },
    data(){
     return{
         fold:true
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
        },
        listshow(){
            if(!this.totalCount){
              this.fold = true
              return false
            }
            let show = !this.fold
            if(show){
                this.$nextTick(()=>{
                    if(!this.scroll) {
                      this.scroll = new BScroll(this.$refs.listContent,{
                        click: true
                      })
                    }else{
                        this.scroll.refresh()
                    }
                })
            }
            return show
        }

    },
    methods:{
      togglelist(){
        if(!this.totalCount){
          return
        }
        this.fold = !this.fold
        console.log(this.fold)
      },
      hidelist(){
        this.fold = true
      },
      pay(){
          if(this.totalprice<this.minPrice){
              return
          }else{
            alert('买买买');
          }

      },
      empty(){
        this.selectfoods.forEach((food)=>{
          food.count = 0
        })
      }
    },
    components:{
      carcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/maxin.styl"

    .car
      position fixed
      z-index 10
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


      .car-list
        position: absolute
        left 0
        top 0
        z-index -1
        width 100%
        &.fold-transition
          transition all 0.5s
          transform translate3d(0,-100%,0)
        &.fold-enter,&.fold-leave-active
          transform translate3d(0,0,0)
        .list-header
          height 40px
          line-height 40px
          padding 0 18px
          background #f3f5f7
          border-break: 1px solid rgba(7, 17, 27, 0.1)
          .title
            float left
            font-size 14px
            color rgb(7,17,27)

          .empty
            float right
            font-size 12px
            color rgb(0,160,210)


        .list-content
          max-height 217px
          padding 0 18px
          overflow hidden
          background #fff
          .food
            position: relative
            padding 12px 0
            box-sizing border-box
            border-onePx(rgba(7,17,27,0.2))
            .name
              line-height 24px
              font-size 14px
              color rgb(7,17,27)
            .price
              position: absolute
              right 90px
              bottom 12px
              line-height 24px
              color rgb(240,20,20)
              font-size 14px
              font-weight 700
            .carcontrol-wrapper
              position:absolute
              right 0
              bottom 6px

    .mask
      position fixed
      top:0
      left 0
      width 100%
      height 100%
      z-index 9
      -webkit-backdrop-filter blur(10px)
      &.fade-transition
        transition all 0.3s
        opacity 1
        background rgba(7,17,27,0.6)
      &.fade-enter,&.fade-leave-active
        opacity 0
        background rgba(7,17,27,0)

</style>

<template>
  <transition name="move">
    <div class="food move-transition" v-show="flogshow" ref="foods">
      <div class="food-content">
        <div class="image-header" @click="hide">
          <img :src="food.image">
          <div class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售:{{food.sellCount}}份</span>
            <span class="rating">好评率:{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥:{{food.oldPrice}}</span>
          </div>
          <div class="carcontrol-wrapper">
            <car :food="food"></car>
          </div>
          <transition name="fade">
           <div @click="addFirst" class="buy fade-transition" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import car from '../carcontrol/carcontrol.vue'
  import Vue from 'vue'
  export default{
    props:{
        food:{
            type:Object
        }
      },
    data(){
        return{
          flogshow:false
        }
    },
    methods:{
      show(){
        this.flogshow = true
        this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.foods,{
                  click:true
              })
            }else{
                this.scroll.refresh()
            }
        })
      },
      hide(){
        this.flogshow = false
      },
      addFirst(event){
        if(!event._constructed){
          return
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else{
            this.food.count++
        }

      }
    },
    components:{
        car
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    bottom 48px
    top 0
    left 0
    width 100%
    z-index 8
    background #fff
    &.move-transition
      transition all 0.3s linear
      transform translate3D(0,0,0)
    &.move-enter,&.move-leave-active
      transform translate3D(100%,0,0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        display: block
        width:100%
        height 100%
        top: 0
        left 0
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          padding 10px
          display: block
          font-size 24px
          color #ffffff
    .content
      padding 18px
      .title
        line-height: 14px
        margin-bottom 8px
        font-weight 700
        color rgb(7,17,27 )
        font-size 14px
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count,.rating
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          padding-right: 12px
      .price
        line-height 28px
        .now
          font-weight 700
          margin-right 8px
          font-size 14px
          color rgb(240,20,20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(7,17,27)


      .carcontrol-wrapper
        position: absolute
        right 12px
        bottom 12px
      .buy
        position: absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #fff
        background rgb(0,160,210)
        &.fade-transition
          transition all 0.3s
          opacity 1
        &.fade-enter,&.fade-leave
          opacity 0

</style>

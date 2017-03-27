<template>
  <div class="carcontrol">
    <transition name="fade">
      <div class="car-cut " v-show="food.count>0" @click.stop="decreaseCart" >
        <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="car-count" v-show="food.count>0">{{food.count}}</div>
    <div class="car-add icon-add_circle" @click.stop="addCount"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
      props:{
          food:{
              type:Object
          }
      },
      created(){

      },
      methods:{
        addCount(event){
            if(!event._constructed){
                return
            }
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                this.food.count++
            }

        },
        decreaseCart(event){
          if(!event._constructed){
            return
          }

          if(this.food.count){
            this.food.count--
          }

        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .carcontrol
    font-size 0
    .car-cut
      display inline-block
      padding 6px
      transition all 0.3s linear
      .inner
        font-size 24px
        display inline-block
        line-height 24px
        color rgb(0,160,210)
        transition all 0.3s linear
      &.fade-transition
        opacity 1
        transform translate3D(0,0,0)
        .inner
          transform rotate(0)
      &.fade-enter,&.fade-leave-active
        opacity 0
        transform translate3D(24px,0,0)
        .inner
          transform rotate(180deg)

    .car-count

      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      text-align center
      font-size 10px
      line-height 24px
      color rgb(147,153,159)


    .car-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,210)



</style>

<template>
  <div :class="starType" class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLA_ON = 'on'
  const CLA_HALF = 'half'
  const CLA_OFF = 'off'
  export default{
      props:{
          size:{
              type:Number
          },
        score:{
              type:Number
        }
      },
      computed:{
        starType(){
            return 'star-'+ this.size
        },
        itemClasses () {
          let result = []
          let score = Math.floor(this.score *2)/2
          //半星
          let hasDecmal = score % 1 ==0
          //整星
          let integer = Math.floor(score)
          for(let i = 0;i<integer;i++){
            result.push(CLA_ON)
            console.log(integer.length)
          }
          if(hasDecmal){
              result.push(CLA_HALF)
          }
          while (result.length < LENGTH){
              result.push(CLA_OFF)
          }
          return result
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/maxin.styl"
  .star
    font-size 0
    .star-item

      display: inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
</style>

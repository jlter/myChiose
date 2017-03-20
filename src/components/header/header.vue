<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar" alt="">
        </div>

        <div class="content">
          <!--右侧一行-->
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <!--右侧二行-->
          <div class="description">
            {{seller.description}}--{{seller.deliveryTime}}送达
          </div>
          <!--右3-->
          <div class="support" v-if="seller.supports">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <!--右侧浮动的块儿-->
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bottom-wrapper" @click="showDetail">

        <span class="bottom-title"></span>
        <span class="bottom-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
    <!--弹出层-->
      <transition name="fade" mode="out-in">
        <div class="detail" v-show="detailShow" >
          <!--sticky footer 经典布局-->
          <div class="detail-wrapper clearfix" >
            <div class="detail-main">
              <h1 class="name ">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <!--优惠信息-->
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>

              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="supports-items" v-for="(item,index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text" >{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="content">
                <p>{{seller.bulletin}}</p>
              </div>


          </div>
          </div>
          <div class="detail-close" @click="showDetail">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import other from '../other/other.vue'
  export default{
      name:'header',
    props: {
          seller:{
              type: Object
          }
    },
    data(){
      return{
          detailShow:false
      }
    },
    methods:{
      showDetail(){
          (this.detailShow ==true) ?this.detailShow = false : this.detailShow = true
      }
    },
    //对应class的map表
    created() {
          this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
    //引用子组件
    components:{
        star:star,
        other

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/maxin.styl"
  .header
    color #fff
    background-color rgba(7,17,27,0.5)
    position relative
    overflow: hidden
    .content-wrapper
      padding 24px 12px 18px 24px
      position relative
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display: inline-block
        font-size 14px
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-img('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold

        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            line-height 12px
            font-size 10px

      .support-count
        position: absolute
        right 12px
        bottom 18px
        padding 0 8px
        line-height 24px
        height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          display inline-block
          line-height 24px
          vertical-align: top
          font-size 10px
    .bottom-wrapper
      height 28px
      position relative
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bottom-title
        display inline-block
        vertical-align top
        width 22px
        height 12px
        bg-img('bulletin')
        margin-top 8px
        background-size:22px 12px
        background-color rgba(7,17,27,0.2)
      .bottom-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right 10px
        top 8px
        font-size 10px

    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      transition all 0.5s
      background rgba(7,17,27,0.8)
      -webkit-backdrop-filter blur(10px)
      &.fade-transition
        opacity 1

      &.fade-enter, &.fade-leave
        opacity 0
        background rgba(7,17,27,0)

      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height:16px
            font-size 16px
            text-align center
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display: flex
            width 80%
            margin 28px auto 24px auto
            .line
              border-width: 1px
              border-color rgba(255,255,255,0.2)
              border-style solid
              border-left none
              border-top none
              border-right none
              flex:1
              position: relative
              top: -6px
            .text
              padding 0 12px
              font-weight 700
              font-size 14px
          .content
            width 80%
            margin 0 auto
            p

              font-size 14px
              line-height 24px
              padding 0 12px



          .supports
            width 80%
            margin 0 auto
            .supports-items
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display: inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .text
                font-size 12px
                line-height 16px
      .detail-close
        position: relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>

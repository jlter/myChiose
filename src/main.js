// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from  './components/goods/goods.vue'
import rating from './components/rating/rating.vue'
import seller from './components/seller/seller.vue'
import VueResource from 'vue-resource'
import './common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({

  mode:'history',
  base:__dirname,
  routes:[
    //diY我使用redirect重定向去解决router.go失效的问题
    {path:'/',redirect:'goods'},
    {path:'/goods',component:goods},
    {path:'/rating',component:rating},
    {path:'/seller',component:seller}
  ],
  linkActiveClass:'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
 render:x =>x(App)

})


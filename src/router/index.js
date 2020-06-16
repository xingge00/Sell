import Vue from 'vue'
import Router from 'vue-router'

var BASE_COM = '../components/'
// 引入组件
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'
import detection from '../components/detection/detection.vue'

Vue.use(Router)


export default new Router({
  mode:'history',
  routes: [
		{path: '/',redirect:'/goods'},
		{path: '/goods',component:() => import('../components/goods/goods.vue')},
		{path: '/ratings',component:() => import('../components/ratings/ratings.vue')},
		{path: '/seller',component:() => import('../components/seller/seller.vue')},
		{path: '/detection',component:() => import('../components/detection/detection.vue')}
	]
})

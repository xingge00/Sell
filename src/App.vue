<template>
  <div id="app">
		<v-header v-bind:seller="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/detection">食物检测</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlParse} from './common/js/util.js'
export default {
	name: 'App',
	data()	{
		return {
			seller:{
				id:(() => {
					let queryParam = urlParse()
					return queryParam.id
				})()
			},
		}
	},
	created(){
		this.$http.get('/api/seller?id=12345').then((res)=>{
			// this.seller = res.data;
			this.seller = Object.assign({},this.seller,res.data)
		})
		// this.$http.get('/api/food_get_foodlist').then((res)=>{
		// 	this.seller = res.data;
		// 	console.log(this.seller)
		// })
	},
	components:{
		'v-header':header,
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		.tab
			display:flex
			width:100%
			height:40px
			line-height:40px
			.tab-item
				flex:1
				text-align:center
				& > a
					display:block
					text-decoration:none
					font-size:14px
					color:rgb(77,85,93)
					font-weight:bold
					border-bottom:solid 1px rgba(7,17,27,0.1)
					border-top:solid 1px rgba(7,17,27,0.1)
				.router-link-active
					color:rgb(240,20,20)
						
</style>

<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" @click.stop="decreaseCart" v-show="food.count>0">
				<img src="./decrease.png" width="24" height="24" class="inner" />
			</div>
		</transition>
		<transition name="move2">
			<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		</transition>
		<div class="cart-add" @click.stop="addCart" ref='add'>
			<img src="./add.png" width="24" height="24" />
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
	props:['food','index'],
	created(){
		// console.log(this.food)
	},
	methods:{
		addCart(){
			if(!this.food.count){
				Vue.set(this.food,'count',1)
			}else{
				this.food.count++
			}
			// console.log(this.food.count)
			// 向父组件抛出test事件，并传值
			this.$emit('test', this.$refs.add)
		},
		decreaseCart(){
			if(this.food.count){
				this.food.count--
			}
		},
		// res(){
		// 	console.log(this.$refs.add.getBoundingClientRect())
		// }
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size:0
		.move-enter-active,.move-leave-active
			transition: all linear .3s;
		.move-enter,.move-leave-to
			opacity: 0
			transform:translateX(36px) rotate(360deg)
		.move2-enter-active,.move2-leave-active
			transition: all linear .3s;
		.move2-enter,.move2-leave-to
			opacity: 0
			transform:translateX(24px)
		.cart-decrease,.cart-add
			display:inline-block
			padding:6px
			font-size:24px
			line-height:24px
		.cart-count
			display:inline-block
			font-size:10px
			vertical-align:top
			text-align:center
			width:12px
			line-height:24px
			padding-top:6px
			color:rgb(147,153,159)
			
			
</style>

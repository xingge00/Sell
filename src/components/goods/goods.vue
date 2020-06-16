<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="item,index in goods" class="menu-item"
				 :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<span class="text">
						<span v-if="item.type>0" class="icon" 
						:class="classMap[item.type]">
						</span>{{item.name}}
					</span>
				</li>
			</ul>
			
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item,index in goods" class="food-list food-list-hook" >
					<h1 class="food-title">{{item.name}}</h1>
					<ul class="desktop-food-wrapper">
						<li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
							<div class="icon">
								<img :src="food.icon" height="60" width="60" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food" :index="index" @test="test"></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-shopcart :delivery-price="seller.deliveryPrice" :select-foods="selectFoods"
		:min-price="seller.minPrice" ref='shopcart'></v-shopcart>
		<v-food :food="selectedFood" ref="food" @test="test"></v-food>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import food from '../food/food.vue'
export default{
	props:['seller'],
	components: {
		'v-shopcart':shopcart,
		'v-cartcontrol':cartcontrol,
		'v-food':food,
	},
	data(){
		return {
			classMap:['decrease','discount','special','invoice','guarantee'],
			goods:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{}
		}
	},
	created(){
		this.$http.get('/api/goods').then(res=>{
			this.goods = res.data
			// console.log(this.goods)
			this.$nextTick(() => {
				this._initScroll()
				this._calculateHeight()
				// console.log(this.seller)
			})
		})
	},
	computed:{
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				let h1 = this.listHeight[i]
				let h2 = this.listHeight[i+1]
				if(h2&&(this.scrollY>=h1&&this.scrollY<h2)){
					let menus = this.$refs.menuWrapper.getElementsByClassName('menu-item')
					this.menuScroll.scrollToElement(menus[i],300);
					return i
				}
			}
			return 0
		},
		selectFoods(){
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if(food.count){
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	methods:{
		_initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click: true, //better-scroll 默认阻止了事件preventDefault 开放点击事件
			})
			this.foodScroll = new BScroll(this.$refs.foodWrapper,{
				probeType: 3,
				click: true
			})
			this.foodScroll.on('scroll',pos =>{
				this.scrollY = Math.abs(Math.round(pos.y))
				// console.log(this.currentIndex)
			})
		},
		_calculateHeight(){
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
			let height = 0
			this.listHeight.push(height)
			for(let i=0;i<foodList.length;i++){
				let item = foodList[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
			
			// console.log(foodList)
		},
		selectMenu(index){
			console.log(index)
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
			let el = foodList[index]
			this.foodScroll.scrollToElement(el,300);
		},
		selectFood(food,event){
			
			// if(!event._constructed){
			// 	return
			// }
			console.log(food)
			this.selectedFood = food
			this.$refs.food.show()
		},
		test(el){
			// 异步执行动画
			this.$nextTick(function(){
				this.$refs.shopcart.drop(el)
			})
		}
	},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.goods
		z-index:1
		display:flex
		position:absolute
		top:179px
		bottom:0
		width:100%
		overflow:hidden
		padding-bottom:46px
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			overflow:hidden
			.menu-item
				padding: 0 12px
				display: table
				height:54px
				width:56px
				line-height:14px
				font-size:0
				&.current
					position:relative
					z-index:10
					margin-top:-1px
					background:#fff
					font-weight:700
					.text
						border:none
				.icon
					display:inline-block
					width:12px
					height:12px
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						background-image:url('decrease_3@3x.png')
					&.discount
						background-image:url('discount_3@3x.png')
					&.guarantee
						background-image:url('guarantee_3@3x.png')
					&.invoice
						background-image:url('invoice_3@3x.png')
					&.special
						background-image:url('special_3@3x.png')
				.text
					vertical-align:middle
					display:table-cell
					font-size:12px
					font-weight:200
					border-bottom:1px rgba(7,17,27,0.1) solid
		.foods-wrapper
			flex:1
			overflow:hidden
			.food-list
				.food-title
					padding-left:14px
					height:26px
					line-height:26px
					border-left:2px solid #d9dde1
					font-size:12px
					color:rgb(147,153,159)
					background:#f3f5f7
				.food-item
					display:flex
					margin: 18px
					padding-bottom:18px
					border-bottom:1px solid rgba(1,17,27,0.1)
					&:last-child 
						border-bottom:none
						margin-bottom:0
					.icon
						flex:0 0 60px
						padding-right:10px
					.content
						flex:1
						font-size:0
						position:relative
						.name
							padding:2px 0 8px 0
							height:14px
							line-height:14px
							font-size:14px
							color:rgb(7,17,27)
						.desc,.extra
							font-size:10px
							color:rgb(147,153,159)
							line-height:12px
							padding-bottom:8px
						.extra
							.count
								margin-right:12px
						.price
							font-weight:700
							line-height:24px
							.now
								margin-right:8px
								font-size:14px
								color:rgb(240,20,20)
							.old
								text-decoration:line-through
								font-size:10px
								color:rgb(147,153,159)
						.cartcontrol-wrapper
							position:absolute
							right:0
							bottom:0
</style>

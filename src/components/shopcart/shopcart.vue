<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left" >
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon" :class="{'highlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">¥{{totalPrice}}</div>
				<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<transition-group name="drop"
				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter">
				<div v-for="ball,index in balls" v-show="ball.show" class="ball" :key="'drop'+index" ></div>
			</transition-group>
		</div>
		<transition name="fold"
			v-on:before-enter="be"
			v-on:enter="e"
			v-on:leave="l">
			<div class="shopcart-list" v-show="listShow" >
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref='listContent'>
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>¥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<v-cartcontrol :food="food" ></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="toggleList" ></div>
		</transition>
	</div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
export default{
	props:['delivery-price','min-price','selectFoods'],
	data(){
		return {
			balls:[
				{
					show:false,
					el:''
				},
				{
					show:false,
					el:''
				},
				{
					show:false,
					el:''
				},
				{
					show:false,
					el:''
				},
			],
			dropBalls:[],
			fold:false
		}
	},
	computed:{
		totalPrice(){
			let total = 0
			this.selectFoods.forEach((food) => {
				total += food.price * food.count
			})
			return total
		},
		totalCount(){

			let count = 0
			this.selectFoods.forEach((food) => {
				count += food.count
			})
			return count
		},
		payDesc(){
			if(this.totalPrice === 0){
				return '¥'+this.minPrice+'元起送'
			}else if(this.totalPrice<this.minPrice){
				let diff = this.minPrice - this.totalPrice
				return '还差¥'+diff+'元起送'
			}else{
				return '去结算'
			}
		},
		payClass(){
			if(this.totalPrice < this.minPrice){
				return 'not-enough'
			}else{
				return 'enough'
			}
		},
		listShow(){
			if(this.totalCount===0){
				this.fold = true
				return false
			}
			let show = !this.fold
			if(show){
				this.$nextTick(() =>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
							probeType: 3,
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
		drop(el){
			for(let i=0; i<this.balls.length;i++){
				let ball = this.balls[i]
				if(!ball.show){
					ball.show = true
					ball.el = el
					this.dropBalls.push(ball)
					return
				}
			}
		},
		toggleList(){
			if(!this.totalCount){
				return 
			}
			this.fold = !this.fold
		},
		empty(){
			this.selectFoods.forEach((food) =>{
				food.count = 0
			})
		},
		pay(){
			if(this.totalPrice < this.minPrice){
				return
			}
			window.alert("支付"+this.totalPrice+"元")
		},
		beforeEnter(el){
			let count = this.balls.length
			while(count--){
				let ball = this.balls[count]
				if(ball.show){
					let rect = ball.el.getBoundingClientRect()
					let x = rect.left - 32
					let y = -(window.innerHeight - rect.top - 22)
					el.style.display = ''
					el.style.webkitTransform = 'translate3D('+x+'px,'+y+'px,0)'
					el.style.transform = 'translate3D('+x+'px,'+y+'px,0)'
				}
			}
		},
		enter(el,done){
			let rf = el.offsetHeight
			this.$nextTick(() => {
				el.style.webkitTransform = 'translate3d(0,0,0)'
				el.style.transform = 'translate3d(0,0,0)'
				el.style.transition = "all .3s linear";
			})
			done()
		},
		afterEnter(el){
			this.beforeEnter(el)
			let ball = this.dropBalls.shift()
			if (ball){
				ball.show = false
			}
		},
		be(el){
			el.style.transform = 'translateY(0)'
		},
		e(el,done){
			let rf = el.offsetHeight
			el.style.transform = 'translateY(-100%)'
			el.style.transition = "all .3s linear";
			done()
		},
		l(el,done){
			el.style.transform = 'translateY(0)'
			el.style.transition = "all .3s linear";
		},
	},
	components:{
		'v-cartcontrol':cartcontrol,
	}
	
	
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
	position:fixed
	bottom:0
	left:0
	width:100%
	height:48px
	z-index:50
	.content
		display:flex
		background:#141d27
		// font-size:0
		color:rgba(255,255,255,0.4)
		.content-left
			flex:1
			.logo-wrapper
				display:inline-block
				position:relative
				top:-10px
				margin 0 12px 
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				vertical-align:top
				border-radius:50%
				background:#141d27
				.logo
					margin:0 auto
					width:100%
					height:100%
					background:#2b343c
					border-radius:50%
					text-align:center
					line-height:56px
					&.highlight
						background:rgb(0,160,220)
					.icon
						display:inline-block
						width:24px
						height:24px
						background-size:24px 24px
						background-repeat:no-repeat
						background-image:url(./shopcart.png)
						&.highlight
							background-image:url(./shopcart-highlight.png)
				.num
					position:absolute
					top:0
					right:0
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					background:rgb(240,20,20)
					box-shadow:0 4px 8px rgba(0,0,0,0.4)
			.price
				display:inline-block
				vertical-align:top
				margin-top:12px
				padding-right:12px
				line-height:24px
				box-sizing:border-box
				border-right:1px solid rgba(255,255,255,0.1)
				font-weight:700
				font-size:16px
				&.highlight
					color:#fff
			.desc
				display:inline-block
				vertical-align:top
				margin:12px 0 0 12px
				line-height:24px
				font-size:10px
		.content-right
			flex:0 0 105px
			width:105px
			.pay
				height:48px
				line-height:48px
				font-size:12px
				text-align:center
				font-weight:700
				&.not-enough
					background:#2b333b
				&.enough
					background:#00b43c
					color:#fff
	.ball-container
		.ball
			width:16px
			height:16px
			position:fixed
			left:32px
			bottom:22px
			z-index:200
			border-radius: 50%;
			background-color: #1296DB		
	.shopcart-list
		position:absolute
		top:0
		left:0
		z-index:-1
		width:100%
		
		overflow:auto
		.list-header
			line-height:40px
			height:40px
			padding:0 18px
			background:#f3f5f7
			border-bottom:1px solid rgba(7,17,27,0.1)
			.title
				float:left
				font-size:14px
				color:rgb(7,17,27)
			.empty
				float:right
				font-size:12px
				color:rgb(0,160,220)
		.list-content
			padding:0 18px
			max-height:217px
			overflow:hidden
			background:#fff
			.food
				position:relative
				padding:12px 0
				box-sizing:border-box
				border-bottom:1px solid rgba(7,17,27,0.1)
				.name
					line-height:24px
					font-size:14px
					color:rgb(7,17,27)
				.price
					position:absolute
					right:90px
					bottom:12px
					line-height:24px
					font-size:14px
					color:rgb(240,20,20)
					font-weight:700
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:6px
	.list-mask
		position:fixed
		top:0
		left:0
		width:100%
		height:100%
		z-index:-2
		backdrop-filter:blur(10px)
		background:rgba(7,17,27,0.6)
.fade-enter-active,.fade-leave-active
	transition: all linear .3s;
.fade-enter,.fade-leave-to
	opacity: 0
			
</style>

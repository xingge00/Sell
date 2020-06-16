<template>
	<transition name="food">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img class="img" :src="food.image" />
					<div class="back" @click="hide">
						<img src="./back.png" class="icon" width=20 height=20 />
					</div> 
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">¥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper" >
						<v-cartcontrol :food="food" @test="test"></v-cartcontrol>
					</div>
					<div @click.stop="addFirst" class="buy" v-show="!food.count || food.count===0">
						加入购物车
					</div>
					<div class="test" ref="add"></div>
				</div>
				<v-split></v-split>
				<div class="info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<v-split></v-split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<v-ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"
					@ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle"></v-ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" width="12px" height="12px" :src="rating.avatar" />
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span class="icon" :class="{'like':rating.rateType === 0}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
							暂无评价
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</transition>
</template>

<script>
import 	Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import {formatDate} from '../../common/js/date.js'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default{
	props:['food'],
	data(){
		return {
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		}
	},
	components:{
		'v-cartcontrol':cartcontrol,
		'v-split':split,
		'v-ratingselect':ratingselect,
	},
	filters:{
		formatDate(time){
			let date = new Date(time)
			return formatDate(date,'yyyy-MM-dd hh:mm')
		}
	},
	methods:{
		show(){
			// 初始化ratingselect组件数据
			this.selectType = ALL
			this.onlyContent = false
			
			this.showFlag = true
			this.$nextTick(() => {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.food,{
						click:true,
						probeType:3
					})
				}else{
					this.scroll.refresh()
				}
			})
		},
		hide(){
			this.showFlag = false
		},
		addFirst(event){
			
			// if(!event._contructed){
			// 	return
			// }
			console.log("111")
			this.$emit('test', this.$refs.add)
			Vue.set(this.food,'count',1)
		},
		test(){
			this.$emit('test', this.$refs.add)
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false
			}
			if(this.selectType == ALL){
				return true
			}else{
				return type === this.selectType
			}
		},
		ratingtypeSelect(type){
			this.selectType = type
			this.$nextTick(() => {
				this.scroll.refresh()
			})
		},
		contentToggle(onlyContent){
			this.onlyContent = onlyContent
			this.$nextTick(() => {
				this.scroll.refresh()
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food-enter-active.food-leave-active
		transform:translate3D(0,0,0)
	.food-enter,.food-leave-to
		transform:translate3D(100%,0,0)
	.food
		position:fixed
		top:0
		left:0
		bottom:48px
		z-index:30
		width:100%
		background:white
		transition: all 0.2s linear
		.food-content
			// position:relative
			.image-header
				position: relative
				width:100%
				height:0
				padding-top:100%
				.img
					position:absolute
					top:0
					left:0
					width:100%
					height:100%
				.back
					position:fixed
					top:0
					left:0
					width:100%
					background:rgba(7,17,27,0.4)
					text-align:center
					.icon
						display:block
						padding:10px
			.content
				position:relative
				padding:18px
				.title
					line-height:14px
					margin-bottom:8px
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
				.detail
					margin-bottom:18px
					line-height:10px
					height:10px
					font-size:0
					.sell-count,.rating
						font-size:10px
						color:rgb(147,153,159)
					.sell-count
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
					right:12px
					bottom:12px
				.buy
					position:absolute
					right:18px
					bottom:18px
					z-index:10
					height:26px
					line-height:26px
					padding:0 12px
					box-sizing:border-box
					border-radius:12px
					font-size:10px
					color:#fff
					background:rgb(0,160,220)
				.test
					position:absolute
					right:53px
					bottom:30px
			.info
				padding:18px
				.title
					line-height:14px
					font-size:14px
					margin-bottom:6px
					color:rgb(7,17,27)
				.text
					line-height:24px
					font-size:12px
					padding:0 8px
					color:rgb(77,86,93)
			.rating
				padding-top:18px
				.title
					line-height:14px
					font-size:14px
					margin-left:18px
					color:rgb(7,17,27)
				.rating-wrapper
					padding: 0 18px
					.rating-item
						position:relative
						padding:16px 0
						border-bottom:1px solid rgba(7,17,27,0.1)
						.user
							position:absolute
							right:0
							top:16px
							font-size:0
							line-height:12px
							.name
								display:inline-block
								vertical-align:top
								font-size:10px
								color:rgb(147,153,159)
								margin-right:6px
							.avatar
								border-radius:50%
						.time
							margin-bottom:6px
							line-height:12px
							font-size:10px
							color:rgb(147,153,159)
						.text
							line-height:16px
							font-size:12px
							color:rgb(7,17,27)
							.icon
								display:inline-block
								margin-right:4px
								width:12px
								height:12px
								background-size:12px 12px
								background-repeat:no-repeat
								background-image:url('./unlike.png')
								&.like
									background-image:url('./like.png')
					.no-rating
						padding:16px 0 
						font-size:12px
						color:rgb(147,153,159)
						
</style>

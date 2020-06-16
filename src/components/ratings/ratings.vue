<template>
	<div class="ratings" ref="rating">
		<div class="ratings-content" >
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<v-star :size="36" :score="seller.serviceScore"></v-star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评价</span>
						<v-star :size="36" :score="seller.foodScore"></v-star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<v-split></v-split>
			<v-ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"
			@ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle"></v-ratingselect>
			<div class="ratings-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28"/>
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<v-star :size="24" :score="rating.score"></v-star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend">
								<span class="icon" :class="{'like':rating.rateType===0}"></span>
								<span v-for="item in rating.recommend" class="item-style"
								 v-show="rating.recommend.length && rating.recommend">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import ratingselect from '../ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date.js'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default{
	props:['seller'],
	components:{
		'v-star':star,
		'v-split':split,
		'v-ratingselect':ratingselect,
	},
	data(){
		return {
			ratings:[],
			selectType:ALL,
			onlyContent:false,
		}
	},
	created(){
		this.$http.get('/api/ratings').then((res) => {
			res = res.data
			this.ratings = res
			console.log(res[0].avatar)
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.rating,{
					click:true,
					probeType:3
				})
			})
		})
		
	},
	methods:{
		ratingtypeSelect(type){
			this.selectType = type
		},
		contentToggle(onlyContent){
			this.onlyContent = onlyContent
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false
			}
			if(this.selectType == ALL){
				return true
			}else{
				return this.selectType === type
			}
		},
	},
	filters:{
		formatDate(time){
			let date = new Date(time)
			return formatDate(date,'yyyy-MM-dd hh:mm')
		}
	},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings
		position:absolute
		top:178px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 137px
				width:137px
				border-right:1px solid rgba(7,17,27,0.1)
				text-align:center
				font-size:0
				padding:6px 0
				@media only screen and (max-width:320px)
					flex:0 0 120px
					width:120px
				.score
					line-height:28px
					font-size:24px
					margin-bottom:6px
					color:rgb(255,153,0)
					
				.title
					font-size:12px
					line-height:12px
					margin-bottom:6px
					color:rgb(7,17,27)
				.rank
					font-size:10px
					line-height:10px
					color:rgba(7,17,27,0.6)
					
			.overview-right
				flex:1 1 auto
				padding:6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left:6px
				.score-wrapper
					margin-bottom:8px
					line-height:18px
					font-size:0
					.title
						display:inline-block
						vertical-align:top
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
					.star
						display:inline-block
						vertical-align:top
						margin:0 12px
					.score
						display:inline-block
						vertical-align:top
						font-size:12px
						color:rgb(255,153,0)
				.delivery-wrapper
					font-size:0
					.title
						display:inline-block
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
					.delivery
						margin-left:12px
						display:inline-block
						line-height:18px
						font-size:12px
						color:rgb(147,153,159)
		.ratings-wrapper
			padding:0 18px
			.rating-item
				padding:18px 0
				display:flex
				border-bottom:1px solid rgba(7,17,27,0.1)
				.avatar
					flex: 0 0 28px
					margin-right:12px
					width:28px
					height:28px
					img
						border-radius:50%
				.content
					position:relative
					flex:1
					.name
						margin-bottom:4px
						font-size:10px
						line-height:12px
						color:rgb(7,17,27)
					.star-wrapper
						margin-bottom:6px
						.star
							display:inline-block
							vertical-align:top
							margin-right:6px
						.delivery
							display:inline-block
							vertical-align:top
							line-height:12px
							font-size:10px
							font-weight:200
							color:rgb(147,153,159)
					.text
						margin-bottom:8px
						line-height:18px
						font-size:12px
						font-weight:200
						color:rgb(7,17,27)
					.recommend
						line-height:16px
						font-size:0
						.icon
							margin-top:2px
							vertical-align:top
							line-height:16px
							font-size:12px
							display:inline-block
							width:12px
							height:12px
							background-repeat:no-repeat
							background-size:12px 12px
							background-image:url('./unlike.png')
							&.like
								background-image:url('./like.png')
						.item-style
							display:inline-block
							margin-left:8px
							padding:0 6px
							font-size:9px
							max-width:60px
							height:16px
							white-space:nowrap
							overflow:hidden
							text-overflow:ellipsis
							border:1px rgba(1,17,27,0.1) solid
							color:rgb(147,153,159)
					.time
						position:absolute
						top:0
						right:0
						line-height:12px
						font-size:10px
						font-weight:200
						color:rgb(147,153,159)
					
</style>

<template>
	<div class="seller" ref="seller">
		<div class="seller-content" >
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<v-star :size="36" :score="seller.score"></v-star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="blockname">起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="blockname">商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="blockname">平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<v-split></v-split>
			<div class="bulletin">
				<h1 class="title">活动与公告</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="supports">
					<li class="support-item" v-for="item in seller.supports" v-show="seller.supports.length">
						<span class="icon " :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list">
						<li class="pic-item" v-for="pic in seller.pics">
							<img class="pic" :src="pic" width="120" height="90"/>
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
			<div class=""></div>
		</div>
	</div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'
import {saveToLocal,loadFromLocal} from '../../common/js/store.js'
export default{
	props:['seller'],
	components:{
		'v-star':star,
		'v-split':split,
	},
	mounted(){
		this._initScroll()
		this._initPicScroll()
	},
	watch:{
		seller:function(newval,oldval){
			this._initPicScroll()
		}
	},
	data(){
		return{
			classMap:['decrease','discount','special','invoice','guarantee'],
			favorite:(() =>{
				return loadFromLocal(this.seller.id,'favorite',false)
			})(),
		}
	},
	computed:{
		favoriteText(){
			return this.favorite?'已收藏':'收藏'
		}
	},
	methods:{
		_initScroll(){
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.seller,{
					click:true,
					probeType:3
				})
			})
		},
		_initPicScroll(){
			if(this.seller.pics){
				let pic = this.$refs.picWrapper
				let picWidth = 120
				let margin = 6
				let width = (picWidth + margin) * this.seller.pics.length
				pic.childNodes[0].style.width = width + 'px'
				this.picScroll = new BScroll(pic,{
					scrollX:true,//横向滑动
					eventPassthrough:'vertical' //忽略垂直方向的滑动
				})
			}
		},
		toggleFavorite(){
			this.favorite = !this.favorite
			saveToLocal(this.seller.id,'favorite',this.favorite)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.seller
	position:absolute
	top:178px
	bottom:0
	left:0
	width:100%
	overflow:hidden
	.overview
		padding:18px
		position:relative
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.desc
			padding-bottom:18px
			line-height:18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			font-size:0
			.star
				vertical-align:top
				display:inline-block
				margin-right:8px
			.text
				vertical-align:top
				margin-right:12px
				line-height:18px
				font-size:10px
				color:rgb(77,85,93)
		.remark
			padding-top:18px
			display:flex
			.block
				display:inline-block
				flex:1
				text-align:center
				border-right:1px solid rgba(7,17,27,0.1)
				&:last-child
					border-right:none
				.blockname
					line-height:10px
					font-size:10px
					color:rgb(147,153,159)
				.content
					margin-top:4px
					font-size:10px
					color:rgb(7,17,27)
					.stress
						line-height:24px
						font-size:24px
						font-weight:200
		.favorite
			position:absolute
			top:18px
			right:18px
			width:36px
			text-align:center
			.icon
				display:block
				width:24px
				height:24px
				margin:0 auto 2px auto
				background-size:24px 24px
				background-repeat:no-repeat
				background-image:url('./heart.png')
				&.active
					background-image:url('./heart_active.png')
			.text
				font-size:10px
				color:rgb(77,85,93)
				line-height:10px
	.bulletin
		padding: 18px 18px 0 18px
		.title
			margin-bottom:8px
			line-height:14px
			font-size:14px
			color:rgb(7,17,27)
		.content-wrapper
			padding: 0 12px
			border-bottom:1px solid rgba(7,17,27,0.1)
			.content
				line-height:24px
				font-size:12px
				font-weight:200
				color:rgb(240,20,20)
				padding-bottom:16px
		.supports
			.support-item
				padding:16px 12px
				border-bottom:1px solid rgba(7,17,27,0.1)
				font-size:0
				&:last-child
					border-bottom:none
				.icon
					display:inline-block
					width:16px
					height:16px
					margin-right:6px
					vertical-align:top
					background-size:16px 16px
					background-repeat:no-repeat
					&.decrease
						background-image:url('./decrease_4@2x.png')
					&.discount
						background-image:url('./discount_4@2x.png')
					&.special
						background-image:url('./special_4@2x.png')
					&.invoice
						background-image:url('./invoice_4@2x.png')
					&.guarantee
						background-image:url('./guarantee_4@2x.png')
				.text
					text-align:center
					font-size:12px
					font-weight:200
					vertical-align:top
					color:rgb(7,17,27)
					line-height:16px
	.pics
		padding:18px
		.title
			margin-bottom:12px
			line-height:14px
			font-size:14px
			color:rgb(7,17,27)
		.pic-wrapper
			width:100%
			overflow:hidden
			white-space:nowrap
			.pic-list
				font-size:0
				.pic-item
					display:inline-block
					margin-right:6px
					width:120px
					height:90px
					&:last-child
						margin-right:0
</style>

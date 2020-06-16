<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width='64' height="64" :src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support" >
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="right"></span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<span class="bulletin-right"></span>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%"  />
		</div>
		<transition name='fade'>
			<div class="detail" v-show="detailShow" >
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<v-star :size="48" :score="seller.score"></v-star>
						</div>
						<div class="title-wrapper">
							<v-title :text="'优惠信息'"></v-title>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="item in seller.supports" :key="item.type">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title-wrapper">
							<v-title :text="'商家公告'"></v-title>
						</div>
						<div class="bulletin">
							<p class="bulletin-text">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="showDetail">x</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from '../star/star.vue'
import title from '../title/title.vue'
export default{
	components: {
		'v-star':star,
		'v-title':title,
	},
	props:['seller'],
	data() {
		return {
			classMap:['decrease','discount','special','invoice','guarantee'],
			detailShow:false
		}
	},
	methods:{
		showDetail:function(){
			this.detailShow=!this.detailShow
		}
	},
	mounted:function (){
		// console.log(this.seller.supports.length)
	},
	
	
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	// 清除浮动
	.clearfix
		display:inline-block
		&:after
			display:block
			content:"."
			height:0
			line-height:0
			clear:both
			visibility:hidden
	.fade-enter-active,.fade-leave-active
		transition: opacity .5s
	.fade-enter,.fade-leave-to
		opacity: 0
	.header
		color:white
		// background:#999
		background-color:rgba(7,17,27,0.5)
		position:relative
		overflow:hidden
		
		.content-wrapper
			padding:24px 16px 18px 24px
			font-size:0
			position:relative
			.avatar
				display:inline-block
				border-radius:2px
			.content
				// font-size:14px
				display:inline-block
				margin-left:16px
				.title
					margin:2px 0 8px 0px
					.brand
						display:inline-block
						vertical-align:top
						width:30px
						height:18px
						background-image:url('brand@3x.png')
						background-size:30px 18px
						background-repeat:no-repeat
					.name
						margin-left:6px
						font-size:16px
						line-height:18px
						font-weight:bold
				.description
					margin-bottom:10px
					font-size:12px
					font-weight:200
					line-height:12px
				.support
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							background-image:url('decrease_1@3x.png')
						&.discount
							background-image:url('discount_1@3x.png')
						&.guarantee
							background-image:url('guarantee_1@3x.png')
						&.invoice
							background-image:url('invoice_1@3x.png')
						&.special
							background-image:url('special_1@3x.png')
					.text
						// vertical-align:top
						line-height:12px
						font-size:10px
			.support-count
				
				position:absolute
				right:12px
				bottom:18px
				border-radius:14px
				background-color:rgba(0,0,0,0.2)
				height:24px
				line-height:24px
				text-align:center
				padding:0 8px
				.count
					font-size:10px
					// vertical-align:top
				.right
					font-size:10px
					line-height:24px
					margin-left:2px
					display:inline-block
					width:10px
					height:10px
					background-image:url('./right.png')
					background-repeat:no-repeat
					background-size:10px 10px
		.bulletin-wrapper
			position:relative
			// font-size:0
			height:28px
			line-height:28px
			padding:0 22px 0 12px
			background-color:rgba(7,17,27,0.2)
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			.bulletin-title
				display:inline-block
				vertical-align:top
				margin-top:7px
				height:14px
				width:26px
				background-image:url('bulletin@3x.png')
				background-size:26px 14px
				background-repeat:no-repeat
			.bulletin-text
				margin:0 4px
				font-size:10px
				font-weight:200
				line-height:28px
			.bulletin-right
				position:absolute
				font-size:10px
				line-height:10px
				display:inline-block
				right:12px
				top:10px
				width:10px
				height:10px
				background-image:url('./right.png')
				background-repeat:no-repeat
				background-size:10px 10px
		.background
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			z-index:-1
			filter:blur(10px)
			background:blur(10px)
		.detail
			position:fixed
			top:0
			left:0
			z-index:100
			width:100%
			height:100%
			overflow:auto
			background:rgba(7,17,27,0.8)
			.detail-wrapper
				min-height:100%
				width:100%
				.detail-main
					margin-top:64px
					padding-bottom:64px
					.name
						line-height:16px
						font-size:16px
						font-weight:700
						text-align:center
					.star-wrapper
						text-align:center
						padding: 16px 0 28px 0
					.title-wrapper
						padding-bottom:24px
					.supports
						list-style:none
						font-size:0
						width:78%
						margin:0 auto
						padding-bottom:16px
						.icon
							display:inline-block
							width:16px
							height:16px
							margin-right:6px
							margin-bottom:12px
							background-size:16px 16px
							background-repeat:no-repeat
							&.decrease
								background-image:url('decrease_2@3x.png')
							&.discount
								background-image:url('discount_2@3x.png')
							&.guarantee
								background-image:url('guarantee_2@3x.png')
							&.invoice
								background-image:url('invoice_2@3x.png')
							&.special
								background-image:url('special_2@3x.png')
						.text
							display:inline-block
							vertical-align:top
							font-size:12px
							font-weight:200
							line-height:16px
					.bulletin
						width:78%
						margin:0 auto
						.bulletin-text
							font-size:12px
							font-weight:200
							line-height:24px
						
			.detail-close
				color:rgba(255,255,255,0.5)
				position:relative
				text-align:center
				width:32px
				height:32px
				font-size:32px
				margin:-64px auto 0 auto
</style>

<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives}}</span></span>
		</div>
		<div @click="toggleContent" class="switch">
			<span class="icon" :class="{'on':onlyContent}"></span>
			<span class="text">只看内容评论</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default{
	props:{
		ratings:{
			type:Array,
			default(){
				return []
			}
		},
		selectType:{
			type:Number,
			default:ALL
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		desc:{
			type:Object,
			default(){
				return {
					all:'全部',
					positive:'满意',
					negative:'不满意'
				}
			}
		}
	},
	methods:{
		select(type){
			// this.selectType = type
			this.$emit('ratingtype-select',type)
		},
		toggleContent(){
			// this.onlyContent = !this.onlyContent
			this.$emit('content-toggle',!this.onlyContent)
		}
	},
	computed:{
		positives(){
			return this.ratings.filter((rating) =>{
				return rating.rateType === POSITIVE
			}).length
		},
		negatives(){
			return this.ratings.length - this.positives
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			font-size:0
			.block
				font-size:12px
				display:inline-block
				padding:8px 12px
				margin-right:8px
				border-radius:1px
				color:rgb(77,85,93)
				.count
					font-size:8px
					margin-left:2px
					line-height:16px
				&.positive
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
						color:#fff
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
						color:#fff
		.switch
			padding:12px 18px
			line-height:24px
			border-bottom:1px solid rgba(7,17,27,0.1)
			color:rgb(147,153,159)
			font-size:0
			.icon
				display:inline-block
				vertical-align:top
				width:24px
				height:24px
				font-size:24px
				background-size:24px 24px
				background-image:url('./unselected.png')
				background-repeat:no-repeat
				&.on
					background-image:url('./selected.png')
			.text
				vertical-align:top
				display:inline-block
				margin-left:4px
				font-size:12px
</style>

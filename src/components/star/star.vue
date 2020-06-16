<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass"
		class="star-item" ></span>
	</div>
</template>

<script>
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'
	export default {
		props:['size','score'],
		computed:{
			starType(){
				return 'star-' + this.size
			},
			itemClasses(){
				let result = []
				let score = this.score
				for(let i=0;i<LENGTH;i++){
					if(score < 0.5){
						result.push(CLS_OFF)
						score--
					}else if(score<1){
						result.push(CLS_HALF)
						score--
					}else{
						result.push(CLS_ON)
						score--
					}
				}
				return result
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.star
		font-size:0
		.star-item
			display:inline-block
			background-repeat:no-repeat
		&.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				background-size:20px 20px
				&:last-child
					margin-right:0
				&.on
					background-image:url('./star48_on@3x.png')
				&.half
					background-image:url('./star48_half@3x.png')
				&.off
					background-image:url('./star48_off@3x.png')
		&.star-36
			.star-item
				width:15px
				height:15px
				margin-right:6px
				background-size:15px 15px
				&:last-child
					margin-right:0
				&.on
					background-image:url('./star48_on@3x.png')
				&.half
					background-image:url('./star48_half@3x.png')
				&.off
					background-image:url('./star48_off@3x.png')
		&.star-24
			.star-item
				width:10px
				height:10px
				margin-right:3px
				background-size:10px 10px
				&:last-child
					margin-right:0
				&.on
					background-image:url('./star48_on@3x.png')
				&.half
					background-image:url('./star48_half@3x.png')
				&.off
					background-image:url('./star48_off@3x.png')
		
</style>

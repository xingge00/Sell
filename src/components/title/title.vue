<template>
	<div class="v-title">
		<div class="v-line"></div>
		<div class="v-text">{{text}}</div>
		<div class="v-line"></div>
	</div>
</template>

<script>
	export default{
		props:['text']
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.v-title
		text-align:center
		display:flex
		flex-direction:rows
		justify-content:center
		align-items:center
		width:100%
		.v-text
			margin:0 12px
			font-weight:700
		.v-line
			width:30%
			height:0
			border-bottom:1px rgba(255,255,255,0.2) solid
		
</style>

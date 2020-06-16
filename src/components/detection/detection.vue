<template>
	<div class="detection" >
		<div class="detection-wrapper" >
			<div class="camera">
				<img src="./camera.png" width="150" height="150" ref="img" />
			</div>
			<input @change="show" type="file" accept="image/*" class="openCamera" id="openCamera">
			
		</div>
		<div class="tip" @click.stop="showTips=!showTips">
			<img src="./tip.png" width="25" height="25"/>
			<p class="text">提示</p>
		</div>
		<transition name="tips">
			<div v-if="showTips" ref="tips" class="tips">
				<div class="title-content">
					<v-title :text="'提示'"/>
					<h2 class="desc">目前紧支持识别以下食物</h2>
				</div>
				<div class="tips-content" >
					<div class="tips-item" v-for="item in tipsText">{{item}}</div>
				</div>
				<div class="close" @click="showTips=!showTips">X</div>
			</div>
		</transition>
		<transition name="food">
			<div v-if="showFlag" class="food" ref="food">
				<div class="food-content">
					<div class="back" @click="hide">
						<img src="./back.png" class="icon" width=20 height=20 />
					</div> 
					<div class="temp"></div>
					<div class="image-wrapper">
						<div class="image-header">
							<img class="img" :src="imgsrc" width="150" height="150" />
						</div>
					</div>
					<h1 class="title">{{detection_food.name}}</h1>
					<div class="content">
						<p class="desc">热量：</p>
						<p class="hot">
							<span class="icon"></span>
							<span class="num">{{detection_food.content.heat}}</span>
							<span class="danwei">千卡/100克</span>
						</p>
						<p class="desc">三大营养素：</p>
						<p>碳水化合物：{{detection_food.content.carbohydrate}}克/100克</p>
						<p>脂类：{{detection_food.content.fat}}克/100克</p>
						<p>蛋白质：{{detection_food.content.protein}}克/100克</p>
						<p class="desc">其他：</p>
						<p>{{detection_food.content.do}}</p>
					</div>
				</div>
			</div>
		</transition>
		<div class="loading" v-if="loading">
			<div class="loadingImage"></div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Vtitle from '../title/title.vue'
export default{
	data(){
		return {
			imgsrc:'',
			detection_food:{},
			showFlag:false,
			showTips:false,
			loading:false,
			tipsText:["叉烧", "凤爪", "饺子", "肠粉", "烧麦", "牛排", "酿辣椒", "咖喱鸡",
			 "东坡肉", "甜甜圈", "汉堡包", "烤全羊", "椒盐虾", "清蒸鱼", "卤肉饭", "回锅肉", 
			 "红烧茄子", "白灼菜心", "香脆鸡腿", "凉拌黄瓜", "麻婆豆腐", "意大利面", "夫妻肺片", 
			 "铁板鱿鱼", "红烧排骨", "宫爆鸡丁", "番茄炒蛋", "鱼香肉丝", "西兰花炒肉", "麻辣小龙虾"]
		}
	},
	components:{
		'v-title':Vtitle
	},
	methods:{
		show(){
			let dom = document.getElementById('openCamera')
			let file=dom.files[0]
			let reader=new FileReader()
			reader.onloadend = ()=> { 
				//异步执行file文件读取完成时执行
				this.imgsrc =reader.result
				
				let formData = new FormData();
				formData.append('content',file);
				this.loading = true
				this.$http.post(
					'http://106.52.236.138/food_detection',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						}
					}).then(function (res){
						this.loading = false
						if(res.data === 'fail'){
							alert("这个我不认识")
							return
						}
						res.data.content = JSON.parse(res.data.content)
						this.detection_food = res.data
						this.showFlag = true
						this.$nextTick(() => {
							this.scroll = new BScroll(this.$refs.food,{
								click:true,
								probeType:3
							})
						})
					} , function () {
						alert("文件上传失败");
					})
			}
			reader.readAsDataURL(file)
			
		},
		hide(){
			this.showFlag = !this.showFlag
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@keyframes anim{
	0%{ transform:translate(-50%,-50%) rotate(0) }
	50%{ transform:translate(-50%,-50%) rotate(180deg) }
	100%{ transform:translate(-50%,-50%) rotate(360deg) }
}
.detection
	position:absolute
	top:179px
	bottom:0
	right:0
	left:0
	.loading
		position:fixed
		width:100%
		height:100%
		background:rgba(7,17,27,0.4)
		top:0
		left:0
		.loadingImage
			position:relative
			left:50%
			top:50%
			width:30px
			height:30px
			// background:black
			border-radius:50%
			border-left:4px solid #FFF
			border-right:4px solid #FFF
			border-top:4px solid transparent
			border-bottom:4px solid transparent
			animation: 2s anim infinite linear
	.detection-wrapper
		position:relative
		top:40%
		left:50%
		width:150px
		transform:translate(-50%,-50%)
		border 4px solid #4fa1dc
		padding:8px 14px
		border-radius:45px
		margin-bottom:60px
		&::before
			position:absolute
			content:''
			width:200px
			height:70px
			top:50%
			left:-10px
			transform:translatey(-50%)
			background:white
		&::after
			position:absolute
			content:''
			top:-10px
			left:50%
			width:70px
			height:200px
			transform:translatex(-50%)
			background:white
			z-index:-1
		.camera
			transform:translatez(1px)
	.openCamera
		top:0
		left:0
		position:absolute
		opacity:0
		width:178px
		height:178px
		transform:translatez(2px)
	.tip
		padding:5px
		position:absolute
		top:10%
		right:10%
		.text
			line-height:12px
			font-size:12px
			color:rgba(7,17,27,0.4)
	.food-enter-active.food-leave-active
		transform:translate3D(0,0,0)
	.food-enter,.food-leave-to
		transform:translate3D(100%,0,0)
	.tips-enter-active.tips-leave-active
		transition: opacity .5s
	.tips-enter,.tips-leave-to
		opacity: 0
	.tips
		position:fixed
		top:0
		left:0
		bottom:0
		z-index:29
		width:100%
		color:white
		transition: all 0.2s linear
		background:rgba(7,17,27,0.8)
		.title-content
			padding:36px 0 5px 0
			.desc
				padding-top:16px
				text-align:center
		.tips-content
			display:flex
			padding:16px
			flex-wrap:wrap
			.tips-item
				width:50%
				font-size:14px
				line-height:20px
				text-align:center
		.close
			font-size:24px
			font-weight:700
			position:absolute
			bottom:5%
			left:50%
			transform:translatex(-50%)
			color:white
			
	.food
		position:fixed
		top:0
		left:0
		bottom:0
		z-index:30
		width:100%
		background:white
		transition: all 0.2s linear
		.food-content
			// position:relative
			.temp
				width:100%
				height:0
				padding-bottom:1px
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
			.image-wrapper
				position:relative
				border: 2px solid rgba(7,27,37,0.4)
				box-shadow:1px 1px 3px rgb(7,27,37)
				width:150px
				height:150px
				margin:60px auto 20px auto
				padding:20px
				border-radius:20px
			.title
				margin: 6px
				font-size:24px
				font-weight:800
				text-align:center
			.content
				margin:20px
				padding:20px
				border-radius: 20px
				box-shadow: 2px 0 15px rgb(226, 223, 223)
				p
					font-size:16px
					margin: 25px 0 25px 0
				.desc
					font-size:20px
				.hot
					text-align:center
					margin: 20px 0 20px 0
					.icon
						display:inline-block
						width:42px
						height:42px
						vertical-align:top
						background-image:url('./fire.png')
						background-size:42px 42px
						background-repeat:no-repeat
						margin-right:6px
					.num
						vertical-align:top
						font-size:42px
						color:red
						margin-right:6px
					.danwei
						font-size:16px
						vertical-align:top
						color:rgba(7,17,27,0.6)
</style>

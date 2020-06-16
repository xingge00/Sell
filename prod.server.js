var express = require('express');
var config = require('./config/index');
// 设置端口
var port = process.env.PORT || config.build.port;

// 创建一个app
var app = express();

// 启动一个路由作为项目入口
var router = express.Router()
router.get('/',function(req, res, next){
	req.url = '/index.html';
	next();
});
app.use(router);

// 启动一个路由mock数据
const data = require('./mock/data.json')
const seller = data.seller
const goods = data.goods
const ratings = data.ratings
const apiRoutes = express.Router()
apiRoutes.get('/seller',(req,res)=>{
	res.json(seller)
})
apiRoutes.get('/ratings',(req,res)=>{
	res.json(ratings)
})
apiRoutes.get('/goods',(req,res)=>{
	res.json(goods)
})
app.use('/api', apiRoutes)

// 指定项目静态文件路径
app.use(express.static('./dist'))

// 运行app监听prot端口
module.exports = app.listen(port, function(err){
	if(err){
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
})
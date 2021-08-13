//knex操作数据库
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {opinion,src,wechat,openid} = ctx.request.body
	console.log("======opinion",opinion)
	console.log("======src",src)
	console.log("======wechat",wechat)
	console.log("======openid",openid)
	try{
		await mysql('opinions').insert({
			opinion,src,wechat,openid
		})

		ctx.state.data = {
			code:0,
			msg:"success"
		}
		console.log("执行成功")
	}catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"添加失败" + e.sqlMessage
			}
		}
		console.log("执行错误")
	}
	
}
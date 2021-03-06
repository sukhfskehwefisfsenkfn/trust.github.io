const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {openid} = ctx.request.body
	try{
		const res = await mysql("records")
											.where("openid",openid)
											.orderBy("id","desc")
											.first()
		if(res){
			await mysql("records").where("id",res.id).del()
			const re_res = await mysql("records")
											.where("openid",openid)
											.select("mark")
											.orderBy("id","desc")
											.first()
			if(re_res){
				var mark = re_res.mark
			}else{
				var mark = 0
			}
		}else{
			var mark = 0
		}

		ctx.state.data = {
			code:0,
			msg:"success",
			mark:mark
		}
		console.log("执行成功")
	}catch(e){
		console.log("执行失败",e)
		ctx.state = {
			code:-1,
			data:{
				msg:'撤销失败'+e.sqlMessage
			}
		}
	}
}
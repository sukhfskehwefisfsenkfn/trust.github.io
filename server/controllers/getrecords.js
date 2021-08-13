//knex操作数据库
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {openid,page} = ctx.request.query

	try{
		const records = await mysql("records")
		                      .where("openid",openid)
		                      .orderBy("id","desc")
		                      .limit(15).offset(Number(page)*15)  //page = 2
    ctx.state.data = {
    	records
    }
	}catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"获取失败"+e.sqlMessage
			}
		}
	}
}
// 获取当前使用小程序用户的唯一标识 id(Openid)
// 无参数，返回值 res.result 为用户 id
// 本次作业中，将 id 作为每一位用户数据的标识，后续所有数据库相关操作均需要 id 作为参数
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = await cloud.getWXContext()
  return wxContext.OPENID
}
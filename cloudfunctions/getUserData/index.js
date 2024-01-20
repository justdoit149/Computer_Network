// 获取用户对应的地理位置数组
// 参数为 id
// 返回值 res.result 为包含所有收藏位置的数组
// 若不存在查询用户，返回 null

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const collection = db.collection('UserDataBase')

exports.main = async (event, context) => {
  const idToCheck = event.id
  try {
    const res = await collection.where({
      _id: idToCheck
    }).get()
    if (res.data.length > 0) {
      return res.data[0].geo // 返回对应项的geo字段  
    } else {
      throw new Error('未找到对应项')
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
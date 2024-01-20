// 初始化用户在数据库中的存储条目
// 参数为 id
// 返回值 res.result 为状态信息（调试用途），如果存在 error 还会返回详细 error
// 如果用户已经初始化过，调用本函数不会出错，可以放心初始化
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const collection = db.collection('UserDataBase')

// 云函数入口函数
exports.main = async (event, context) => {
  const idToCheck = event.id

  try {
    // 检查id是否存在  
    const result = await collection.where({
      _id: idToCheck
    }).get()
    if (result.data.length > 0) {
      // 如果存在
      return '条目已存在'
    } else {
      // 如果不存在，创建新的条目  
      await collection.add({
        data: {
          _id: idToCheck,
          geo: []
        }
      })
      return '新条目已创建'
    }
  } catch (error) {
    console.error(error)
    return {
      error,
      message: '发生错误'
    }
  }
}
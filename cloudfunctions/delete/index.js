// 删除对应用户的数组中的特定元素
// 参数为 id geo(需要删除的地理位置信息)
// 返回值 res.result 为状态信息（调试用途），如果存在 error 还会返回详细 error
// 函数可以处理被删除元素本来就不在数组中的情况
// 删除前后数组的顺序不变，符合在页面上顺序显示的逻辑

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const collection = db.collection('UserDataBase')
// 云函数入口函数
exports.main = async (event, context) => {
  const idToCheck = event.id
  const stringToDelete = event.geo
  try {
    const res = await collection.where({
      id: idToCheck
    }).get()
    if (res.data.length > 0) {
      var geoArray = res.data[0].geo
      geoArray = geoArray.filter(item => item !== stringToDelete); 
      await collection.where({
        id: idToCheck
      }).update({
        data: {
          geo: geoArray
        }
      }) // 更新geo数组到数据库中  
      return '删除完毕'
    } else {
      throw new Error('未找到对应项')
    }
  } catch (error) {
    console.error(error)
    return {
      error,
      success: false,
      message: '删除失败'
    }
  }
}
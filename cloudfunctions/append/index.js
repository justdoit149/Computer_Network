// 向对应用户的数组的末尾添加一个元素
// 参数为 id geo(需要添加的地理位置信息)
// 返回值 res.result 为状态信息（调试用途），如果存在 error 还会返回详细 error
// 由于数组中不应该出现相同的地理位置，因此如果数组中已有需要添加的元素，函数不会重复添加，以保证元素唯一性

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const collection = db.collection('UserDataBase')
// 云函数入口函数
exports.main = async (event, context) => {
  const idToCheck = event.id
  const elementToAdd = event.geo
  try {
    const res = await collection.where({
      _id: idToCheck
    }).get()
    if (res.data.length > 0) {
      var geoArray = res.data[0].geo
      var hasSameElement = false
      for(var i = 0; i < geoArray.length; i++){
        if(JSON.stringify(geoArray[i]) === JSON.stringify(elementToAdd)){
          hasSameElement = true
        }
      }
      if (!hasSameElement) {
        geoArray.push(elementToAdd) // 将指定元素添加到geo数组中  
        await collection.where({
          _id: idToCheck
        }).update({
          data: {
            geo: geoArray
          }
        }) // 更新geo数组到数据库中  
        return '添加成功'
      } else {
        return '元素已存在'
      }
    } else {
      throw new Error('未找到对应项')
    }
  } catch (error) {
    console.error(error)
    return {
      error,
      message: '添加失败'
    }
  }
}
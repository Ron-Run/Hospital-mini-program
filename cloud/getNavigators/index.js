const cloud = require('wx-server-sdk')

cloud.init({
  env: "runry01-e7ei9"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("navigatorList").get()
}
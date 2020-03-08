// // 云函数入口文件
 const cloud = require('wx-server-sdk')

var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  return rp(`https://movie.douban.com/j/new_search_subjects?tags=%E7%94%B5%E5%BD%B1&start=${event.page}`)
}
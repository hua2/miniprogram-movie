// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid: '',
    movietitle: '',
    moviecover: '',
    rate: 3,
    value: '',
    fileList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange(event){
    this.setData({
      value:event.detail
    })

  },
  onRateChange(event) {
    this.setData({
      rate: event.detail
    })

  },
  submit() {
    wx.showLoading({
      title: '提交中',
    })
    const db = wx.cloud.database();
    db.collection('comment').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          movieid: this.data.movieid,
          value: this.data.value,
          rate: this.data.rate,
          fileList: this.data.fileList,
        }
      })
      .then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
        })
        console.log(res)
      })
      .catch(res => {
        wx.hideLoading();
        console.log(error)
      })
  },
  afterRead(event) {
    console.log('afterRead', event);
    wx.showLoading({
      title: '上传中',
    })
    const {
      file
    } = event.detail;
    const promiseArr = [];
    for (let i = 0; i < file.length; i++) {
      const path = file[i].path;
      const promise = new Promise((resolve, reject) => {
        const suffix = /\.\w+$/.exec(path);
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime() + suffix,
          // 指定要上传的文件的小程序临时文件路径
          filePath: path,
        }).then(res => {
          resolve(res.fileID)
        }).catch(error => {
          reject(error)
        })
      })
      promiseArr.push(promise)
    }
    Promise.all(promiseArr).then(res => {
      const images = res.map(img => {
        return {
          url: img
        }
      })
      this.setData({
        fileList: this.data.fileList.concat(images)
      })
      wx.hideLoading();
    }).catch(error => {
      console.log(error)
      wx.hideLoading();
    })

  },
  deleteImage(event) {
    wx.showLoading({
      title: '删除中',
    })
    const index = event.detail.index;
    console.log(this.data.fileList[index])
    wx.cloud.deleteFile({
      fileList: [this.data.fileList[index].url]
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '删除成功'
      });
      this.data.fileList.splice(index, 1)
      this.setData({
        fileList: this.data.fileList
      })
    }).catch(error => {
      console.log(error)
    })
  },
  onLoad: function(options) {

    this.setData({
      movieid: options.movieid,
      movietitle: options.movietitle,
      moviecover: options.moviecover
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
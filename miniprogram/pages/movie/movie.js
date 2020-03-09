// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },
  goToComment(event) {
    console.log("event", event)
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}&movietitle=${
        event.target.dataset.movietitle}
        &moviecover=${event.target.dataset.moviecover}
        `})
  },
  getMoviesList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movieList',
      data: {
        page: this.data.movieList.length,
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading();
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).data)
      })
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMoviesList();
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
    this.getMoviesList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// miniprogram/pages/files/files.js
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2019 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the Files
 */

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: app.getEnd(),
    fileimg: "cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/file.png",
    files: [
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－学术篇.pdf',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－选课篇(网站版).pdf',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－宿舍篇(网站版).pdf',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－生活篇(网站版).pdf',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－活动篇(网站版).pdf',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/files/2023新生指南－行前手册 (网站版).pdf'
    ],
    flag: "block",
    load: 0,
    complete: 0
  },

  imgLoad: function (e) {
    var that = this;
    that.setData({
      load: that.data.load+1,
      complete: ((that.data.load+1)/8).toFixed(2) * 100
    })
  },

  download: function(e) {
    var id = e.currentTarget.dataset.id
    wx.cloud.downloadFile({
      fileID: this.data.files[id],
      success: res => {
        if (res.statusCode == 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: res => {
              wx.openDocument({
                filePath: res.savedFilePath,
                success: res => {
                  console.log('SUCCESS')
                },
              })
            },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
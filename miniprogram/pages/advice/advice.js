// miniprogram/pages/frontPage/frontPage.js
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the first page
 */

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: app.getEnd(),
    flag: "block",
    load: 0,
    complete: 0,
    imgNum: 2,
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/this.data.imgNum).toFixed(2)*100)
    })
  },

  submitForm: function(e) {
    var adviceContent = e.detail.value.adviceContent
    if (!adviceContent) {
      wx.showModal({
        showCancel: false,
        title: "内容错误",
        content: "意见或建议不可为空！",
      })
    }
    else {
      const db = wx.cloud.database()
      db.collection('advices').add({
        data: {
          openid: app.globalData.userSensitiveData.openid,
          adviceInfo: adviceContent
        }, success: res => {
          wx.showModal({
            showCancel: false,
            title: "反馈成功！",
            content: "感谢您的意见与建议！\nMSN会因你而更好！",
            confirmText: "回到主页",
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  url: '../frontPage/frontPage'
                })
              }
            }
          })
        }
      })
    }
  },

  resetForm: function(e) {},

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
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
    recentActivities: [
      {name: "MSN Casino Night"},
      {name: "UVA Rush"},
      {name: "Shanghai Send-off"}
    ],
    activityPhoto: [
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/eventPhoto/casinoNight.JPG',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/eventPhoto/uvaRush.JPG',
      'cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/eventPhoto/shSendoff.jpg'
    ],
    end: app.getEnd(),
    flag: "block",
    load: 0,
    complete: 0,
    imgNum: 12,
  },

  getInfo: function() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.userSensitiveData = res.result
        console.log(res.result, "success")
      },
      fail: res => {
        console.log("Fail", res)
      }
    })
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/this.data.imgNum).toFixed(2)*100)
    })
  },

  /**
   * to Recent Activity 1
   */
  toAct1: function() {
    wx.navigateTo({
      url: '/pages/recentActivities/one/one'
    })
  },

  /**
   * to Recent Activity 2
   */
  toAct2: function() {
    wx.navigateTo({
      url: '/pages/recentActivities/two/two'
    })
  },

  /**
   * to Recent Activity 3
   */
  toAct3: function() {
    wx.navigateTo({
      url: '/pages/recentActivities/three/three'
    })
  },

  /**
   * to Event Signup
   */
  toSignup: function() {
    wx.navigateTo({
      url: '/pages/eventSignup/event'
    })
  },

  /**
   * to Files
   */
  toFile: function() {
    wx.navigateTo({
      url: '/pages/files/files'
    })
  },

  /**
   * to Webs
   */
  toWeb: function() {
    wx.navigateTo({
      url: '/pages/webs/webs'
    })
  },

  /**
   * to Public Wechat
   */
  toPub: function() {
    wx.navigateTo({
      url: '/pages/dining/dining'
    })
  },

  /**
   * to Attendance
   */
  toPersonal: function() {
    wx.navigateTo({
      url: '/pages/personal/personal'
    })
  },

  /**
   * to bug report
   */
  toBugReport: function() {
    wx.navigateTo({
      url: '/pages/bugs/bugs',
    })
  },

  /**
   * to advice collection
   */
  toAdvice: function() {
    wx.navigateTo({
      url: '/pages/advice/advice',
    })
  },

  /**
   * to miscellaneous
   */
  toMiscell: function() {
    wx.navigateTo({
      url: '/pages/miscell/miscell',
    })
  },

  /**
   * to chatroom
   */
  toChat: function() {
    wx.navigateTo({
      url: '/components/chat/chat',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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
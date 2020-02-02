// miniprogram/pages/frontPage/frontPage.js
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2019 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the attendance page
 */

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: app.getEnd(),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: "block",
    load: 0,
    complete: 0,
    curTime: '',
    timeData: '',
    userScore: 0,
    userStartDate: '',
    userHistory: 0
  },

  getTime: function(e) {
    var timeStamp = Date.parse(new Date())
    var date = new Date(timeStamp)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    this.setData({
      timeData: year+'-'+month+'-'+day,
      curTime: year+'年'+month+'月'+day+'日'
    })
  },

  imgLoad: function (e) {
    var that = this;
    that.setData({
      load: that.data.load+1,
      complete: ((that.data.load+1)/2).toFixed(2) * 100
    })
  },

  checkTimeHistory: function(start, end) {
    if (start == null) {
      var startDate = new Date(end)
    }
    else {
      var startDate = new Date(start)
    }
    var endDate = new Date(end)
    var dif = parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    this.setData({
      userHistory: dif+1
    })
  },

  register: function(e) {
    this.getTime()
    this.checkTimeHistory(this.data.userInfo.registerDate, this.data.timeData)
    console.log(this.data.userInfo)
    const db = wx.cloud.database()
    const _ = db.command

    db.collection('attendance').where({
      nickName: this.data.userInfo.nickName
    }).get().then(res => {
      if (res.data.length != 0) {
        // user in database
        console.log(res.data)
        db.collection('attendance').doc(res.data[0]._id).update({
          data: {
            history: this.data.userHistory,
            score: this.data.userHistory * 2 + res.data[0].eventList.length * 3
          }
        })
      }
      else {
        // user not in database
        db.collection('attendance').add({
          data: {
            nickName: this.data.userInfo.nickName,
            score: 2,
            history: 1,
            registerDate: this.data.timeData,
            eventList: []
          }, success: res => {
            console.log('ADDED')
            this.onShow()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    }
    else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    }
    else {
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    this.register()
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
    const db = wx.cloud.database()
    db.collection('attendance').where({
      nickName: this.data.userInfo.nickName
    }).get({
      success: res => {
        this.setData({
          userScore: res.data[0].score,
          userStartDate: res.data[0].registerDate,
          userHistory: res.data[0].history
        })
      }
    })
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
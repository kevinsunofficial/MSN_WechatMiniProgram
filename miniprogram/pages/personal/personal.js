/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the personal page
 */

var app = getApp();

var info = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: app.getEnd(),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hide: false,
    flag: "block",
    load: 0,
    complete: 0,
    userSensitiveData: {},
    userRegularData: {},
    userInfoOnScreen: {
      registerDate: '加载中...',
      history: '加载中...',
      score: '加载中...'
    },
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/12).toFixed(2)*100)
    })
  },

  getTime: function(e) {
    var timeStamp = Date.parse(new Date())
    var date = new Date(timeStamp)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var time = year+'-'+month+'-'+day
    return time
  },

  getHistory: function(start, end) {
    if (start == "" || start == end) {
      return 1
    }
    var startDate = new Date(start)
    var endDate = new Date(end)
    var dif = parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))+1
    return dif
  },

  onGetUserInfo: function(e) {
    const db = wx.cloud.database()
    const _ = db.command
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userRegularData = e.detail.userInfo
      this.setData({
        hide: false,
        userRegularData: app.globalData.userRegularData
      })

      // add or update
      db.collection('testUserData').where({
        _openid: this.data.userSensitiveData.openid
      }).get().then(
        res => {
          console.log(res.data)
          if (res.data.length==0) {
            db.collection('testUserData').add({
              data: {
                _openid: this.data.userSensitiveData.openid,
                generalData: this.data.userRegularData,
                eventList: [],
                registerDate: this.getTime(),
                history: 1,
                score: 1
              }
            })
          }
          else {
            var userRegDate = res.data[0].registerDate
            var userEvents = res.data[0].eventList
            db.collection('testUserData').doc(res.data[0]._id).update({
              data: {
                history: this.getHistory(userRegDate, this.getTime()),
                score: this.getHistory(userRegDate, this.getTime())+userEvents.length*3
              }
            })
          }

          // update userInfoOnScreen
          db.collection('testUserData').where({
            _openid: this.data.userSensitiveData.openid
          }).get().then(
            res => {
              if (res.data.length!=0) {
                this.setData({
                  userInfoOnScreen: {
                    registerDate: res.data[0].registerDate,
                    history: res.data[0].history,
                    score: res.data[0].score
                  }
                })
              }
            }
          )
        }
      )
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userSensitiveData: app.globalData.userSensitiveData
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              app.globalData.userRegularData = res.userInfo
              this.setData({
                userRegularData: app.globalData.userRegularData
              })

              const db = wx.cloud.database()
              const _ = db.command
              
              // add or update
              db.collection('testUserData').where({
                _openid: this.data.userSensitiveData.openid
              }).get().then(
                res => {
                  console.log(res.data)
                  if (res.data.length==0) {
                    db.collection('testUserData').add({
                      data: {
                        _openid: this.data.userSensitiveData.openid,
                        generalData: this.data.userRegularData,
                        eventList: [],
                        registerDate: this.getTime(),
                        history: 1,
                        score: 1
                      }
                    })
                  }
                  else {
                    var userRegDate = res.data[0].registerDate
                    var userEvents = res.data[0].eventList
                    db.collection('testUserData').doc(res.data[0]._id).update({
                      data: {
                        history: this.getHistory(userRegDate, this.getTime()),
                        score: this.getHistory(userRegDate, this.getTime())+userEvents.length*3
                      }
                    })
                  }

                  // update userInfoOnScreen
                  db.collection('testUserData').where({
                    _openid: this.data.userSensitiveData.openid
                  }).get().then(
                    res => {
                      if (res.data.length!=0) {
                        this.setData({
                          userInfoOnScreen: {
                            registerDate: res.data[0].registerDate,
                            history: res.data[0].history,
                            score: res.data[0].score
                          }
                        })
                      }
                    }
                  )
                }
              )
            },
          })
        }
        else {
          this.setData({
            hide: true
          })
        }
      }
    })
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
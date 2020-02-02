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
 * This page is the eventSignup page
 */

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        end: app.getEnd(),
        array: ["请选择", "大一", "大二", "大三", "大四", "研究生", "其它"],
        index: 0,
        flag: "block",
        load: 0,
        complete: 0,
        eventName: "示例活动",
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

    imgLoad: function (e) {
        var that = this;
        that.setData({
          load: that.data.load+1,
          complete: ((that.data.load+1)/2).toFixed(2) * 100
        })
    },

    pickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },

    submitForm: function(e) {
        console.log(e.detail.value);
        var {cnname, enname, email, year} = e.detail.value;
        if (!cnname || !email) {
            wx.showModal({
                showCancel: false,
                title: "内容错误",
                content: "中文姓名及邮箱不可为空！",
            });
        }
        else if (year == 0) {
            wx.showModal({
                showCancel: false,
                title: "内容错误",
                content: "请选择年级！",
            })
        }
        else {
            const db = wx.cloud.database();
            db.collection('event1Signup').add({
                data: {
                    CHNName: cnname,
                    ENGName: enname,
                    Year: this.data.array[year],
                    Email: email
                },
                success: res => {
                    console.log("Success!")
                    wx.showModal({
                        showCancel: false,
                        title: "报名成功！",
                        content: "您已报名成功！\n敬请期待活动的详细通知。",
                        confirmText: "回到主页",
                        success (res) {
                            if (res.confirm) {
                                wx.navigateBack({url:'../frontPage/frontPage'})
                            }
                        }
                    })
                },
            })
        }
    },

    resetForm: function(e) {},

    wechatSignup: function(e) {
        this.getTime()
        this.checkTimeHistory(this.data.userInfo.registerDate, this.data.timeData)
        const db = wx.cloud.database()
        const _ = db.command

        db.collection('attendance').where({
            nickName: this.data.userInfo.nickName
        }).get().then(res => {
            if (res.data.length != 0) {
                // user in database
                if (!res.data[0].eventList.includes(this.data.eventName)) {
                    res.data[0].eventList.push(this.data.eventName)
                    console.log(res.data[0].eventList)
                    db.collection('attendance').doc(res.data[0]._id).update({
                        data: {
                          eventList: res.data[0].eventList,
                          score: res.data[0].history*2 + res.data[0].eventList.length*3
                        }
                    })
                    db.collection('eventSignup').add({
                        data: {
                            CHNName: this.data.userInfo.nickName,
                            ENGName: 'weChat',
                            Year: NaN,
                            Email: 'weChat'
                        },
                        success: res => {
                            console.log("Success!")
                            wx.showModal({
                                showCancel: false,
                                title: "报名成功！",
                                content: "您已报名成功！\n敬请期待活动的详细通知。",
                                confirmText: "回到主页",
                                success (res) {
                                    if (res.confirm) {
                                        wx.navigateBack({url:'../frontPage/frontPage'})
                                    }
                                }
                            })
                        },
                    })
                }
                else {
                    wx.showToast({
                        title: '请勿重复报名！',
                        icon: 'none',
                        duration: 2500
                    })
                }
            }
            else {
                // user not in database
                db.collection('attendance').add({
                    data: {
                      nickName: this.data.userInfo.nickName,
                      score: 5,
                      history: 1,
                      registerDate: this.data.timeData,
                      eventList: [this.data.eventName]
                    },
                })
                db.collection('event1Signup').add({
                    data: {
                        CHNName: this.data.userInfo.nickName,
                        ENGName: 'weChat',
                        Year: NaN,
                        Email: 'weChat'
                    },
                    success: res => {
                        console.log("Success!")
                        wx.showModal({
                            showCancel: false,
                            title: "报名成功！",
                            content: "您已报名成功！\n敬请期待活动的详细通知。",
                            confirmText: "回到主页",
                            success (res) {
                                if (res.confirm) {
                                    wx.navigateBack({url:'../frontPage/frontPage'})
                                }
                            }
                        })
                    },
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the eventSignup page One
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
    eventName: "Cooking Contest\n食客",
    userSensitiveData: {},
    userRegularData: {},
    available: true,
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/12).toFixed(2)*100)
    })
  },

  pickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  submitForm: function (e) {
    var {
      cnname,
      enname,
      email,
      year
    } = e.detail.value;
    if (!cnname || !email) {
      wx.showModal({
        showCancel: false,
        title: "内容错误",
        content: "中文姓名及邮箱不可为空！",
      });
    } else if (year == 0) {
      wx.showModal({
        showCancel: false,
        title: "内容错误",
        content: "请选择年级！",
      })
    } else {
      const db = wx.cloud.database();
      db.collection('event1Signup').add({
        data: {
          CHNName: cnname,
          ENGName: enname,
          Year: this.data.array[year],
          Email: email
        },
        success: res => {
          wx.showModal({
            showCancel: false,
            title: "报名成功！",
            content: "您已报名成功！\n敬请期待活动的详细通知。",
            confirmText: "回到主页",
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  url: '../frontPage/frontPage'
                })
              }
            }
          })
        },
      })
    }
  },

  resetForm: function (e) {},

  wechatSignup: function (e) {
    if (this.data.available) {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('event1Signup').where({
        ENGName: this.data.userSensitiveData.openid
      }).get().then(
        res => {
          if (res.data.length==0) {
            db.collection('event1Signup').add({
              data: {
                CHNName: this.data.userRegularData.nickName,
                ENGName: this.data.userSensitiveData.openid,
                Email: "wechat",
                Year: "1800"
              },
              success: res => {
                // update
                db.collection('testUserData').where({
                  _openid: this.data.userSensitiveData.openid
                }).get().then(
                  res => {
                    console.log(res.data)
                    if (res.data.length!=0) {
                      var updatedEventList = res.data[0].eventList.push('eventName')
                      db.collection('testUserData').doc(res.data[0]._id).update({
                        data: {
                          eventList: updatedEventList,
                          score: _.inc(3)
                        }, success: res => {
                          console.log("Successfully updated after signup")
                        }
                      })
                    }
                  }
                )

                wx.showModal({
                  showCancel: false,
                  title: "报名成功！",
                  content: "您已报名成功！\n敬请期待活动的详细通知。",
                  confirmText: "回到主页",
                  success(res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        url: '../frontPage/frontPage'
                      })
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
      )
    }
    else {
      // direct to personal page to authorize
      wx.showModal({
        showCancel: true,
        title: "请先授权！",
        content: "请先到个人主页授权！\n授权完毕再使用微信报名。",
        confirmText: "去授权",
        cancelText: "直接报名",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../../../personal/personal'
            })
          }
          else if (res.cancel) {
            console.log("normal signup")
          }
        }
      })
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
                userRegularData: app.globalData.userRegularData,
              })
            },
          })
        }
        else {
          // Unauthorized, WeChat signup currently unavailable
          this.setData({
            available: false,
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
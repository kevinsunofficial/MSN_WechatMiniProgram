// miniprogram/pages/dining/dining.js
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the Dining Evaluation
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
    time: [],
    status: "",
    diningHall: ['newcomb', 'ohill', 'runk'],
    newcombScore: 0,
    ohillScore: 0,
    runkScore: 0,
    dataCollection:[
      {
        name: "Newcomb",
        score: 0,
        show: false,
        id: 0
      },
      {
        name: "O-Hill",
        score: 0,
        show: false,
        id: 1
      },
      {
        name: "Runk",
        score: 0,
        show: false,
        id: 2
      },
    ],
    available: true,
    imgNum: 5,
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/this.data.imgNum).toFixed(2)*100)
    })
  },

  getTime: function(e) {
    var timeStamp = Date.parse(new Date())
    var date = new Date(timeStamp)
    var hour = date.getHours()
    var week = date.getDay()
    this.setData({
      time: [hour, week],
    })
  },

  renewData: function(e) {
    const db = wx.cloud.database()
    const _ = db.command
    if (this.data.time[0] < 6 && this.data.time[0] >= 0) {      
      for (const dhName of this.data.diningHall) {
        var dbName = dhName+"Rate"
        var id = dhName+"database"
        db.collection(dbName).doc(id).update({
          data: {
            total: 0,
            people: 0
          }
        })
      }
    }
    else {
      for (const dhName of this.data.diningHall) {
        var dbName = dhName+"Rate"
        var id = dhName+"database"
        db.collection(dbName).where({
          name: dhName
        }).get({
          success: res => {
            if (dhName == "newcomb") {
              if (res.data[0].people.length != 0) {
                this.data.dataCollection[0].score = (res.data[0].total / res.data[0].people.length).toFixed(2)
                this.setData({
                  dataCollection: this.data.dataCollection
                })
              }
            }
            else if (dhName == "ohill") {
              if (res.data[0].people.length != 0) {
                this.data.dataCollection[1].score = (res.data[0].total / res.data[0].people.length).toFixed(2)
                this.setData({
                  dataCollection: this.data.dataCollection
                })
              }
            }
            else {
              if (res.data[0].people.length != 0) {
                this.data.dataCollection[2].score = (res.data[0].total / res.data[0].people.length).toFixed(2)
                this.setData({
                  dataCollection: this.data.dataCollection
                })
              }
            }
          }
        })
      }
    }
  },

  checkTime: function(e) {
    var hour = this.data.time[0]
    var week = this.data.time[1]

    if (hour < 7 || hour >= 20) {
      return "已打烊"
    }
    else if (hour >= 14 && hour < 20) {
      if (hour >= 14 && hour < 17) {
        return "下午茶时段"
      }
      else return "晚餐时段"
    }
    else {
      if ((week == 0 || week == 6) && (hour >= 8 && hour < 14)) {
        // Sat, Sun, 8:00 - 14:00
        return "早午餐时段"
      }
      else {
        if (week != 0 && week != 6) {
          // Mon - Fir
          if (hour >= 7 && hour < 11) {
            // 7:00 - 11:00
            return "早餐时段"
          }
          else if (hour >= 11 && hour < 14) {
            // 11:00 - 14:00
            return "午餐时段"
          }
        }
      }
    }
  },

  checkAvail: function(e) {
    function checkOpenid(value) {
      return value == app.globalData.userSensitiveData.openid
    }
    const db = wx.cloud.database()
    var count = 0

    db.collection('newcombRate').where({
      name: 'newcomb'
    }).get().then(
      res => {
        count += res.data[0].people.filter(checkOpenid).length
        db.collection('ohillRate').where({
          name: 'ohill'
        }).get().then(
          res => {
            count += res.data[0].people.filter(checkOpenid).length
            db.collection('runkRate').where({
              name: 'runk'
            }).get().then(
              res => {
                count += res.data[0].people.filter(checkOpenid).length
                this.setData({
                  available: count<5
                })
              }
            )
          }
        )
      }
    )
  },

  rate: function(e) {
    if (this.data.available) {
      var score = e.detail.value.score
      var dhName = this.data.diningHall[e.currentTarget.dataset.id]
      var dbName = dhName+"Rate"
      var id = dhName+"database"

      var pList = []

      const db = wx.cloud.database()
      const _ = db.command

      db.collection(dbName).where({
        name: dhName
      }).get().then(
        res => {
          pList = res.data[0].people
          pList.push(app.globalData.userSensitiveData.openid)
          console.log(pList)

          db.collection(dbName).doc(id).update({
            data: {
              total: _.inc(parseInt(score)),
              people: pList
            }, success: res => {
              wx.showToast({
                title: '评价成功',
                icon: 'success',
                duration: 1500
              })
              for (const i of [0, 1, 2]) {
                this.data.dataCollection[i].show = false
              }
              this.setData({
                dataCollection: this.data.dataCollection
              })
              this.onShow()
            }, fail: res => {
              console.log(res)
            }
          })
        }
      )
    }
    else {
      wx.showToast({
        title: '评价次数已达上限！',
        icon: 'none',
        duration: 2500
      })
    }
  },

  changeShow: function(e) {
    var i = e.currentTarget.dataset.id
    if (this.data.dataCollection[i].show) {
      this.data.dataCollection[i].show = false
    }
    else {
      this.data.dataCollection[i].show = true
    }
    this.setData({
      dataCollection: this.data.dataCollection
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
    this.getTime()
    this.renewData()
    // wx.cloud.callFunction({
    //   name: 'resetNewcomb'
    // }).then(console.log('newcomb reset'))
    this.setData({
      status: this.checkTime(),
    })
    this.checkAvail()
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
// pages/item/item.js
import regeneratorRuntime from '../../utils/runtime.js'
const db = wx.cloud.database();
const items = db.collection('items');
const ids = db.collection('idMatch');
const _ = db.command

var app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    item:{},
    wxid: '',
  },

  pageData: {

  },
  
  loadData: function(){
    items.doc(this.pageData.id).get().then(res => {
      this.setData({
        item: res.data,
      }, () => {
        this.matchContact();
      })
    })
    items.doc(this.pageData.id).update({
      data: {
        views: _.inc(1)
      }
    })
  },
  matchContact: function(){
    var that = this;
    ids.where({
        _openid: that.data.item._openid
      }).get({　
        success: function(res) {
          if(res.data.length != 0){
            that.setData({
              wxid: res.data[0].wxid,
            })
          }
        }
      })
  },
  onLoad: function (options) {
    this.pageData.id = options.id;
    // const pro = () => { return new Promise((resolve, reject) => {
      this.loadData();
    // })};
    // pro().then((res) => {this.matchContact()});

  },

  clickImg: function(e){
    var currentUrl = e.currentTarget.dataset.src;
    console.log(currentUrl)
    wx.previewImage({
      urls: this.data.item.image,
      current: currentUrl,
    })
  },

  copyID: function(){
    wx.setClipboardData({
      data: this.data.wxid,
      success: function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
  
})
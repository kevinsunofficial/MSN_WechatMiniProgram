// miniprogram/pages/webs/webs.js
/**
 * This is the prototype of MSN's miniprogram
 * The miniprogram is still under development
 * It is not recommanded to be put into any form of commercial use
 * @2020 Mainland Student Network. All rights reserved
 * Author:
 * Yuchen Sun
 */
/**
 * This page is the Webs
 */

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: app.getEnd(),
    fileimg: "cloud://msnprototype-2pun5.6d73-msnprototype-2pun5-1300672980/web.png",
    urls: [
      'https://mp.weixin.qq.com/s?__biz=MzAwODQxMTk3Mg==&mid=506916418&idx=1&sn=19ccb2ee33bc78791439ade58cf4430c&mpshare=1&scene=1&srcid=0207NahuWyN9JqZFWKnIcBby#rd',
      'https://mp.weixin.qq.com/s?__biz=MzAwODQxMTk3Mg==&mid=506916438&idx=1&sn=ae6e4b7898df2d712d1d86c04654ffbf&mpshare=1&scene=1&srcid=0207VJBwOmo7S2JmTyrP82S9#rd',
      'https://mp.weixin.qq.com/s?__biz=MzAwODQxMTk3Mg==&mid=506916614&idx=1&sn=60ffc95dbf3d7e8c0802c3af31139143&mpshare=1&scene=1&srcid=02071nVMqNp9JuhiOJnOSeA1#rd',
      'https://mp.weixin.qq.com/s?__biz=MzAwODQxMTk3Mg==&mid=208852627&idx=1&sn=21826248187e343de3f4cc814f3924f2&mpshare=1&scene=1&srcid=0207w155UfvrLrEtd6PEejBf#rd',
      'https://mp.weixin.qq.com/s?__biz=MzAwODQxMTk3Mg==&mid=2654400400&idx=1&sn=a982daa22898ec57f00715a907ddc07d&mpshare=1&scene=1&srcid=0911k0T5zhpnbEHv9bqCzAdO#rd'
    ],
    flag: "block",
    load: 0,
    complete: 0
  },

  imgLoad: function (e) {
    this.setData({
      load: this.data.load+1,
      complete: parseInt(((this.data.load+1)/12).toFixed(2)*100)
    })
  },

  link: function(e) {
    
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
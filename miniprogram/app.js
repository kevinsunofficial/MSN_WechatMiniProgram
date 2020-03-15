//app.js
App({

  globalData: {
    userSensitiveData: {},
    userRegularData: {},
    authReq: true,
    SDKVersion: ''
  },

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'msnprototype-2pun5',
        traceUser: true,
      })
    }

    // // version comparison (from wechat team)
    // function compareVersion(v1, v2) {
    //   v1 = v1.split('.')
    //   v2 = v2.split('.')
    //   var len = Math.max(v1.length, v2.length)
    //   while (v1.length < len) {
    //     v1.push('0')
    //   }
    //   while (v2.length < len) {
    //     v2.push('0')
    //   }
    //   for (var i = 0; i < len; i++) {
    //     var num1 = parseInt(v1[i])
    //     var num2 = parseInt(v2[i])
    //     if (num1 > num2) {
    //       return 1
    //     }else if (num1 < num2) {
    //       return -1
    //     }
    //   }
    //   return 0
    // }
    
    // // update module
    // wx.getSystemInfo({
    //   success: res => {
    //     this.globalData.SDKVersion = res.SDKVersion
    //     console.log(res.SDKVersion)
    //   },
    // })

    // const version = compareVersion(this.globalData.SDKVersion, '1.9.90')
    // if (version >= 0) {
    //   const updateManager = wx.getUpdateManager()
    //   updateManager.onCheckForUpdate(
    //     res => {
    //       if (res.hasUpdate) {
    //         updateManager.onUpdateReady(
    //           res => {
    //             wx.showModal({
    //               title: "有新版本可用",
    //               content: "有新版本可用，是否重启更新？",
    //               success: res => {
    //                 if (res.confirm) {
    //                   updateManager.applyUpdate()
    //                 }
    //               }
    //             })
    //           }
    //         )
    //       }
    //     }
    //   )
    // }
  },

  onShow: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
        wx.showModal({
          title: '更新失败',
          content: '请删除小程序并重新搜索进入以更新。',
          showCancel: false,
          success(res) {
            console.log(res)
          }
        })
      })
    }
    else {
      // 微信版本过低
      wx.showModal({
        title: '更新失败',
        content: '当前微信版本过低，无法正常更新。\n请升级到最新微信版本。',
        showCancel: false,
        success(res) {
          console.log(res)
        }
      })
    }
  },

  getEnd: function() {
    return "Although this organization has members who are University of Virginia students and may have University employees associated or engaged in its activities and affairs, the organization is not a part of or an agency of the University. It is a separate and independent organization which is responsible for and manages its own activities and affairs. The University does not direct, supervise or control the organization and is not responsible for the organization's contracts, acts or omissions.\n© 2020 Mainland Student Network. All rights reserved."
  },

  getUserData: function() {
    return userSensitiveData, userRegularData
  },
})

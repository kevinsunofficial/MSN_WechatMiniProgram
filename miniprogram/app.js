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

  },

  onShow: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(function () {
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

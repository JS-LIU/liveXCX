// pages/login/login.js
import { userService } from '../../store/service/UserService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  onLogin:function(){
    
    // if (res.code) {
    //   userService.bindWechatProgram(res.code).then((data)=>{
    //     console.log(data);
    //   });
    //   //发起网络请求
    //   wx.request({
    //     url: 'https://test.com/onLogin',
    //     data: {
    //       code: res.code
    //     }
    //   })
    // } else {
    //   console.log('登录失败！' + res.errMsg)
    // }
  },
  onWxLogin:function(e){
    console.log(e);
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          userService.bindWechatProgram({
            code:res.code,
            encryptedData: e.detail.encryptedData,
            iv:e.detail.iv,
            signature: e.detail.signature
          }).then((data)=>{
            userService.updateUserInfo({ token: data.data.token });
            wx.setStorage({
              key: "token",
              data: data.data.token
            })
            if (data.data.bindStatus === 1){
              
              wx.navigateTo({
                url: '/pages/bindPhoneNum/bindPhoneNum',
              })
            }else{
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    // userService.bindWechatProgram(res.code).then((data) => {
    //   console.log(data);
    // });
  }
})
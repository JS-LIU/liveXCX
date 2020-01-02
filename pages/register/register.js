// pages/register/register.js
import { userService } from '../../store/service/UserService.js';
import { HB } from '../../store/util/HB.js';
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
 
  onRegister: function (e) { 
    if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(this.password))){
      wx.showToast({
        title: '请输入6-18位字母+数字',
        icon: 'none',
        duration: 2000
      })
    } else if (this.password_again !== this.password){
      wx.showToast({
        title: '请输入相同的密码',
        icon: 'none',
        duration: 2000
      })
    }else{
      userService.updateUserPwd(this.password).then(() => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      })
    }
    
    
    // userInfo.registerBy
  },
  onInputPassword: function (e){
    this.password = e.detail.value
  },
  onInputPassword_again: function (e){
    this.password_again = e.detail.value
  }
})
// pages/bindPhoneNum/bindPhoneNum.js
import { userService } from '../../store/service/UserService.js';
import {HB} from '../../store/util/HB.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vCodeText:"获取验证码",
    vCodeStyle: "background: #7F7F7F",
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
  onGetVCode:function(){
    if (this.data.vCodeText === "获取验证码" && HB.valid.isPoneAvailable(this.phoneNum)){
      let start = 60;
      wx.showToast({
        title: '请注意查收验证码',
        icon: 'none',
        duration: 2000
      })
      let t = setInterval(()=>{
        start -- ;
        this.setData({
          vCodeText: start+"秒后重新获取",
          vCodeStyle:"background:#7F7F7F"
        })
        
        if (start < 1){
          clearInterval(t);
          this.setData({
            vCodeText: "获取验证码",
            vCodeStyle: "background: #FFC200"
          })
        }
      },1000)
    }
    userService.bindProgramVerifyCode(this.phoneNum);

  },
  onInputPhoneNum:function(e){
    console.log(e.detail.value);
    this.phoneNum = e.detail.value;
    if (!HB.valid.isPoneAvailable(this.phoneNum) || !this.data.vCodeText ==="获取验证码"){
      
      this.setData({
        vCodeStyle: "background: #7F7F7F" 
      });
    }else{
      
      this.setData({
        vCodeStyle: "background: #FFC200" 
      });
    }
  },
  onInputVCode: function (e){
    this.vCode = e.detail.value;
    
  },
  onBindPhoneNum: function (e){
    userService.bindUser(this.phoneNum, this.vCode).then((data)=>{
      userService.updateUserInfo({ token: data.data.token });
      if (data.data.bindStatus === 3){
        wx.navigateTo({
          url: '/pages/register/register',
        })
      }else{
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }).catch(()=>{
      wx.showToast({
        title: '输入正确的验证码',
        icon: 'none',
        duration: 2000
      })
    });
  }
})
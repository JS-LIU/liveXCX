// pages/couponList/couponList.js
import {userService} from '../../store/service/UserService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponStatusList:[],
    couponList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      couponStatusList:userService.couponStatusManager.getCouponStatusStatus()
    })
    userService.pagination.to(1);
    this.updateCouponList();
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
  updateCouponList:function(){
    userService.queryUserAccountCoupon().then((couponList)=>{
      console.log(couponList);
      this.setData({
        couponList: couponList
      })
    });
  },
  cutStatus:function(e){
    let status = e.currentTarget.dataset.status;
    
    this.setData({
      couponStatusList: userService.couponStatusManager.cutCouponStatus(status)
    })
    userService.pagination.to(1);
    this.updateCouponList();
  },
  getMore:function(){
    userService.pagination.nextPage();
    this.updateCouponList();
  }
})
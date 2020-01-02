// pages/orderDetail/orderDetail.js
import {orderService } from '../../store/service/OrderService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    course:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderNo = options.orderNo;
    orderService.queryOrderDetail(orderNo).then((order)=>{
      let course = order.orderCourse.getModule.before((repairParam) => {
        repairParam = repairParam || {};
        repairParam.startTime = order.orderCourse.courseInfo.getStartTimeToShow("unix");
        repairParam.endTime = order.orderCourse.courseInfo.getEndTimeToShow("unix");
      }).call(order.orderCourse, {});
      console.log(course);
      console.log(order.getModule());
      this.setData({
        order: order.getModule(),
        course: course
      })
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
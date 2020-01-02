// pages/orderList/orderList.js
import { orderService } from "../../store/service/OrderService.js";
import { payService } from '../../store/service/PayService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatusList: [],
    orderList:[],
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
    orderService.pagination.to(1);
    this.updateOrderList();
    this.setData({
      orderStatusList: orderService.searchOrderStatus.getSearchOrderStatus()
    })
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
  getMore:function(){
    orderService.pagination.nextPage();
    this.updateOrderList();
  },
  updateOrderList: function () {
    orderService.getOrderList().then((orderList) => {
      for (let i = 0; i < orderList.length;i++){
        let productModule = orderList[i].orderCourse.getModule.before((repairParam) => {
          repairParam = repairParam || {};
          repairParam.showSellPrice = (orderList[i].sellPrice / 100).toFixed(2);
          repairParam.startTime = orderList[i].orderCourse.courseInfo.getStartTimeToShow("unix");
          repairParam.endTime = orderList[i].orderCourse.courseInfo.getEndTimeToShow("unix");
        }).call(orderList[i].orderCourse, {});
        orderList[i].orderCourseModule = productModule;
      }
      this.setData({
        orderList: orderList
      })
    })
  },

  onCancelOrder:function(e){
    let orderNo = e.currentTarget.dataset.orderNo;
    let self = this;
    wx.showModal({
      content: "确认取消付款",
      showCancel: true,
      cancelText: "确认取消",
      confirmText: "暂不取消",
      confirmColor: "#FFC200",
      success(res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          orderService.cancelOrder(orderNo).then(() => {
            self.updateOrderList()
          })
        }
      }
    })
  },
  onChangeStatus: function (e){
    let status = e.currentTarget.dataset.status;
    this.setData({
      orderStatusList: orderService.searchOrderStatus.cutSearchOrderStatus(status)
    });

    orderService.pagination.to(1);
    this.updateOrderList();
    
  },
  onToPay:function(e){
    let order = e.currentTarget.dataset.order;
    console.log(order);
    if (order.status === 3005){
      wx.navigateTo({
        url: '/pages/createOrder/createOrder?orderNo=' + order.orderNo + "&requestWay=orderDetail",
      })
    }else{
      // console.log()
      //  3001的支付
      orderService.rePay(order.orderNo).then((data)=>{
        if (data.data.payStatus === 0) {
          wx.navigateTo({
            url: '/pages/paySuccess/paySuccess',
          })
        } else {
          payService.wxPay(data.data.payModels[0]);
        }
      })
    }
  },
  toDetail:function(e){
    // let orderNo = e.currentTarget.dataset.orderNo;
    // console.log(orderNo);
    // let url = "/pages/orderDetail/orderDetail?orderNo=" +orderNo;
    // wx.navigateTo({
    //   url: url,
    // })
  }
})
// pages/createOrder/createOrder.js
import { orderService } from '../../store/service/OrderService.js';
import { payService } from '../../store/service/PayService.js';
import { TimeManager} from '../../store/entity/TimeManager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useCouponList:[],
    couponList: [],
    canUseCouponList: [],
    balance: 0,
    realPay: 0,
    order: {},
    orderCourse:{},
    couponReduceCash:"",
    useBalance:true,
    showCouponList:false,
    countDown:"20:00",
    isShowShadow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodNo = options.goodNo;
    let orderNo = options.orderNo;
    console.log(orderNo);
    let requestWay = options.requestWay || "preOrder";
    console.log(requestWay);
    orderService.preOrder(requestWay, goodNo, orderNo).then((preOrderInfo)=>{
      let settleManager = preOrderInfo.settleManager;
      
      let orderCourse = preOrderInfo.order.orderCourse.getModule.before((repairParam)=>{
        repairParam.startTime = preOrderInfo.order.orderCourse.courseInfo.getStartTimeToShow("unix");
        repairParam.endTime = preOrderInfo.order.orderCourse.courseInfo.getStartTimeToShow("unix");
        repairParam.showSellPrice = (preOrderInfo.order.orderCourse.sellPrice / 100).toFixed(2)
      }).call(preOrderInfo.order.orderCourse,{})
      console.log(preOrderInfo.order.orderCourse);
      this.setData({
        useCouponList: settleManager.couponManager.getDefCouponList(),
        canUseCouponList: settleManager.couponManager.canUseCouponList,  
        balance: (settleManager.getMaxCanUseBalance() / 100).toFixed(2),
        realPay: (settleManager.calcRealPay() / 100).toFixed(2),
        couponReduceCash: (settleManager.getCouponReduceCash() / 100).toFixed(2),
        orderCourse: orderCourse,
        order: preOrderInfo.order,
        couponList: settleManager.couponManager.couponList
      });
      this.startCountDown();
      console.log(settleManager.getMaxCanUseBalance())
    }).catch((msg)=>{
      console.log(msg);
      this.setData({
        isShowShadow:true
      })
      if (msg.message === "请先登录"){
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }else{
        wx.showToast({
          title: msg.message,
          duration: 2000,
          icon: 'none',

        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
        
      }
      
    }); 
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
    clearInterval(this.t)
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
  onShowCouponList: function () {
    this.setData({
      showCouponList:true
    })
  },
  onHideCouponList(){
    this.setData({
      showCouponList: false
    })
  },
  onToggleUseBalance:function(){
    orderService.toggleUseBalance().then((settleManager)=>{
      this.setData({
        useBalance: (settleManager.account.useBalance/100).toFixed(2),
        balance: (settleManager.getMaxCanUseBalance()/100).toFixed(2),
        realPay: (settleManager.calcRealPay()/100).toFixed(2),
      })
    });    
  },
  onSelectCoupon:function(e){
    let accountCouponNo = e.currentTarget.dataset.accountCouponNo;
    orderService.toggleSelectCoupon(accountCouponNo).then((settleManager)=>{
      this.setData({
        useCouponList: settleManager.couponManager.couponList,
        realPay: (settleManager.calcRealPay()/100).toFixed(2),
        couponReduceCash: (settleManager.getCouponReduceCash()/100).toFixed(2),
        couponList: settleManager.couponManager.couponList
      })
    });
    
  },
  onPayOrder:function(){
    orderService.takeOrder().then((data)=>{
      if (data.data.payStatus === 0){
        wx.navigateTo({
          url: '/pages/paySuccess/paySuccess',
        })    
      }else{
        payService.wxPay(data.data.payModels[0]);
      }
    })
  },
  onCancelOrder:function(){
    let orderNo = this.data.order.orderNo
    wx.showModal({
      title: '确认取消付款',
      content: '报名成功，请在20分钟内完成支付，以免错失班级',
      cancelText: "确认离开",
      confirmText: "继续支付",
      confirmColor: "#FFC200",
      success(res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          orderService.cancelOrder(orderNo).then(() => {
            wx.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
    
  },
  startCountDown: function () {
    let payLastTime = this.data.order.payLastTime;
    this.t = setInterval(() => {
      this.setData({
        countDown: TimeManager.getCountDownTime(payLastTime - TimeManager.currentTimeStampBySec())
      });
      if (payLastTime - TimeManager.currentTimeStampBySec() < 0) {
        clearInterval(this.t);
        wx.redirectTo({
          url: '/pages/payFail/payFail',
        })
      }
    }, 1000)
  }
})
// pages/my/my.js
import { userService } from '../../store/service/UserService.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShowLogin:true,
    myItemList: [{
      title: "我的推荐",
      img: "../img/present_icon.png",
      link: "/pages/myPrefit/myPrefit",
      isNeedLogin:true,
    },{
      title:"修改信息",
      img:"../img/reset_user_info.png",
      link:"/pages/resetMyInfo/resetMyInfo",
      isNeedLogin: true,
    }, 
      {
        title: "我的优惠券",
        img: "../img/my_coupon.png",
        link: "/pages/couponList/couponList",
        isNeedLogin: true,
      }, {
        title: "常见问题",
        img: "../img/question.png",
        link: "/pages/questionList/questionList",
        isNeedLogin:false
      },
      {
        title: "学员服务协议",
        img: "../img/service_deal.png",
        link: "/pages/protocol/protocol",
        isNeedLogin: false
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // userService.getUserInfo().then(() => {
    //   this.setData({
    //     userInfo: userService.getUser().userInfo
    //   })
    // }).catch(() => {
      
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // });
    
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
    // this.setData({
    //   userInfo: userService.getUser().userInfo
    // })
    userService.getUserInfo().then(() => {

      if (userService.getUser().userInfo.phone === "") {
        for (let i = 0; i < this.data.myItemList.length;i++){
          if (this.data.myItemList[i].isNeedLogin){
            this.data.myItemList[i].link = "/pages/login/login";
          }
        }
        this.setData({
          myItemList: this.data.myItemList,
          isShowLogin: true
        });
      } else {
        this.setData({
          isShowLogin: false
        });
        this.setData({
          userInfo: userService.getUser().userInfo
        });
      }
      
    }).catch(() => {
      for (let i = 0; i < this.data.myItemList.length; i++) {
        if (this.data.myItemList[i].isNeedLogin) {
          this.data.myItemList[i].link = "/pages/login/login";
        }
      }
      this.setData({
        myItemList: this.data.myItemList,
        isShowLogin: true
      });
    });
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
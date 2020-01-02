// pages/resetMyInfo/resetMyInfo.js
import { userService } from '../../store/service/UserService.js';
import { TimeManager } from '../../store/entity/TimeManager.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: ["学前班", "小学一年级", "小学二年级", "小学三年级", "小学四年级", "小学五年级", "小学六年级", "初中一年级", "初中二年级", "初中三年级", "高中一年级", "高中二年级", "高中三年级"],
    startDate:"",
    endDate:"",
    sex:["男","女"],
    userName:"",
    activeSex:"",
    activeGrade:"",
    birthDay:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let years = TimeManager.createDate();
    console.log(years);
    this.userInfo = Object.assign({}, userService.getUser().userInfo);
    
    let activeGrade = this.data.grade.findIndex((gradeItem,index)=>{
      return userService.getUser().userInfo.grade === gradeItem;
    })
    console.log(years[0] + "-01-01");
    console.log(years[years.length - 1] + "-12-31");
    this.setData({
      startDate: years[0]+"-01-01",
      endDate: years[years.length-1] + "-12-31",
      userName: userService.getUser().userInfo.userName,
      activeSex: (userService.getUser().userInfo.sex === 1 ? 0 : 1),
      activeGrade: activeGrade || 0 ,
      birthDay: userService.getUser().userInfo.birthY + "-" + userService.getUser().userInfo.birthM + "-" + userService.getUser().userInfo.birthD
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

  },
  bindChangeSex: function (e){
    let activeSex = e.detail.value;
    let sex = (activeSex == 0 ? 1 : 2);
    this.userInfo = Object.assign(this.userInfo, {
      sex: sex
    });
    this.setData({
      activeSex: activeSex
    });
    console.log(this.userInfo);
  },
  bindDateChange: function (e){
    let birthDay = e.detail.value;
    let date = new Date(birthDay);
    console.log(date);
    this.userInfo = Object.assign(this.userInfo,{
      birthY: date.getFullYear(),
      birthM: date.getMonth() + 1,
      birthD: date.getDate()
    })
    this.setData({
      birthDay: birthDay
    });
    console.log(this.userInfo);
  },
  bindChangeGrade: function (e){
    let activeGrade = e.detail.value
    this.userInfo = Object.assign(this.userInfo, {
      grade: this.data.grade[activeGrade]
    });
    this.setData({
      activeGrade: activeGrade
    });
    console.log(this.userInfo);
  },
  bindChangeUserName: function (e){
    let name = e.detail.value;
    this.userInfo = Object.assign({}, this.userInfo, {
      userName: name
    });
    this.setData({
      userName: name
    });
  },
  bindChangeReceiveName: function (e){
    let receiveName = e.detail.value;
  },
  bindChangeReceivePhoneNum: function (e){
    let receivePhoneNum = e.detail.value;
  },
  bindChangeReceiveAddress: function (e){
    let receiveAddress = e.detail.value;
  },
  onSaveUserInfo:function(){
    console.log(this.userInfo);
    userService.resetUserInfo(this.userInfo).then((data) => {
      wx.navigateBack({
        delta:1
      })
    }).catch((msg) => {
      console.log(msg);
    });
  }
})
// pages/selectCenter/selectCenter.js
import { courseService } from '../../store/service/CourseService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "../img/lunbo_img1.png",
      "../img/lunbo_img2.png",
      "../img/lunbo_img3.png"
    ],
    generalCourseType:[],
    courseList:[],
    isShowSwiper:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appInstance = getApp();
    appInstance.globalData.isFirstToIndex = false;

    courseService.getCourseType().then((list) => {
      this.setData({
        generalCourseType: list
      });
      courseService.pagination.to(1);
      this.updateCourseList();
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
    
    this.setData({
      generalCourseType: courseService.courseType
    });
    courseService.pagination.to(1);
    this.updateCourseList();
    
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
  bindSelectAll: function (e){
    let generalCourseTypeItem = e.currentTarget.dataset.generalCourseTypeItem;
    courseService.selectAllSpecifyCourseType(generalCourseTypeItem); 
    this.setData({
      generalCourseType: courseService.courseType,
      isShowSwiper: true,
    });
    this.onQueryCourseList();
  },
  onQueryCourseList:function(){
    courseService.pagination.to(1);
    this.updateCourseList(); 
  },
  updateCourseList:function(){
    courseService.getProductCourse().then((courseList) => {
      let courseModuleList = [];
      for (let i = 0; i < courseList.length;i++){
        let productModule = courseList[i].getModule.before((repairParam) => {
          repairParam = repairParam || {};
          repairParam.startTime = courseList[i].courseInfo.getStartTimeToShow("unix");
          repairParam.endTime = courseList[i].courseInfo.getEndTimeToShow("unix");
        }).call(courseList[i], {});
        courseModuleList.push(productModule);
      }
      console.log(courseModuleList);
      this.setData({
        courseList: courseModuleList
      });
    });
  },
  bindSelectSpecifyType: function (e) {   
    let specifyCourseTypeItem = e.currentTarget.dataset.speciryCourseItem;
    courseService.toggleSelectSpecifyType(specifyCourseTypeItem);
    console.log("===",courseService.courseType)
    this.setData({
      generalCourseType: courseService.courseType,
      isShowSwiper:false,
    });
    this.onQueryCourseList();
  },
 
  bindGetMore(){
    courseService.pagination.nextPage();
    this.updateCourseList();
  }
})
import {userService} from '../../store/service/UserService.js';
import {courseService} from '../../store/service/CourseService.js';
import {HB} from '../../store/util/HB.js';
import {TimeManager} from '../../store/entity/TimeManager.js';

Page({
  data: {
    ownedCourseList:[],
    isShowLogin:true
  },
  updateOwnedCourseList() {
    courseService.pagination.nextPage();
    let ownedCourseList = [];
    courseService.getAllOwnedCourseList().then((courseList) => {
      for (let i = 0; i < courseList.length;i++){
        console.log("========",courseList[i].courseInfo)
        ownedCourseList.push(courseList[i].getModule.before((repairParam) => {
          repairParam = repairParam || {};
          repairParam.startTime = courseList[i].courseInfo.getStartTimeToShow("unix");
          console.log()
          repairParam.endTime = courseList[i].courseInfo.getEndTimeToShow("unix");
        }).call(courseList[i], {})); 
      }
      console.log(ownedCourseList);
      this.setData({
        ownedCourseList: ownedCourseList,
      });

    });
  },
  onShow:function(){
    courseService.pagination.to(0);
    //  韩笑
    // userService.getUser().token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTcwNjkwNjk3MjI2Iiwia2V5X3VzZXJfaWQiOjEwMDA3LCJpYXQiOjE1NzA2OTA2OTcsImV4cCI6MTU3MTI5NTQ5N30.HEQ6a3qTpov9z3m7vNPphgZdYZT_9hZadhjG23CyFU8";
    //  王磊
   
    
    const appInstance = getApp();
    let self = this;
    wx.getStorage({
      key: 'token',
      success(res) {
        console.log(res.data);
        userService.getUser().token = res.data;
        // 博玮
        // userService.getUser().token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTc3NzY1MTIxMDgzIiwia2V5X3VzZXJfaWQiOjEwMTEyLCJpYXQiOjE1Nzc3NjUxMjEsImV4cCI6MTU3ODM2OTkyMX0.N3baS-q3_etT2rWL3SO0eHaytw5OflsZmLdNcmZiXUg";
        //  获取用户信息
        userService.getUserInfo().then(() => {
          console.log(userService.getUser());
          //  是否有手机号
          if (userService.getUser().userInfo.phone === "") {
            self.setData({
              isShowLogin: true
            });

          } else {
            self.setData({
              isShowLogin: false
            });
            self.updateOwnedCourseList();
          }
        }).catch(() => {
          
          self.setData({
            isShowLogin: true
          });
        });
      }
    });
    
    
  },
  onLoad: function () {
    
  },
  toSelectCenter:function(){
    wx.switchTab({
      url: '/pages/selectCenter/selectCenter',
    });
  }
})

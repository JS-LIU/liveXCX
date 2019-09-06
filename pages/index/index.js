import {userService} from '../../store/service/UserService.js';
import {courseService} from '../../store/service/CourseService.js';
import {HB} from '../../store/util/HB.js';
import {TimeManager} from '../../store/entity/TimeManager.js';

Page({
  data: {
    ownedCourseList:[]
  },
  updateOwnedCourseList() {
    courseService.pagination.nextPage();
    let ownedCourseList = [];
    courseService.getAllOwnedCourseList().then((courseList) => {
      for (let i = 0; i < courseList.length;i++){
        ownedCourseList.push(courseList[i].getModule.before((repairParam) => {
          repairParam = repairParam || {};
          repairParam.startTime = courseList[i].courseInfo.getStartTimeToShow("common");
          repairParam.endTime = courseList[i].courseInfo.getEndTimeToShow("common");
        }).call(courseList[i], {})); 
      }
      console.log(ownedCourseList);
      this.setData({
        ownedCourseList: ownedCourseList,
      });

    });
  },
  onLoad: function () {
    courseService.pagination.to(0);
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTY3NjgzMDM4NjQ2Iiwia2V5X3VzZXJfaWQiOjg4LCJpYXQiOjE1Njc2ODMwMzgsImV4cCI6MTU2ODI4NzgzOH0.NmmYP1B7C5nUIXNnLaIFmctqWd5WZ_qjYrLCu99Io6k";
    userService.updateUserInfo({ token: token });
    userService.getUserInfo().then(()=>{
      this.updateOwnedCourseList()
    });
  }
})

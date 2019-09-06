import {CourseType} from "./CourseType";

/**
 * Created by Liudq on 2019-08-04
 */
export class OrderProduct {
    constructor(productCourse){

        this.id = productCourse.id;
        this.goodNo = productCourse.goodNo;
        this.type = new CourseType(productCourse.type);
        this.level = productCourse.level;
        this.series = productCourse.level;
        this.name = productCourse.name;
        this.startTime = productCourse.startTime;
        this.endTime = productCourse.endTime;
        this.totalLessonNum = productCourse.totalLessonNum;
        this.salePrice = productCourse.salePrice;
        //    主讲人列表
        this.teacherInfoList = productCourse.teacherInfoList||[];
        this.assistant = productCourse.assistant||{};
        this.timeList = productCourse.timeList;
        this.weeks = productCourse.weeks;
        this.sellPrice = productCourse.sellPrice;
        this.majorTeacher = {};
        this.videoId = productCourse.videoId;
    }
    setAssistant(assistant){
        this.assistant = assistant;
    }
    setMajorTeacher(teacherInfoList){
        this.majorTeacher = teacherInfoList[0];
    }
}

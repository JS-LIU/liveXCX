/**
 * Created by Liudq on 2019-07-26
 */
import {CourseType} from "./CourseType";
import {CourseInfo} from "./CourseInfo";
import {Teacher} from "./Teacher";
import {CoursePlanItem} from "./CoursePlanItem";
import {TimeManager} from "./TimeManager";

export class ProductCourse {
    constructor(productInfo){
        // this.id = productInfo.id;
        this.goodNo = productInfo.goodNo;
        this.courseInfo = new CourseInfo(productInfo);
        this.salePrice = productInfo.salePrice;
        this.teacherInfoList = productInfo.teacherInfoList;
        // this.type = productInfo.type;
        // this.level = productInfo.level;
        // this.name = productInfo.name;
        // this.startTime = productInfo.startTime;
        // this.endTime = productInfo.endTime;
        // this.timeList = productInfo.timeList;
        //    主讲人列表
        // this.totalLessonNum = productInfo.totalLessonNum;
        // this.type = new CourseType(productInfo.type);
    }
    getMajorSpeaker(){
        return this.teacherInfoList[0];
    }
    /**
     * 补全详情
     */
    repairDetail(detail){
        this.detail = detail;
        this.commonQuestionUrl = detail.commonQuestionUrl;
        this.coursePrice = detail.coursePrice ;
        this.discountPrice = detail.discountPrice ;
        this.featureList = detail.featureList ;
        this.goodDetailList = detail.goodDetailList ;
        this.originPrice = detail.originPrice;
        this.outLineList =  this.createOutlineListByJson(detail.outLineList);
        this.sellEndTime = detail.sellEndTime;
        this.qrCodeUrl = detail.qrCodeUrl;
        this.salePrice = detail.salePrice;
        this.suggestGoods = detail.suggestGoods;
        this.videoId = detail.videoId;
    }
    createOutlineListByJson(outlineList){
        let list = [];
        for(let i = 0;i < outlineList.length;i++){
            list.push(new CoursePlanItem({
                name: outlineList[i].sessionName,
                startTime: outlineList[i].date,
                teacherInfo:{teacherName:outlineList[i].name}
            }))
        }
        return list;
    }
    setTeacherInfo(){
        this.courseInfo.teacherInfo = new Teacher(this.getMajorSpeaker());
        this.courseInfo.assistantInfo = new Teacher();
    }
    getSellEndTimeToShow(type){
        return TimeManager.convertStampToYMD(this.sellEndTime,type);
    }
    getModule(repairParam){
        this.setTeacherInfo();
        let module = Object.assign({},this.courseInfo.getModule(),{
            salePrice: this.salePrice,
            goodNo:this.goodNo,
        },repairParam);
        if(this.detail){
            module = Object.assign(module,{
                commonQuestionUrl:this.commonQuestionUrl,
                coursePrice:this.coursePrice,
                discountPrice:this.discountPrice,
                featureList:this.featureList,
                goodDetailList:this.goodDetailList,
                originPrice:this.originPrice,
                outLineList:this.outLineList,
                qrCodeUrl:this.qrCodeUrl,
                salePrice:this.salePrice,
                suggestGoods:this.suggestGoods,
                videoId:this.videoId,
            });
        }
        return module;
    }
}
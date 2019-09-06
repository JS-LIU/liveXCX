/**
 * Created by Liudq on 2019-08-18
 */
import {baseUrl, commonAjax} from "../config/config";
import {courseService} from "../service/CourseService";

export class Homework {
    constructor(homeWorkInfo){
        this.userHomeworkStatus = homeWorkInfo.userHomeworkStatus;
        this.homeworkName = homeWorkInfo.homeworkName;
        this.homeworkUrl = homeWorkInfo.homeworkUrl;
        this.homeworkSavePath = homeWorkInfo.homeworkSavePath;
        let fileUrlAjax = commonAjax.resource('/file/w/v1.0/:action');
        this._getFileUrl = function(postInfo,user){
            return fileUrlAjax.save({action:'getFileUrl'},postInfo);
        };
    }
    statusManager(coursePlanItem,user){
        // NOT_SUBMIT(0,"未提交"),
        // HAS_SUBMIT(1,"已提交"),
        // HAS_AUDIT(2,"已批改"),
        // CANNOT_DOWNLOAD(3,"不可下载"),
        // CAN_DOWNLOAD(4,"可下载")


        return {
            "0":{
                name:"未提交作业",
                background:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                downLoad:()=>{
                    console.log("尚未上传作业")
                }
            },
            "1":{
                name:"作业已提交",
                background:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    downloadPage.close();
                    return new Promise((resolve, reject)=>{
                        reject()
                    });
                }
            },
            "2":{
                name:"作业已批改",
                background:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    // let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    // downloadPage.close()
                    return new Promise((resolve, reject)=>{
                        return courseService.queryUserHomework(coursePlanItem)
                    });
                }
            },
            "3":{
                name:"不可下载",
                background:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_cant.png",
                downLoad:()=>{
                    return new Promise((resolve, reject)=>{
                        reject()
                    });
                }
            },
            "4":{
                name:"下载作业",
                background:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                iconBackground:baseUrl.getBaseUrl() + "/src/img/home_work_can.png",
                downLoad:()=>{
                    // let downloadPage = window.open(this.baseUrl+this.homeworkUrl);
                    // downloadPage.close();
                    return this._getFileUrl({
                        filename:this.homeworkUrl
                    },user)
                }
            }
        }
    }
    getStatusInfo(coursePlanItem,user){
        return this.statusManager(coursePlanItem,user)[this.userHomeworkStatus];
    }
}

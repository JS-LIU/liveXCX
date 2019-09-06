/**
 * Created by Liudq on 2019-08-17
 */
import {baseUrl, commonAjax} from "../config/config";

export class Courseware {
    constructor(courseWareStatus,courseWareUrl){
        this.courseWareStatus = courseWareStatus;
        this.courseWareUrl = courseWareUrl;
        let fileUrlAjax = commonAjax.resource('/file/w/v1.0/:action');
        this._getFileUrl = function(postInfo,user){
            return fileUrlAjax.save({action:'getFileUrl'},postInfo);
        };
    }
    statusManager(){
        return {
            "0":{
                name:"不可查看",
                color:"#c7c7c7",
                url:baseUrl.getBaseUrl() + "/src/img/pdf_icon_cant_read.png",
                showCourseWare:()=>{
                    return new Promise((resolve, reject)=>{
                        resolve("")
                    });
                }
            },
            "1":{
                name:"可查看",
                color:"#000000",
                url:baseUrl.getBaseUrl() + "/src/img/pdf_icon_can_read.png",
                showCourseWare:(token)=>{
                    return this._getFileUrl({
                        filename:this.courseWareUrl
                    },{name:"token",value:token}).then((data)=>{
                        return new Promise((resolve, reject)=>{
                            resolve(data.data);
                        })
                    })
                }
            }
        }
    }
    getCourseWareStatus(){
        return this.statusManager()[this.courseWareStatus];
    }
}
/**
 * Created by Liudq on 2019-07-23
 */
import {commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {userService} from "./UserService";
import {OwnedCourse} from "../entity/OwnedCourse";
import {ProductCourse} from "../entity/ProductCourse";
import {GeneralCourseType} from "../entity/GeneralCourseType";
import {SpecifyCourseType} from "../entity/SpecifyCourseType";
import {Pagination} from "../entity/Pagination";
import {OwnedCourseLearnStatus} from "../entity/OwnedCourseLearnStatus";
import {OwnedCourseLearnStatusList} from "../entity/OwnedCourseLearnStatusList";
import {OwnedCoursePlanItem} from "../entity/OwnedCoursePlanItem";
import {CourseType} from "../entity/CourseType";

class CourseService {
    constructor(){
        let ownedCourseAjax = commonAjax.resource('/course/w/v1.0/:action');
      let miniprogramOwnedCourseAjax = commonAjax.resource('/course/x/v1.0/:action');
        
        let courseAjax = commonAjax.resource('/good/w/v1.0/:action');
        let miniprogramCourseAjax = commonAjax.resource('/good/x/v1.0/:action');
        let preVideoAjax = commonAjax.resource('/user/w/v1.0/:action');
        let miniprogramVideoAjax = commonAjax.resource('/common/x/v1.0/:action');
        this._getOwnedCourseListByWeek = function(postInfo){
            return ownedCourseAjax.save({action:'pageCoursePlan'},postInfo,{name:"token",value:userService.getUser().token});
        };
      this._videoViewUrl = function(postInfo){
        return miniprogramVideoAjax.save({ action: 'videoViewUrl' }, postInfo, { name: "token", value: userService.getUser().token });
      }
      this._checkVersion = function (postInfo){
        return miniprogramVideoAjax.save({ action:"minProgramCheckVersion"},postInfo);
      }
        this._getAllOwnedCourseList = function(postInfo){
            return commonAjax.resource('/course/w/v1.1/:action').save({action:"pageMyCourse"},postInfo,{name:"token",value:userService.getUser().token})
        };
        this._getCourseType = function(postInfo){
            return courseAjax.save({action:'goodBaseSelectTips'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getProductCourseList = function(postInfo){
            return courseAjax.save({action:'pageGoodInfo'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getProductDetail = function(postInfo){
          return miniprogramCourseAjax.save({action:'goodDetail'},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getOwnedCourseDetail = function(postInfo){
          return commonAjax.resource('/course/x/v1.1/:action').save({action:"courseDetail"},postInfo,{name:"token",value:userService.getUser().token});
        };

        this._getPreSessionVideo = function(postInfo){
            return preVideoAjax.save({action:"preSessionVideo"},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._getCourseVideo = function(postInfo){
            return preVideoAjax.save({action:"videoView"},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._queryUserHomeWork = function(postInfo){
            return ownedCourseAjax.save({action:"queryUserHomework"},postInfo,{name:"token",value:userService.getUser().token});
        };
        this._queryUserStudyReport = function(postInfo){
            return commonAjax.resource('/user/x/v1.0/:action').save({action:"queryUserStudyReport"},postInfo,{name:"token",value:userService.getUser().token});
        }
        //  课程列表
        this.ownedCourseList = [];
        //  每节课列表
        this.ownedCoursePlanList = [];
        this.courseType = [];
        this.courseList = [];
        this.pagination = new Pagination(1,6);
        //  对象：学习状态
        this.ownedCourseLearnStatusList = this.createOwnedCourseLearnStatusList([
            {
                id:0,
                name:"未开课",
                active:false,
                order:1
            },
            {
                id:1,
                name:"正在学",
                active:false,
                order:2
            },
            {
                id:2,
                name:"已结束",
                active:false,
                order:3
            },
            {
                id:99,
                name:"全部",
                active:true,
                order:0
            }
        ]);
    }
    queryUserStudyReport(goodNo){
        return this._queryUserStudyReport({
            goodNo:goodNo
        })
    }
    checkVersion(){
      return this._checkVersion({});
    }
    getOwnedCourseLearnStatusList(){
        return this.ownedCourseLearnStatusList;
    }
    //  预习视频
    getPreSessionVideo(ownedCourseItem){
        return this._getPreSessionVideo({
            videoId:ownedCourseItem.preVideo.preVideoId,
            userCoursePlanId:ownedCourseItem.id
        }).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data);
                }else{
                    resolve(data);
                }
            });

        })
    }
    //  获取课程视频
    getVideoView(videoId){
        return this._getCourseVideo({
          videoId: videoId
        })
    }
  videoViewUrl(videoId){
    return this._videoViewUrl({
      videoId: videoId
    })
  }
    getOwnedCourseDetail(goodNo){
        let ownedCourse = this.findOwnedCourseByGoodNo(goodNo);
        return this._getOwnedCourseDetail({
            goodNo:goodNo
        }).then((data)=>{
            ownedCourse.setDetail(data.data);
            return new Promise((resolve, reject)=>{
                resolve(ownedCourse);
            })
        })
    }
    findOwnedCourseByGoodNo(goodNo){
        return this.ownedCourseList.find((ownedCourse,index)=>{
            return ownedCourse.courseInfo.goodNo === goodNo;
        })
    }

    /**
     * 从详情 获取coursePlanItem列表
     * @param ownedCourseId
     * @returns {[]|*}
     */
    getOwnedCoursePlanItemListByDetail(goodNo){
        let ownedCourse = this.findOwnedCourseByGoodNo(goodNo);
        return ownedCourse.coursePlanList;
    }
    /**
     * 创建学习状态
     * @param statusJson
     * @returns {OwnedCourseLearnStatusList}
     */
    createOwnedCourseLearnStatusList(statusJson){
        let ownedCourseLearnStatusList = [];
        for(let i = 0;i < statusJson.length;i++){
            ownedCourseLearnStatusList.push(new OwnedCourseLearnStatus(statusJson[i]));
        }
        return new OwnedCourseLearnStatusList(ownedCourseLearnStatusList);
    }

    /**
     * 选择学习状态
     * @param learnStatus
     * @returns {[]}
     */
    selectOwnedCourseLearnStatus(learnStatus){
        this.ownedCourseLearnStatusList.selectOwnedCourseLearnStatus(learnStatus);
        return this.ownedCourseLearnStatusList.getList();
    }
    /**
     * 获取已购的本周课程(某一周的课程，已购课程)
     * @param startTime
     * @param endTime
     */
    getOwnedCoursePlanItemListByWeek(startTime, endTime){
        return this._getOwnedCourseListByWeek({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            startTime:startTime,
            endTime:endTime
        }).then((data)=>{
            this.ownedCoursePlanList = this.createListByJson(data.data.list,this.ownedCoursePlanList,OwnedCoursePlanItem);
            return new Promise((resolve, reject)=>{
                resolve(this.ownedCoursePlanList);
            });
        })
    }

    /**
     * 获取全部购买课程(班期)
     * @returns [OwnedCourse]
     */
    getAllOwnedCourseList(){
        return this._getAllOwnedCourseList({
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size,
            learnStatus:this.getOwnedCourseLearnStatusList().getActive().id
        }).then((data)=>{
            this.ownedCourseList = this.createListByJson(data.data.list,this.ownedCourseList,OwnedCourse);
            return new Promise((resolve, reject)=>{
                resolve(this.ownedCourseList);
            });
        })
    }

    /**
     * 通过json创建实体列表
     * @param listJson
     * @param list
     * @param Course
     * @returns {Promise<list>}
     */
    createListByJson(listJson,list,Course){
        let newList = [];
        for(let i = 0;i < listJson.length;i++){
            newList.push(new Course(listJson[i]));
        }
        return this.refreshOrMoreList(list,newList);
    }
    /**
     * 获取所有课程的分类（商品类型列表）
     */
    getCourseType(){
        return this._getCourseType({}).then((data)=>{
            //  todo 容错处理 判断如果有data.data.summaryTips不为空的话
            return new Promise((resolve, reject)=>{
                resolve(this.createGeneralCourseType(data.data.summaryTips));
            })
        })
    }

    /**
     * 选择/取消选择 详细分类
     * @param specifyCourseType
     */
    toggleSelectSpecifyType(specifyCourseType) {
      let generalCourseType = this.findGeneralCourseTypeByTypeId(specifyCourseType.type);
      let speCourseType = this.findSpecifyCourseById(generalCourseType, specifyCourseType);
      generalCourseType.selectSpecifyCourseType(speCourseType);
    }
    findSpecifyCourseById(generalCourseType, specifyCourseType) {
      return generalCourseType.specifyCourseTypeList.find((specifyItem, index) => {
        return specifyItem.id === specifyCourseType.id;
      })
    }
    findGeneralCourseTypeByTypeId(typeId){
        return this.courseType.find((generalType,index)=>{
            return generalType.type === typeId;
        });
    }
    toggleSelectAllSpecifyCourseType(generalCourseType){
        generalCourseType.toggleSelectAllSpecifyCourseType();
    }
    selectAllSpecifyCourseType(generalCourseType) {
      let genCourseType = this.findGeneralCourseTypeByType(generalCourseType);
      genCourseType.selectAllSpecifyCourseType(true);
      genCourseType.selected = true;
    }
    findGeneralCourseTypeByType(generalCourseType) {
      return this.courseType.find((generalCourseTypeItem, index) => {
        return generalCourseTypeItem.type === generalCourseType.type;
      })
    }
    /**
     * 创建通用分类
     * @param summaryTips
     * @returns {[]|Array}
     */
    createGeneralCourseType(summaryTips) {
        this.courseType = [];
        for(let i = 0;i < summaryTips.length;i++){
            let generalCourseTypeInfo = {
                name:summaryTips[i].name,
                index:summaryTips[i].index,
                type:summaryTips[i].selectTips[0].type,
                specifyCourseTypeList:this.createSpecifyCourseList(summaryTips[i].selectTips),
            };
            this.courseType.push(new GeneralCourseType(generalCourseTypeInfo))
        }
        return this.courseType;
    }

    /**
     * 创建详细分类
     * @param list
     * @returns {[]}
     */
    createSpecifyCourseList(list){
        let specifyCourseTypeList = [];
        for(let i = 0;i < list.length;i++){
            let specifyCourseInfo = {
                id:list[i].id,
                name:list[i].name,
                type:list[i].type
            };
            specifyCourseTypeList.push(new SpecifyCourseType(specifyCourseInfo))
        }
        return specifyCourseTypeList;
    }

    /**
     * 获取商品课程列表
     * @returns {*}
     */
    getProductCourse(){
        let productCourseList = [];
        //  todo 可以把请求挪到 repository中
        return this._getProductCourseList({
            selectTips:this.getSelectedSpecifyCourseTypeByJson(),
            pageNum:this.pagination.pageNum,
            pageSize:this.pagination.size
        }).then((data)=>{
            for(let i = 0;i < data.data.list.length;i++){
                let productCourse = this.createProductCourse(data.data.list[i]);
                productCourseList.push(productCourse);
            }
            return new Promise((resolve, reject)=>{
                this.courseList = this.refreshOrMoreList(this.courseList,productCourseList);
                resolve(this.courseList);
            })
        })
    }
    createProductCourse(courseInfo){
        return new ProductCourse(courseInfo);
    }
    /**
     * 选择的所有标签（作为参数给后台来筛选课程）
     * @returns {[]}
     */
    getSelectedSpecifyCourseTypeByJson(){
        let json = [];
        for(let i = 0;i < this.courseType.length;i++){
            for(let j = 0;j < this.courseType[i].specifyCourseTypeList.length;j++){
                let specifyCourseType = this.courseType[i].specifyCourseTypeList[j];
                if(specifyCourseType.selected){
                    json.push({
                        type:specifyCourseType.type,
                        id:specifyCourseType.id,
                        name:specifyCourseType.name
                    })
                }
            }
        }
        return json;
    }

    /**
     * 加载更多或者刷新列表
     * private
     * @param baseList
     * @param addedList
     * @returns {[]|*}
     */
    refreshOrMoreList(baseList, addedList) {
        if(this.pagination.pageNum === 1){
            baseList = addedList
        }else{
            baseList = baseList.concat(addedList);
        }
        return baseList;
    }
    //  获取分页实体
    getPagination(){
        return this.pagination;
    }

    /**
     * 课程详情中的套餐也有商品
     * @param productCourseNo
     * @returns {*}
     */
    getOrCreateProductCourseDetail(productCourseNo){
        return this._getProductDetail({
            goodNo:productCourseNo
        }).then((data)=>{
            let productCourse = this.findProductCourseByCourseNo(productCourseNo);
            //  不推入this.courseList
            if(!productCourse){
                productCourse = this.createProductCourse(data.data);
            }
            productCourse = this.updateCourse(productCourse,data.data);
            return new Promise((resolve, reject)=>{
                resolve(productCourse);
            });
        })
    }
  
    findProductCourseByCourseNo(productCourseNo) {
        return this.courseList.find((course)=>{
            console.log(course);
            return course.goodNo === productCourseNo;
        });
    }

    updateCourse(productCourse, detail) {
        productCourse.repairDetail(detail);
        return productCourse;
    }
    //  从本周课程列表中找
    findOwnedCoursePlanItemById(coursePlanItemId){
        return this.ownedCoursePlanList.find((item,index)=>{
            return item.id === coursePlanItemId;
        })
    }

    downLoadHomework(ownedCoursePlanItem){
        return ownedCoursePlanItem.homework.getStatusInfo(ownedCoursePlanItem,userService.getUser()).downLoad();
    }
    //  从学科中找每节课
    findOwnedCouserPlanItemFromOwnedCouser(couserPlanItemId){
      
    }
    getLectureNotes(coursePlanItem) {
      return coursePlanItem.lectureNotes.getLectureNotesStatus().showLectureNotes(userService.getUser().token);
    }
    async getOwnedCoursePlanItemHasCourseWare(coursePlanList) {
        let list = [];
        for(let i = 0;i < coursePlanList.length;i++){
            await coursePlanList[i].coursePlanItem.courseware.getCourseWareStatus().showCourseWare(userService.getUser().token).then((data)=>{
                coursePlanList[i].coursePlanItem.courseware.urlPath = data.urlPath;
                list.push(coursePlanList[i])
            })
        }
        return list;
    }
    queryUserHomework(coursePlanItem){
        console.log(coursePlanItem);
        return this._queryUserHomeWork({
            userCoursePlanId:coursePlanItem.id
        })
    }
}

export const courseService = new CourseService();
/**
 * Created by Liudq on 2019-07-25
 */
/**
 * 通用课程分类
 */
export class GeneralCourseType {
    constructor(generalCourseTypeInfo){
        this.name = generalCourseTypeInfo.name;
        this.type = generalCourseTypeInfo.type;
        this.specifyCourseTypeList = generalCourseTypeInfo.specifyCourseTypeList;
        this.selected = true;
    }
    select(){
        this.selected = !this.selected;
    }
    //  自动toggle全选详细分类
    toggleSelectAllSpecifyCourseType(){
        if(this.isAllSelectedSpecifyCourseType()){
            this.selectAllSpecifyCourseType(false);
        }else{
            this.selectAllSpecifyCourseType(true);
        }
        this.selected = this.isAllSelectedSpecifyCourseType();
    }
    //  自定义全选、全不选选择详细分类
    selectAllSpecifyCourseType(selected){
        for(let i = 0;i < this.specifyCourseTypeList.length;i++){
            this.specifyCourseTypeList[i].selected = selected;
        }
    }
    //  是否全选
    isAllSelectedSpecifyCourseType(){
        for(let i = 0;i < this.specifyCourseTypeList.length;i++){
            if(!this.specifyCourseTypeList[i].selected){
                return false;
            }
        }
        return true;
    }
    selectSpecifyCourseType(specifyCourseType){
        this.selectAllSpecifyCourseType(false);
        specifyCourseType.select();
        this.selected = false;
        // this.selected = this.isAllSelectedSpecifyCourseType();
    }
}

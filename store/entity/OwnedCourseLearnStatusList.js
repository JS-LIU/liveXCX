/**
 * Created by Liudq on 2019-08-09
 */
export class OwnedCourseLearnStatusList {
    constructor(ownedCourseLearnStatusList){
        this.ownedCourseLearnStatusList = ownedCourseLearnStatusList;
    }
    selectOwnedCourseLearnStatus(ownedCourseLearnStatus){
        for(let i = 0; i < this.ownedCourseLearnStatusList.length; i++){
            this.ownedCourseLearnStatusList[i].unSelected();
        }
        ownedCourseLearnStatus.selected();
    }
    getActive(){
        for(let i = 0; i < this.ownedCourseLearnStatusList.length; i++){
            if(this.ownedCourseLearnStatusList[i].active){
                return this.ownedCourseLearnStatusList[i];
            }
        }
    }
    getList(){
        return this.ownedCourseLearnStatusList;
    }
}
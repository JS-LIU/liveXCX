/**
 * Created by Liudq on 2019-07-25
 */
/**
 * 详细分类
 */
export class SpecifyCourseType {
    constructor(specifyCourseInfo){
        this.name = specifyCourseInfo.name;
        this.type = specifyCourseInfo.type;
        this.id = specifyCourseInfo.id;
        this.selected = true;
    }
    select(){
        this.selected = !this.selected;
    }
}

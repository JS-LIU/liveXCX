/**
 * Created by Liudq on 2019-08-09
 */
export class OwnedCourseLearnStatus {
    constructor(status){
        this.id = status.id;
        this.name = status.name;
        this.active = status.active;
    }
    unSelected(){
        this.active = false;
    }
    selected(){
        this.active = true;
    }
}
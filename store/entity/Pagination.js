/**
 * Created by Liudq on 2019-07-28
 */
export class Pagination {
    constructor(startPage,size,total){
        this.pageNum = startPage;
        this.size = size;
        this.total = total;
        this.minmum = 1;
    }

    nextPage(){
        if(this.pageNum * this.size >= this.total){
            return this.pageNum;
        }
        return this.pageNum ++;
    }
    prePage(){
        if(this.pageNum > this.minmum){
            return this.pageNum--;
        }
    }
    to(pageNum){
        return this.pageNum = pageNum;
    }
    getTotalPage(){
        return Math.ceil(this.total / this.size);
    }
    setTotalSize(total){
        this.total = total;
    }
}
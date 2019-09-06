/**
 * Created by Liudq on 2019-08-07
 */
export class SearchOrderStatus {
    constructor(){
        this.searchStatus = [{
            name:"全部订单",
            status:"9999"
        }];
        this.searchOrderStatus = this.searchStatus[0];
    }
    cutSearchOrderStatus(){
    }
    getCurrentSearchOrderStatus(){
        return this.searchOrderStatus;
    }
}
/**
 * Created by Liudq on 2019-08-07
 */
export class SearchOrderStatus {
    constructor(){
        this.searchStatus = [{
            name:"全部",
            status:"9999",
            selected:true
          },{
            name:"未支付",
            status:"3005",
            selected: false
          }, {
            name: "已支付",
            status: "3002",
            selected: false
          }, {
            name: "已取消",
            status: "3003",
            selected: false
          }, {
            name: "已过期",
            status: "3004",
            selected: false
          }];
    }
    cutSearchOrderStatus(status){
      for (let i = 0; i < this.searchStatus.length;i++){
        this.searchStatus[i].selected = false;
        if (parseInt(this.searchStatus[i].status) === parseInt(status)){
          this.searchStatus[i].selected = true;
        }
      }
      return this.searchStatus;
    }
    getSearchOrderStatus(){
      return this.searchStatus;
    }
    getCurrentSearchOrderStatus(){
      return this.searchStatus.find((searchItem,index)=>{
        return searchItem.selected === true;
      });
    }
}
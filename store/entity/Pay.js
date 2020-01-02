/**
 * Created by Liudq on 2019-07-30
 */
export class Pay {
    constructor(payInfo){
        this.payInfo = payInfo;
        this.type = payInfo[0].type;
        this.payUrl = payInfo[0].payUrl;
    }
    callWxPay(payUrl){
      
    }
}


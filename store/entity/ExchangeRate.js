/**
 * Created by Liudq on 2019-07-30
 */
 export class ExchangeRate {
    constructor(){
        //  other rate XB --> rmb
        //  VIB --> rmb
    }
    static fenToYuan(fen){
        return fen / 100
    }
    static yuanToFen(yuan){
        return yuan * 100;
    }
}

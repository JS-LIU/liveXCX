import { hex_md5 } from "../util/md5.js";
export class WxPay{
  constructor(wxPayInfo){
    this.appId = wxPayInfo.appId;
    this.timeStamp = wxPayInfo.timeStamp;
    this.nonceStr = wxPayInfo.nonceStr;
    this.packageValue = wxPayInfo.packageValue;
    this.signType = wxPayInfo.signType;
    this.paySign = wxPayInfo.paySign;
  }
  pay(){
    wx.requestPayment({
                timeStamp: this.timeStamp,
                nonceStr: this.nonceStr,
                package: this.packageValue,
                signType: this.signType,
                paySign: this.paySign,
                success(res) {
                  console.log(res)
                  wx.redirectTo({
                    url: '/pages/paySuccess/paySuccess',
                  })
                },
                fail(res) { 
                  console.log(res)
                  wx.redirectTo({
                    url: '/pages/payFail/payFail',
                  })
                  
                }
    })
  }
}
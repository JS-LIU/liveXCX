/**
 * Created by Liudq on 2019-07-22
 */

import {HB} from "../util/HB";
export let commonAjax = HB.ajax;

commonAjax.config({
  // baseUrl: "https://huipay.com/huibeiwater"
  // baseUrl:"http://123.57.161.212:9931/huibeiwater"
  // baseUrl: "http://192.168.1.83:9931/huibeiwater"
  // baseUrl: "http://api-test.sscoding.com/api",
  // baseUrl:"https://api-test.vcode.vip/api",
  baseUrl: "https://api.vcode.vip/api"
});
class BaseUrl {
    constructor() {
        this.baseUrl = ""
    }
    setBaseUrl(baseUrl){
        this.baseUrl = baseUrl;
    }
    getBaseUrl(){
        return this.baseUrl
    }
}
export let baseUrl = new BaseUrl();
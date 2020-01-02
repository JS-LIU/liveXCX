/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {baseUrl, commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {HB} from "../util/HB";
import {hex_md5} from "../util/md5";
import { CouponStatus} from '../entity/CouponStatus.js';
import {Coupon} from '../entity/Coupon.js';
import {Pagination} from '../entity/Pagination.js';
/**
 * userService
 * {
 *     login:{
 *         login
 *     }
 *     userInfo:{
 *         phoneNum,
 *         headImg
 *     }
 * }
 */
class UserService {
    constructor(){
        let ajax = commonAjax.resource('/user/w/v1.0/:action');
        let miniProgramAjax = commonAjax.resource('/user/x/v1.0/:action');
        this._bindWechatProgram = function (postInfo) {
          return miniProgramAjax.save({ action: 'bindWechatProgram'}, postInfo);
        };
      this._queryUserAccountCoupon = function (postInfo){
        return miniProgramAjax.save({ action: 'queryUserAccountCoupon' }, postInfo, { name: "token", value: this.user.token });
      }
      this._accountSugInfo = function (postInfo){
        return miniProgramAjax.save({ action: 'accountSugInfo' }, postInfo, { name: "token", value: this.user.token })
      }
      this.couponStatusManager = new CouponStatus();
      this.pagination = new Pagination(1, 10);
      this.couponList = [];
      this._bindUser = function (postInfo){
        return miniProgramAjax.save({ action: 'bindUser' }, postInfo, { name: "token", value: this.user.token });
      };
      this._bindProgramVerifyCode = function (postInfo){
        return miniProgramAjax.save({ action: 'bindProgramVerifyCode'}, postInfo);
      };
      this._updateUserPwd = function (postInfo){
        return miniProgramAjax.save({ action: 'updateUserPwd' }, postInfo, { name: "token", value: this.user.token });
      }
        this._login = function(postInfo){
            return ajax.save({action:'login'},postInfo);
        };
        this._register = function(postInfo){
            return ajax.save({action:'registerUserInfo'},postInfo);
        };

        this._getPwdVCode = function(postInfo){
            return userAjax.save({action:'resetPwdVerifyCode'},postInfo);
        };
        this._getRegisterVerifyCode = function(postInfo){
            return userAjax.save({action:'registerVerifyCode'},postInfo);
        };
        this._getLoginVCode = function(postInfo){
            return userAjax.save({action:"loginVerifyCode"},postInfo)
        };
        this._loginByCode = function(postInfo){
            return userAjax.save({action:"loginWithVerifyCode"},postInfo)
        };
        this._getUserInfo = function(postInfo){
            return ajax.save({action:'userInfo'},postInfo,{name:"token",value:this.token});
        };
        this._resetPwd = function(postInfo){
            return ajax.save({action:'resetPwd'},postInfo,{name:"token",value:this.token});
        };
        
        this.login = new Login(ajax);
        this.user = new User(ajax);
        this._resetUserInfo = function(postInfo){
            return ajax.save({action:"updateUserInfo"},postInfo,{name:"token",value:this.user.token})
        };
    }
    
    resetUserInfo(userInfo){
        userInfo.birthday = TimeManager.convertYMDToStampByUnix(userInfo.birthY+"/"+userInfo.birthM+"/"+userInfo.birthD);
        return this._resetUserInfo(userInfo).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code === 0){
                    this.updateUserInfo({userInfo:userInfo});
                    resolve(data);
                }else{
                    reject(data.message)
                }
            })
        })
    }
    //  登录
    // signIn(phoneNum,password){
    //     return this._login({
    //         phone:phoneNum,
    //         pass:hex_md5(password)
    //     }).then((data)=>{
    //         return new Promise((resolve, reject)=>{
    //             if(data.code !== 0){
    //                 reject(data.message)
    //             }else{
    //                 //  登录后存储到localstorage
    //                 HB.save.setLocalStorageByLimitTime("token",data.data.token);
    //                 this.user.token = data.data.token;
    //                 resolve(data);
    //             }
    //         })
    //     });
    // }
    updateUserPwd(password){
      return this._updateUserPwd({
        pass: hex_md5(password)
      })
    }
    bindWechatProgram(bindInfo){
      return this._bindWechatProgram({
        code: bindInfo.code,
        encryptedData: bindInfo.encryptedData,
        signature: bindInfo.signature,
        iv: bindInfo.iv
      })
    }
  accountSugInfo() {
    return this._accountSugInfo({
      activityNo: "HD19091000001"
    });
  }
    bindProgramVerifyCode(phoneNum){
      return this._bindProgramVerifyCode({
        phone: phoneNum
      })
    }
    bindUser(phoneNum,vcode){
      return this._bindUser({ phone: phoneNum, verifyCode: vcode});
    }
    signIn(){
        return this.login.signIn(this.user.getPhoneNum(),this.user.getPassword()).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data.message)
                }else{
                    //  登录后存储到localstorage
                    HB.save.setLocalStorageByLimitTime("token",data.data.token);
                    resolve(data);
                }
            })
        });
    }
    signInByCode(code){
        return this.login.signInByCode(this.user.getPhoneNum(),code).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data.message)
                }else{
                    HB.save.setLocalStorageByLimitTime("token",data.data.token);
                    resolve(data);
                }
            })
        });
    }
    register(vCode){
        return this.login.register(this.user.getPhoneNum(),this.user.getPassword(),vCode).then((data)=>{
            return new Promise((resolve,reject)=>{
                if(data.code!==0){
                    reject(data.message)
                }else{
                    resolve(data);
                }
            })
        });
    }
    //  更新用户信息
    updateUserInfo(userInfo){
        Object.assign(this.user,userInfo);
    }
    getUser(){
        return this.user;
    }
    getUserInfo(){
        return this.user.getUserInfo();
    }
    getPwdVCode(){
        return this.login.getPwdVCode(this.user)
    }
    getRegisterVCode(phoneNum){
      return this.login.getRegisterVerifyCode(phoneNum).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code !== 0){
                    reject(data.message);
                }else{
                    resolve(data);
                }
            })
        })
    }
    resetPwd(resetInfo){
        return this.user.resetPwd(resetInfo);
    }
    autoUpdateUserInfo(){
        if(this.getUser().userInfo.userName === ""){
            Object.assign(this.user.userInfo,{userName:"小松许"})
        }
        if(this.getUser().userInfo.headImgUrl === ""){
            Object.assign(this.user.userInfo,{headImgUrl:baseUrl.getBaseUrl()+"../img/def_header_img.png"});
        }
        if(!this.getUser().userInfo.sex){
            Object.assign(this.user.userInfo,{sex:1});
        }
        if(!this.getUser().userInfo.grade || this.getUser().userInfo.grade !== ""){
            Object.assign(this.user.userInfo,{grade:"学前班"});
        }
    }
    getLoginVCode(){
        return this.login.getLoginVCode(this.user).then((data)=>{
            return new Promise((resolve, reject)=>{
                if(data.code!==0){
                    reject(data.message);
                }else{
                    resolve(data)
                }
            })
        });
    }
  queryUserAccountCoupon(){
    return this._queryUserAccountCoupon({
      couponStatus: this.couponStatusManager.getCurrentCouponStatus().status,
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.size,
    }).then((data)=>{
      console.log(data);
      let list = [];
      for(let i= 0 ;i < data.data.list.length;i++){
        list.push(new Coupon(data.data.list[i]))
      }
      if(this.pagination.pageNum === 1){
        this.couponList = list;
      }else{
        this.couponList = this.couponList.concat(list);
      }
      return new Promise((resolve,reject)=>{
        resolve(this.couponList)
      })
    });
  }


}
export const userService = new UserService();


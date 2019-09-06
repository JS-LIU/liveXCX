/**
 * Created by Liudq on 2019-07-22
 */
import {Login} from "../entity/Login";
import {User} from "../entity/User";
import {baseUrl, commonAjax} from "../config/config";
import {TimeManager} from "../entity/TimeManager";
import {HB} from "../util/HB";
import {hex_md5} from "../util/md5";

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
    getRegisterVCode(){
        return this.login.getRegisterVerifyCode(this.user).then((data)=>{
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
            Object.assign(this.user.userInfo,{headImgUrl:baseUrl.getBaseUrl()+"/src/img/def_header_img.png"});
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
}
export const userService = new UserService();


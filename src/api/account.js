// 账户操作
import request from '../utils/request'
import axios from 'axios'
import fa from "element-ui/src/locale/lang/fa";

//登录
export function login(data){
  return axios({
    url: 'https://weparallelines.top/api/account/login',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注册
export function register(data){
  return axios({
    url: 'https://weparallelines.top/api/account/register',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注销
export function logout(){
  return axios({
    url: 'https://weparallelines.top/api/account/logout',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
  })
}

//获取状态
export function get_status(){
  return axios({
    url: 'https://weparallelines.top/api/account/status',
    method: 'get',
  })
}

//修改昵称（要求登录）
export function change_nickname(){
  return axios({
    url: 'https://weparallelines.top/api/account/change_nickname',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//修改头像（要求登录）
export function change_avatar(){
  return axios({
    url: 'https://weparallelines.top/api/account/change_avatar',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//检测登录状态（返回True可以继续执行功能）
export function check_login(){
  get_status().then((response)=>{
    if (response.data.code === 20000){
      return !!response.data.data.login;
    }
    else {
      console.log('请求失败：'+response.data.msg);
      return false;
    }
  }).catch((error)=>{
    console.log(error);
    return false;
  })
}

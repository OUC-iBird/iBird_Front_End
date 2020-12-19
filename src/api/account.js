// 账户操作
import request from '../utils/request'
import axios from 'axios'
import {getAllCookie} from '../utils/cookie'

//登录
export function login(data){
  return axios({
    url: '/api/account/login',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注册
export function register(data){
  return axios({
    url: '/api/account/register',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//注销
export function logout(){
  return axios({
    url: '/api/account/logout',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
  })
}

//获取状态
export function get_status(){
  return axios({
    url: '/api/account/status',
    method: 'get',
  })
}

//修改昵称（要求登录）
export function change_nickname(){
  return axios({
    url: '/api/account/change_nickname',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//修改头像（要求登录）
export function change_avatar(){
  return axios({
    url: '/api/account/change_avatar',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

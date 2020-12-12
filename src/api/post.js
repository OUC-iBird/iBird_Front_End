import request from '../utils/request'
import axios from 'axios'

//发动态（要求登录）
export function give_post(data){
  return axios({
    url: 'https://weparallelines.top/api/gallery/give_post',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//获取全部动态（分页，每页最多 4 个动态）
export function get_all_post(num){
  return axios({
    url: 'https://weparallelines.top/api/gallery/get_all_post',
    method: 'get',
    params: {
      num
    },
  })
}

//获取热门动态（点赞数最多的 10 个动态）
export function get_hot_post(){
  return axios({
    url: 'https://weparallelines.top/api/gallery/get_hot_post',
    method: 'get',
  })
}

//获取我的动态（分页，每页最多 4 个动态）（要求登录）
export function get_my_post(num){
  return axios({
    url: 'https://weparallelines.top/api/gallery/get_my_post',
    method: 'get',
    params: {
      num
    },
  })
}

//点赞（要求登录）
export function like_post(data){
  return axios({
    url: 'https://weparallelines.top/api/gallery/like_post',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//获取地点（有位置信息的动态）
export function get_points(){
  return axios({
    url: 'https://weparallelines.top/api/gallery/get_points',
    method: 'get',
  })
}

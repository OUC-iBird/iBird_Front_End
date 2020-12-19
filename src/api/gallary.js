import request from '../utils/request'
import axios from 'axios'

//图片存相册（要求登录）
export function save_in_gallery(data){
  return axios({
    url: '/api/gallery/save_in_gallery',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

//获取相册（分页，要求登录）
export function get_my_gallery(num){
  return axios({
    url: '/api/gallery/get_my_gallery',
    method: 'get',
    params: {
      num
    },
  })
}

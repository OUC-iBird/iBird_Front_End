// 获取上传的图片的鸟的名称和可信度

import request from '../utils/request'
import axios from 'axios'
export function identify_result(data){
  return axios({
    url: 'https://weparallelines.top/api/prediction/predict',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

export function test(data){
  return axios({
    url: "https://weparallelines.top/api/test_post",
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

export function img_upload(data){
  return axios({
    url: "https://weparallelines.top/api/upload",
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}


import request from '../utils/request'
import axios from 'axios'

// 获取上传的图片的鸟的信息和可信度
export function identify_result(data){
  return axios({
    url: '/api/prediction/predict',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

export function test(data){
  return axios({
    url: "/api/test_post",
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data
  })
}

// 上传图片
export function img_upload(data){
  return axios({
    url: "/api/upload",
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

// 根据识别报告序列号获取识别报告
export function get_report(sequence){
  return axios({
    url: '/api/prediction/get_report',
    method: 'get',
    params: {
      sequence
    },
  })
}

// 获取指定编号的鸟的信息
export function get_bird_info(bird_id){
  return axios({
    url: '/api/prediction/get_bird_info',
    method: 'get',
    params: {
      bird_id
    },
  })
}


import request from '../utils/request'


export function upload_img(data){
    return request({
        url: '/login',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data
      })
}
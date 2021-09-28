import axios from 'axios'
import { Toast } from 'vant';
import store from '@/store'
import { baseUrl } from '@/utils/env'

// create an axios instance
const service = axios.create({
  baseURL: baseUrl
})

let stop = false

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const res = response.data;
      if (res.code == 1) {
        return res
      } else {
        Toast(res.errorMessage);
        return Promise.reject(new Error(res.errorMessage || 'Error'))
      }
    } else {
      Toast('网络异常');
      return Promise.reject(response)
    }
  },

  error => {
    Toast('网络异常');
    return Promise.reject(error)
  }
)

export default service

import axios from 'axios'
import {message} from 'antd'

import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 2000
})

// Add a request interceptor
instance.interceptors.request.use(config => {
  const {method, data} = config
    //if the request is post
    if (method.toLowerCase() === 'post'){
        //if data is json(object)
        if (data instanceof Object){
            //convert data to urlencoded
            config.data = (new URLSearchParams(data)).toString()
        }
    }
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
    // const p = Promise.reject(error);
    // p.catch(error=>{console.log(error)})
  });

// Add a response interceptor
instance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
  return response.data;
  }, error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    message.error(error.message, 1)
    //terminate the promise chain
    return new Promise(()=>{});
  });

export default instance
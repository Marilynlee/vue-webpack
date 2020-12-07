import axios from 'axios'
import Cookie from 'js-cookie'

class HttpRequest {
  constructor (baseUrl) {
    this.queue = {}
    this.baseUrl = baseUrl || ''
  }
  getInsideConfig () {
    const ctoken = Cookie.get('ctoken') || ''
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'x-csrf-token': ctoken
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
  }
  interceptors (instance, url, options) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url, options)
    return instance(options)
  }
}
export default HttpRequest

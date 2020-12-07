import HttpRequest from './httpRequest'
let baseUrl = ''
if (window.ENV === 'product') {
  baseUrl = '//vue.com'
} else if (window.ENV === 'pre') {
  baseUrl = '//pre.vue.com'
} else {
  baseUrl = '//daily.vue.com'
}
const axios = new HttpRequest(baseUrl)
export default axios

import axios from '@/libs/axios'

export const request = (api = '', method = 'GET', params = {}, needLogin = false) => {
  const reqParams = {
    type: method,
    api,
    data: {
      ...params
    }
  }
  return new Promise((resolve, reject) => {
    axios.request(reqParams).then(res => {
      if (res.err) {
        reject(res)
      }
      resolve(res.data)
    }).catch(err => {
      console.log(err)
    })
  })
}

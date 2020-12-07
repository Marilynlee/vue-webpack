import * as homeAPI from '@/api/home'
import { Toast } from 'vant'

// 获取店铺详情
export const getHomeData = async function ({ commit }, params = {}) {
  return new Promise((resolve, reject) => {
    homeAPI.getHomeData({ ...params }).then(data => {
      if (data.code === '200') {
        commit('setHomeData', data.data)
        resolve(data)
      }
      reject(data)
    }).catch((err) => {
      reject(err)
      Toast('获取失败！')
    })
  })
}

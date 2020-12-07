import { request } from '../request'

/**
 * 获取数据
 * @param id
 */
export const getHomeData = (params) => {
  return request('/api/data/getHomeData', 'GET', { ...params })
}

// 判断图片地址是否有效
export const validateImage = (pathImg) => {
  return new Promise((resolve, reject) => {
    let ImgObj = new Image()
    ImgObj.src = pathImg
    ImgObj.onload = (res) => {
      resolve(res)
    }
    ImgObj.onerror = (err) => {
      reject(err)
    }
  })
}

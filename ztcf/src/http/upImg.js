import axios from 'axios'
// 上传图片
export const upLoaderImg = (file, url, method) => {
    //file为 你读取成功的回调文件信息
    //new 一个FormData格式的参数
    console.log(file)
    let params = new FormData()
    params.append('file', file)
    let config = {
        headers: { //添加请求头
            'Content-Type': 'multipart/form-data'
        }
    }
    return new Promise((resolve, reject) => {
        axios[method](url, params, config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    })
}
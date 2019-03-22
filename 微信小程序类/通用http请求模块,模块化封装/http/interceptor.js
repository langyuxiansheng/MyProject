const BASE_URL = `http://192.168.0.220`;

/**
 * 提示
 */
const utils = {
    showToast: (title) => {
        wx.showToast({
            title,
            icon: 'none',
            duration: 2000
        })
    }
}

/**
 * 小程序Http请求控制器模块
 * Created by Simple on 2019年3月22日14:05:23
 * @description  响应格式如下 {  code: 200,   data: [],  msg: 'success' }
 */
module.exports = ({ url, method, dataType, params, data, headers }) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${BASE_URL}${url}`,
            method,
            header: {
                Authorization: wx.getStorageSync(`jwt`),
                ...headers
            },
            dataType: dataType || 'json',
            data: data || params,
            success: (res) => {
                let data = {};
                if (res && res.data) {
                    switch (Number(res.data.code)) {
                        case 200:
                            data = res.data;
                            break;
                        case 401: // 401 清除token信息并跳转到登录页面
                            utils.showToast(`身份过期，请重新登录!`);
                            break;
                        case 403: //无权限
                            utils.showToast(`此处无权限访问!`);
                            break;
                        default:
                            utils.showToast(response.data.msg);
                            break;
                    }
                }
                resolve(data);
            },
            fail: (err) => {
                utils.showToast(`网络可能出错了,请稍后重试!`);
                reject(err);
            }
        });
    });
}
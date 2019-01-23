/**
 * test 业务模块 1
 */
import { API_TEST } from './types';
export default {

    /**
     * get 方法
     * @param {*} data
     */
    getTest({ param }) {
        return {
            url: `${API_TEST}/api`,
            method: 'get',
            params: { param }
        };
    },

    /**
     * post 方法
     * @param {*} data
     */
    postTest(data) {
        return {
            url: `${API_TEST}/api`,
            method: 'post',
            data
        };
    },

    /**
     * put 请求
     * @param {*} data
     */
    putTest(data) {
        return {
            url: `${API_TEST}/api`,
            method: 'post', //method: 'put'
            data,
            headers: { method: 'PUT' } //这里看公司的需求,有的是在headers里面自定义的,如果没有这需求直接 改  method: 'put' 即可
        };
    },

    /**
     * delete 请求
     * @param {*} data 
     */
    deleteTest(data) {
        return {
            url: `${API_TEST}/api`,
            method: 'post', //method: 'delete'
            data,
            headers: { method: 'DELETE' } //这里看公司的需求,有的是在headers里面自定义的,如果没有这需求直接 改 method: 'delete' ,移除headers即可
        };
    },
};
/**
 * Created by Administrator on 2018/1/14 0014.
 * 接口模块
 */

import axios from '../method/http-server'
import ES6Promise from 'es6-promise'

ES6Promise.polyfill();

//axios.defaults.headers.common['language'] = common.getCurrentLanguage();

let base = 'http://192.168.0.220';
let baseCommon = base + '/common';
let baseParking = base + '/parking';

//定义请求方式
const methodPut = {
		headers: {
			method: 'PUT',
		}
	};

const methodDelete = {
		headers: {
			method: 'DELETE',
		}
	};


//postDemo
export const postDemo = params => {
	return axios.post(`${baseParking}/postDemo/login`, params).then((result) => {
		return result.data;
	});
};


//getDemo
export const getDemo = params => {
	return axios.get(`${baseParking}/getDemo`).then((result) => {
		return result.data;
	});
};

//methodPutDemo
export const methodPutDemo = (id,params) => {
	return axios.post(`${baseParking}/methodPutDemo/${id}`,params,methodPut).then((result) => {
		return result.data;
	});
};

//methodDeleteDemo
export const methodDeleteDemo = (Id) => {
	return axios.post(`${baseParking}/park/${Id}`,{},methodDelete).then((result) => {
		return result.data;
	});
};

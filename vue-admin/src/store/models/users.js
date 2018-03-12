/**
 * Created by Administrator on 2018/1/12 0012.
 * 用户模块
 */

import types from '../types.js'
import util from '../../common/method/util'
import {postDemo} from '../../common/api/api'
import { Loading } from 'element-ui';
const state = {
	token:util.getCookie('token'),	//用户token
	menuItem:window.localStorage.getItem('menuItem'),//菜单

};

const getters = {
	token(state){
		return state.token;
	},
	menuItem(state){
		return state.menuItem;
	},
};

const actions = {
	
	//用户登录
	userLogin({commit,state},self){
		let data = self.ruleForm2;
		let loading = Loading.service({
			lock: true,
			text: '拼命加载中...',
			background: 'rgba(255, 255, 255, .6)',
		});
		setTimeout(()=>{
			self.$message.success("登录成功");
			self.$router.push({ path:'/admin/adminList'});
			loading.close();
		},2000);

		/*userLogin(data).then((res) => {
			if(res && res.code == '200'){
				let data = res.data;
				util.setCookie('token',data.jwt);
				//存入菜单信息
				if(data.menu){
					window.localStorage.setItem('menuItem',JSON.stringify(data.menu));
				}
				commit(types.SET_USER_TOKEN,data);
				let redirect = self.$route.query.redirect;
				if(redirect != undefined){
					self.$router.push({ path:redirect});
				} else {
					//默认进入页面
					self.$router.push({ path:'/home/monitoringStation'});
				}
			}else{
				self.$message.error(res.msg);
			}
		});*/
	},
	userLogout({commit,state},self){
		self.$router.push({ path:'/login'});
	}
};

const mutations = {
	[types.SET_USER_TOKEN](state,data){
		state.token = data.jwt;
		state.menuItem = data.menu;
	},

	[types.CLEAR_USER_TOKEN](state,data){
		state.token = data;
		state.menuItem = data;
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
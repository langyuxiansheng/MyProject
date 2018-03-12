/**
 * Created by Administrator on 2018/1/20 0020.
 * 管理员管理
 */
import types from '../types.js'
import {getDemo,methodDeleteDemo} from '../../common/api/api'



const state = {
	adminDemoList:[],	//列表

};

const getters = {

	adminDemoList(state){
		return state.adminDemoList;
	},
};

const actions = {

	//获取列表
	getDemo({commit,state},self){

		let data = [{id:'001',val:'test'}];
		commit(types.GET_DEMO_LIST,data);
		/*getDemo().then((res) => {
			if(res && res.code == '200'){
				let data = res.data;
				commit(types.GET_DEMO_LIST,data);
			}else{
				self.$message.error(res.msg);
			}
		});*/
	},
};

const mutations = {
	[types.GET_DEMO_LIST](state,data){
		state.adminDemoList = data;
	},
};

export default {
	state,
	getters,
	actions,
	mutations
}
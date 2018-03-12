/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */

//导入公共状态模块
import types from './types.js'
const mutations = {
	/*[types.GET_LANGUAGE](state){
		state.language = common.common.toggleLanguage();
	}*/
	[types.IS_COLLAPSE_SIDEBAR](state,data){
		state.isCollapseSidebar = data;
	}

};

export default mutations;

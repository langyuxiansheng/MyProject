/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */

//导入公共状态模块

const getters = {
	getLanguage(state){
		return state.language;
	},
	isCollapseSidebar(state){
		return state.isCollapseSidebar;
	},
};

export default getters;

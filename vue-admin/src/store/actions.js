/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */
import types from './types.js'

const actions = {
	/*toggleLanguage({commit,state}){
		commit(types.GET_LANGUAGE);
	}*/
	toggleCollapse({commit,state},data){
		commit(types.IS_COLLAPSE_SIDEBAR,data);
	}
};

export default actions;

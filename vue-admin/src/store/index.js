/**
 * Created by Administrator on 2018/1/12 0012.
 * vuex 状态管理器
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import users from './models/users'
import admin from './models/admin'

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules:{
		users,
		admin,
	}
});

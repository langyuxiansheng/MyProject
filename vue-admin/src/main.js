// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

//导入Element ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入
import store from './store/index'
import App from './App.vue'
//导入reset.css和 全局公共样式表
import css from '../static/css/reset.css'
import common from '../static/css/common.less'
//导入字体图标库
import fontAwesome from '../static/font/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
	store,
  	template: '<App/>',
 	components: { App }
});

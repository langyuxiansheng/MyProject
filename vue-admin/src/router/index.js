/**
 * Created by Administrator on 2018/1/20 0020.
 * 路由控制器
 */

import Vue from 'vue'
import Router from 'vue-router'
import util from '../common/method/util'

//登录页面
import Login from '../views/users/Login.vue'
//主页容器
import Main from '../components/Main/index.vue'

/**管理员管理**/
//平台管理员列表
import AdminList from '../views/admin/AdminList.vue'
//平台管理员操作日志列表
import AdminLogList from '../views/admin/AdminLogList.vue'
//添加平台管理员
import AddAdmin from '../views/admin/AddAdmin.vue'
//修改管理员
import UpdateAdmin from '../views/Admin/UpdateAdmin.vue'

/**用户管理**/
//用户列表
import UsersList from '../views/users/UsersList.vue'
//用户停车记录列表
import UsersOrderList from '../views/users/UsersOrderList.vue'
//用户订单详情
import UsersOrderDetail from '../views/users/UsersOrderDetail.vue'



Vue.use(Router);

const router =  new Router({
		routes: [
			{
				path: '/login',
				name:'Login',
				component: Login
			},
			{
				path:'/admin',
				name:'admin',
				component:Main,
				meta:{
					title:'管理员管理',
					icon:'fa fa-users',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'平台管理员列表',
							isSecond:true,
							requireAuth:true,
						},
						path:'/admin/adminList',
						component:AdminList,
						name:'adminList',
						children: [
							{
								meta:{
									title:'添加管理员',
								},
								name:'addAdmin',
								path:'addAdmin',
								component:AddAdmin,
							},
							{
								meta:{
									title:'修改管理员',
								},
								name:'updateAdmin',
								path:'updateAdmin/:authId',
								component:UpdateAdmin,
							},
							{
								meta:{
									title:'操作记录',
								},
								name:'adminLogList',
								path:'adminLogList/:id',
								component:AdminLogList,
							},
						]
					},
				]
			},
			{
				path:'/users',
				name:'users',
				component:Main,
				meta:{
					title:'用户管理',
					icon:'fa fa-user',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'用户列表',
							isSecond:true,
							requireAuth:true,
						},
						path:'/users/usersList',
						name:'usersList',
						component:UsersList,
						children: [
							{
								meta:{
									title:'用户列表',
									isSecond:true,
									requireAuth:true,
								},
								path:'usersOrderList/:uid',
								name:'usersOrderList',
								component:UsersOrderList,
								children: [
									{
										meta:{
											title:'用户记录列表',
											isSecond:true,
											requireAuth:true,
										},
										path:'usersOrderDetail/:orderId',
										name:'usersOrderDetail',
										component:UsersOrderDetail,
									},
								]
							},
						]
					},
				]
			},
			{
				path: '*',
				redirect: '/login'
			},
		]
	});

//  判断是否需要登录权限 以及是否登录
/*
router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
		if (util.getCookie('token')) {// 判断是否登录
			next()
		} else {// 没登录则跳转到登录界面
			next({
				path: '/login',
				query: {redirect: to.fullPath}
			});
		}
	} else {
		next();
	}
});
*/


export default router;

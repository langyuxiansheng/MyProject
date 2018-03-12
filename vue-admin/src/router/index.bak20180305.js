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
import Admin from '../components/Admin/index.vue'
//平台管理员列表
import AdminList from '../views/admin/AdminList.vue'
//平台管理员操作日志列表
import AdminLogList from '../views/admin/AdminLogList.vue'
//添加平台管理员
import AddAdmin from '../views/admin/AddAdmin.vue'
//修改管理员
import UpdateAdmin from '../views/Admin/UpdateAdmin.vue'
//角色管理
import RoleManagement from '../views/Admin/RoleManagement.vue'
//权限设置
import RolePermission from '../views/Admin/RolePermission.vue'
//现场值守员管理
import Sopt from '../components/Sopt/index.vue'
//现场值守员列表
import SpotAdminList from '../views/sopt/SpotAdminList.vue'
//添加现场值守员
import AddSpotAdmin from '../views/sopt/AddSpotAdmin.vue'
//现场值守员管辖车场列表
import JurisdictionParkList from '../views/sopt/JurisdictionParkList.vue'
//现场值守员工作绩效
import SpotAdminJobPerformance from '../views/sopt/SpotAdminJobPerformance.vue'

/**车场管理**/
import Parking from '../components/Parking/index.vue'
//车场列表
import ParkingList from '../views/parking/ParkingList.vue'
//添加车场
import AddParking from '../views/parking/AddParking.vue'
//车场泊位记录
import ParkOrderList from '../views/parking/ParkOrderList.vue'
//停车场管理员值班情况列表
import findManagerListByPark from '../views/Parking/findManagerListByPark.vue'
//编辑车场
import UpdateParking from '../views/parking/UpdateParking.vue'
//停车场泊位管理  泊位列表
import PortList from '../views/parking/PortList.vue'
//停车场泊位管理  泊位记录列表
import PortOrderList from '../views/parking/PortOrderList.vue'
//停车场泊位管理  添加泊位
import AddPort from '../views/parking/AddPort.vue'
//停车场泊位管理  编辑泊位
import UpdatePort from '../views/parking/UpdatePort.vue'
//停车场泊位管理  泊位详情
import PortDetail from '../views/parking/PortDetail.vue'
//费率列表
import FeeLevelList from '../views/parking/FeeLevelList.vue'
//添加费率
import AddFeeLeve from '../views/parking/AddFeeLeve.vue'
//修改费率
import UpdateFeeLeve from '../views/parking/UpdateFeeLeve.vue'
//费率执行车场
import FeeLevel4AdminList from '../views/parking/FeeLevel4AdminList.vue'
//车场投诉建议列表
import ParkOpinionList from '../views/parking/ParkOpinionList.vue'

/**监控台**/
import Home from '../components/Home/index.vue'
//监控台主页
import MonitoringStation from '../views/home/MonitoringStation.vue'

/**设备管理**/
//车场设备列表
import ParkDeviceList from '../views/device/ParkDeviceList.vue'
//地磁车位锁列表
import LockDeviceList from '../views/device/LockDeviceList.vue'
//地磁车位锁运行记录列表
import DeviceRunLogList from '../views/device/DeviceRunLogList.vue'

/**订单管理**/
//订单列表
import OrderList from '../views/orders/OrderList.vue'
//订单详情
import OrderDetail from '../views/orders/OrderDetail.vue'


/**用户管理**/
//用户列表
import UsersList from '../views/users/UsersList.vue'
//订单详情
// import OrderDetail from '../views/orders/UsersOrderDetail.vue'

/**

 //停车场泊位管理  泊位记录  泊位出入场信息记录
 import PortRecord from '../components/Parking/PortRecord.vue'
 //停车场泊位管理  停车场泊位记录
 import ParkPortRecord from '../components/Parking/ParkPortRecord.vue'
 //停车场泊位管理  停车场费用统计
 import ParkStatistics from '../components/Parking/ParkStatistics.vue'
 //停车场泊位管理  停车场管理员列表
 import ParkManagerList from '../components/Parking/findManagerListByPark.vue'
 //停车场泊位管理  停车场收费管理/设置
 import ParkChargeManagement from '../components/Parking/ParkChargeManagement.vue'

 */

Vue.use(Router);

const router =  new Router({
		routes: [
			{
				path: '/login',
				name:'Login',
				component: Login
			},
			{
				path: '/home',
				name:'home',
				component: Main,
				meta:{
					title:'首页',
					icon:'fa fa-home',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'监控台',
							isSecond:true,
						},
						name:'monitoringStation',
						path:'/home/monitoringStation',
						component:MonitoringStation,
						children: [
							{
								meta:{
									title:'车场监控',
								},
								name:'station',
								path:'station',
								component:MonitoringStation,
							},
						]
					},
				]

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
					{
						meta:{
							title:'角色管理',
							isSecond:true,
							requireAuth:true,
						},
						path:'/admin/roleManagement',
						name:'roleManagement',
						component:RoleManagement,
						children: [
							{
								meta:{
									title:'权限设置',
								},
								name:'rolePermission',
								path:'rolePermission/:roleId',
								component:RolePermission,
							},
						]
					},
					{
						meta:{
							title:'现场值守员列表',
							isSecond:true,
							requireAuth:true,
						},
						path:'/admin/spotAdminList',
						name:'spotAdminList',
						component:SpotAdminList,
						children: [
							{
								meta:{
									title:'添加现场值守员',
								},
								name:'addSpotAdmin',
								path:'addSpotAdmin',
								component:AddSpotAdmin,
							},
							{
								meta:{
									title:'管辖车场列表',
								},
								name:'jurisdictionParkList',
								path:'jurisdictionParkList/:userId',
								component:JurisdictionParkList,
							},
							{
								meta:{
									title:'现场值守员工作绩效',
								},
								name:'spotAdminJobPerformance',
								path:'spotAdminJobPerformance/:userId',
								component:SpotAdminJobPerformance,
							},

						]
					},
				]
			},
			{
				path:'/parking',
				name:'parking',
				component:Main,
				meta:{
					title:'车场管理',
					icon:'fa fa-car',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'停车场列表',
							isSecond:true,
							requireAuth:true,
						},
						name:'parkingList',
						path:'/parking/parkingList',
						component:ParkingList,
						children: [
							{
								meta:{
									title:'添加车场',
								},
								name:'addParking',
								path:'addParking',
								component:AddParking,
							},
							{
								meta:{
									title:'编辑车场',
								},
								name:'updateParking',
								path:'updateParking/:parkId',
								component:UpdateParking,
							},
							{
								meta:{
									title:'泊位管理',
								},
								name:'portList',
								path:'portList/:parkId',
								component:PortList,
								children: [
									{
										meta:{
											title:'添加泊位',
										},
										name:'addPort',
										path:'addPort',
										component:AddPort,
									},
									{
										meta:{
											title:'编辑泊位',
										},
										name:'updatePort',
										path:'updatePort/:portId',
										component:UpdatePort,
									},
									{
										meta:{
											title:'泊位详情',
										},
										name:'portDetail',
										path:'portDetail/:portId',
										component:PortDetail,
									},
									{
										meta:{
											title:'泊位记录',
										},
										name:'portOrderList',
										path:'portOrderList/:portId',
										component:PortOrderList,
									}
								]
							},
							{
								meta:{
									title:'车场泊位记录',
								},
								name:'parkOrderList',
								path:'parkOrderList/:parkId',
								component:ParkOrderList,
							},
							{
								meta:{
									title:'值班情况',
								},
								name:'findManagerListByPark',
								path:'findManagerListByPark/:parkId',
								component:findManagerListByPark,
							}
						]
					},
					{
						meta:{
							title:'收费设置',
							isSecond:true,
							requireAuth:true,
						},
						path:'/parking/feeLevelList',
						name:'feeLevelList',
						component:FeeLevelList,
						children: [
							{
								meta:{
									title:'添加费率',
								},
								name:'addFeeLeve',
								path:'addFeeLeve',
								component:AddFeeLeve,
							},
							{
								meta:{
									title:'修改费率',
								},
								name:'updateFeeLeve',
								path:'updateFeeLeve/:feeId',
								component:UpdateFeeLeve,
							},
							{
								meta:{
									title:'费率执行车场',
								},
								name:'feeLevel4AdminList',
								path:'feeLevel4AdminList/:feeId/:name',
								component:FeeLevel4AdminList,
							},

						]
					},
					{
						meta:{
							title:'车场投诉',
							isSecond:true,
							requireAuth:true,
						},
						path:'/parking/parkOpinionList',
						name:'parkOpinionList',
						component:ParkOpinionList,
					},
				]
			},
			{
				path:'/device',
				name:'device',
				component:Main,
				meta:{
					title:'设备管理',
					icon:'fa fa-delicious',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'车位设备列表',
							isSecond:true,
							requireAuth:true,
						},
						path:'/device/parkDeviceList',
						name:'parkDeviceList',
						component:ParkDeviceList,
						children: [
							{
								meta:{
									title:'地磁车位锁列表',
								},
								name:'lockDeviceList',
								path:'lockDeviceList/:parkId',
								component:LockDeviceList,
								children: [
									{
										meta:{
											title:'运行记录',
										},
										name:'deviceRunLogList',
										path:'deviceRunLogList/:imei',
										component:DeviceRunLogList,
									},
								]
							},
						]
					},
				]
			},
			{
				path:'/orders',
				name:'orders',
				component:Main,
				meta:{
					title:'订单管理',
					icon:'fa fa-file-text',
					hidden:true,
					requireAuth:true
				},
				children: [
					{
						meta:{
							title:'订单列表',
							isSecond:true,
							requireAuth:true,
						},
						path:'/orders/orderList',
						name:'orderList',
						component:OrderList,
						children: [
							{
								meta:{
									title:'订单详情',
									isSecond:true,
									requireAuth:true,
								},
								path:'orderDetail/:orderId',
								name:'orderDetail',
								component:OrderDetail,
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
						/*children: [
							{
								meta:{
									title:'订单详情',
									isSecond:true,
									requireAuth:true,
								},
								path:'orderDetail/:orderId',
								name:'orderDetail',
								component:OrderDetail,
							},
						]*/
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


export default router;

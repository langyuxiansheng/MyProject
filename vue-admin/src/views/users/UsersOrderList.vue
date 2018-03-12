<template>
    <div class="rh-container">
        <div v-if="isPath">
            <!--表格工具栏-->
            <div class="authorities-breadcrumb">
                <el-row :gutter="0">
                    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="12">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="搜索项">
                                <el-select v-model="formInline.region" filterable  placeholder="编号">
                                    <el-option label="编号" value="shanghai" selected="selected"></el-option>
                                    <el-option label="姓名" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="tableSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <!--表格-->
            <div class="authorities-table">
                <el-row>
                    <el-col :span="24">
                        <el-table
                                :data="usersOrderList"
                                size="mini"
                                height="500"
                                border>
                            <el-table-column
                                    align="center"
                                    type="index"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="createdTime"
                                    :formatter="formatterCreatedTime"
                                    :show-overflow-tooltip="true"
                                    label="创建时间">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="orderId"
                                    :show-overflow-tooltip="true"
                                    label="订单号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="name"
                                    :show-overflow-tooltip="true"
                                    label="订单类型">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.orderType == 1">
                                        <span>线上订单</span>
                                    </div>
                                    <div v-else>
                                        <span>
                                            {{scope.row.isEmergency ? '应急订单':'辅助停车'}}
                                        </span>
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="parkName"
                                    :show-overflow-tooltip="true"
                                    label="车场">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="portNumber"
                                    :show-overflow-tooltip="true"
                                    label="泊位号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="licenseNumber"
                                    :show-overflow-tooltip="true"
                                    label="车牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="status"
                                    :formatter="formatterStatus"
                                    :show-overflow-tooltip="true"
                                    label="订单状态">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    :formatter="formatterCountTime"
                                    prop="countTime"
                                    :show-overflow-tooltip="true"
                                    label="计费时长">
                            </el-table-column>
                            <el-table-column
                                    align="right"
                                    sortable
                                    prop="finalFee"
                                    :show-overflow-tooltip="true"
                                    label="订单金额(￥)">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="payStatus"
                                    :formatter="formatterPayStatus"
                                    :show-overflow-tooltip="true"
                                    label="收费状态">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="orderDetail(scope.row.orderId)">
                                        订单详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../common/method/util'
	export default {
		name:'RoleManagement',
		data() {
			return{
				formInline: {
					user: '',
					region:''
				},
                uid:this.$route.params.uid,
				begin:util.getTodayTimeStamp(),
				end:(Date.parse(new Date()) / 1000),
				ordersCheck:{
					orders:[],//订单数组
				},
			}
		},

		created(){
			if(this.isPath){
				//获取车场列表
				this.getUsersOrderList(this);
			}
		},

		watch:{
			$route(){
				if(this.isPath){
				    this.getUsersOrderList(this);
                }
			}
		},

		methods: {

			//表格搜索
			tableSearch(){

			},

			/**
			 * 格式化时间
			 * @param row {Number} 时间戳
			 * */
			formatterCreatedTime(row){
				if(row.createdTime){
					return util.formatDateYearMonthDayAndHms(row.createdTime);
				}
			},

			/**
			 * 过滤订单状态
			 * @param row {Number} 订单状态码
			 * */
			formatterStatus(row){
				switch (row.status){
					case 1:
						return '预约待停';
					case 2:
						return '泊车待停';
					case 3:
						return '停车中';
					case 4:
						return '已完成(缴费)';
					case 5:
						return '已完成(欠费)';
					case 6:
						return '已取消';
					case 7:
						return '投诉';
					case 8:
						return '异常';
					default:
						return '其它';
				}
			},

			/**
			 * 过滤订单收费状态
			 * @param row {Number} 订单收费状态码
			 * */
			formatterPayStatus(row){
				switch (row.payStatus){
					case 0:
						return '待处理';
					case 1:
						return '未支付';
					case 2:
						return '已支付';
					case 3:
						return '未完全支付';
					default:
						return '其它';
				}
			},

			/**
			 * 格式化停车时长
			 * @param row {Number} 秒数
			 * */
			formatterCountTime(row){
				if(row.countTime){
					return util.secondToDate(row.countTime);
				}
				return '0秒';
			},

			/**
			 * 订单详情
			 * @param orderId {Number} 订单编号
			 * */
			orderDetail(orderId){
				this.$router.push({
					path:'/users/usersList/usersOrderList/'+this.uid+'/usersOrderDetail/'+orderId,
				});
			},

			...mapActions([
				'getUsersOrderList',
			])
		},

		computed:{
			...mapGetters(['usersOrderList']),
			isPath(){
				let path = '/users/usersList/usersOrderList/' + this.uid;
				let pathRoute = this.$route.path;
				return decodeURI(pathRoute) == path || decodeURI(pathRoute) == path + '/';
			}
		}
	}
</script>
<style lang="less" scoped>
    .popover-title{
        text-align: center;
        margin-bottom: 10px;
    }
</style>

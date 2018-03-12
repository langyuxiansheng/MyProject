<template>
    <div class="order-detail">
        <el-row>
            <el-col :span="6">
                <div class="order-detail-col">
                    <span class="title">订单编号：</span>
                    <span>{{orderDetail.orderId}}</span>
                    <span>
                        <el-tag size="mini">{{orderDetail.orderType == 1 ? '线上单':'线下单'}}</el-tag>
                    </span>
                </div>
                <div class="order-detail-col">
                    <span class="title">创建时间：</span>
                    <span>{{orderDetail.createdTime | formatterTime}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">创建人：</span>
                    <span>{{orderDetail.orderId}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">车场编号：</span>
                    <span>{{orderDetail.parkId}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">停车车牌：</span>
                    <span>{{orderDetail.licenseNumber}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">取证图片：</span>
                    <div class="order-detail-imgs" v-if="orderDetail.imgs && orderDetail.imgs.length > 0">
                        <img class="img" v-for="(img,key) in orderDetail.imgs" :src="img" alt="img" :key="key">
                    </div>
                </div>
                <div class="order-detail-col">
                    <span class="title">备注：</span>
                    <span class="remark">{{orderDetail.descForEmergency}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="order-detail-col">
                    <span class="title">预约时间：</span>
                    <span>{{orderDetail.appointmentStartTime | formatterTime}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">计费时长：</span>
                    <span>{{orderDetail.countTime | formatterCountTime}}</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">产生费用：</span>
                    <span>{{orderDetail.finalFee}} 元</span>
                </div>
                <div class="order-detail-col">
                    <span class="title">计费标准：</span>
                    <div class="fee-time-content" v-if="orderDetail.structure && orderDetail.structure.length > 0 ">
                        <div class="fee-time" v-for="(item,key) in orderDetail.structure" :key="key">
                            <div class="fee-row clearfix">
                                <span class="fee-title">时段：</span>
                                <span class="fee-content">开放时间 {{item.startTime}} - {{item.endTime}}</span>
                            </div>
                            <div class="fee-row clearfix" v-if="item.dateRange && item.dateRange.length > 0">
                                <span class="fee-title">执行：</span>
                                <span class="fee-content">
                                    <el-tag class="week-tag" size="mini" type="info" v-for="(week,i) in item.dateRange" :key="i">
                                        星期 {{week != 7 ? week : '日'}}
                                    </el-tag>
                                </span>
                            </div>
                            <div>
                                <span class="fee-title">费率：</span>
                                <span class="fee-content">
                                     起价 {{item.startFee}}元/{{item.startTimeDur}}小时
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-detail-col">
                    <span class="title">订单金额：</span>
                    <span>{{orderDetail.finalFee}} 元</span>
                    <el-tag size="mini">{{orderDetail.payStatus | formatterPayStatus}}</el-tag>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
import util from '../../common/method/util'
export default {
    name:'orderDetail',
    data() {
        return{
        	orderId:this.$route.params.orderId,
            uid:this.$route.params.uid,
        }
    },

    created(){
		if(this.isPath){
			this.getOrderDetail(this);
		}
    },

    watch:{
        $route(){
        	if(this.isPath){
				this.getOrderDetail(this);
			}
        }
    },

    methods: {

        ...mapActions([
        	'getOrderDetail',
        ])
    },

    computed:{
        ...mapGetters(['orderDetail']),
		isPath(){
			let path = '/users/usersList/usersOrderList/' + this.uid + '/usersOrderDetail/' + this.orderId;
			let pathRoute = this.$route.path;
			return decodeURI(pathRoute) == path || decodeURI(pathRoute) == path + '/';
		}
    },

    filters:{
		/**
		 * 过滤订单状态
		 * @param status {Number} 订单状态码
		 * */
		filterStatus(status){
			switch (status){
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
		 * 格式化时间
		 * @param time {Number} 时间戳
		 * */
		formatterTime(time){
			if(time){
				return util.formatDateYearMonthDayAndHms(time);
			}
			return '暂无';
		},

		/**
		 * 格式化停车时长
		 * @param msd {Number} 秒数
		 * */
		formatterCountTime(msd){
			if(msd){
				return util.secondToDate(msd);
			}
			return '0秒';
		},

		/**
		 * 过滤订单收费状态
		 * @param payStatus {Number} 订单收费状态码
		 * */
		formatterPayStatus(payStatus){
			switch (payStatus){
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
    }

}
</script>
<style lang="less" scoped>
    .order-detail{
        .order-detail-col{
            padding: 10px 5px 0 0;
            .order-detail-imgs{
                margin-top: 10px;
                .img{
                    display: inline-block;
                    margin-right:5px;
                    margin-bottom: 5px;
                    width: 150px;
                    height: auto;
                }
            }
            .title{
                font-weight: bold;
            }

            .remark{
                line-height: 24px;
            }
            .fee-time-content{
                .fee-time {
                    font-size: 14px;
                    margin-top: 10px;
                    .fee-row{
                        margin-bottom: 5px;
                        .week-tag{
                            margin: 2px 4px 4px 0;
                        }
                    }
                }
            }
        }
    }


</style>

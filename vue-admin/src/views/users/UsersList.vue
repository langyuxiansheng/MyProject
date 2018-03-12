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
                                :data="usersList"
                                height="450"
                                size="mini"
                                border>
                            <el-table-column
                                    align="center"
                                    type="index"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="uid"
                                    :show-overflow-tooltip="true"
                                    label="用户编号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="phone"
                                    :show-overflow-tooltip="true"
                                    label="账号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="username"
                                    :show-overflow-tooltip="true"
                                    label="昵称&姓名">
                                <template slot-scope="scope">
                                    <span>
                                        {{scope.row.username ? scope.row.username : '暂无'}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="iswx"
                                    :show-overflow-tooltip="true"
                                    label="绑定微信">
                                <template slot-scope="scope">
                                    <span>
                                        {{scope.row.iswx ? scope.row.iswx : '暂无'}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="amount"
                                    :show-overflow-tooltip="true"
                                    label="余额(元)">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    sortable
                                    prop="countTime"
                                    :show-overflow-tooltip="true"
                                    label="欠费(元)">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.finalFee != undefined && scope.row.totalFee != undefined">
                                        {{scope.row.finalFee - scope.row.totalFee}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.uid"
                                            type="primary"
                                            size="mini"
                                            @click="usersOrderList(scope.row.uid)">
                                        停车记录
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
			isShow:false,
            formInline: {
                user: '',
				region:''
            },
			begin:util.getTodayTimeStamp(),
			end:(Date.parse(new Date()) / 1000),
        }
    },

    created(){
        if(this.isPath){
			//获取车场列表
			this.getUsersList(this);
        }
    },

    watch:{
        $route(){
			if(this.isPath){
				this.getUsersList(this);
			}
        }
    },

    methods: {

    	//表格搜索
		tableSearch(){

        },

        /**
         * 用户停车记录列表
		 * @param uid {Number} 订单编号
         * */
		usersOrderList(uid){
			this.$router.push({
				path:'/users/usersList/usersOrderList/' + uid,
			});
        },
        ...mapActions([
        	'getUsersList',
        ])
    },

    computed:{
        ...mapGetters(['usersList']),
		isPath(){
			let path = '/users/usersList';
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

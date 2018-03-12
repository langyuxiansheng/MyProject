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
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="12" class="rh-text-right">
                        <router-link :to="{path:'/admin/adminList/addAdmin'}">
                            <el-button type="primary" icon="el-icon-circle-plus" plain @click="centerDialogVisible = true">添加管理员</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <!--表格-->
            <div class="authorities-table">
                <el-row>
                    <el-col :span="24">
                        <el-table
                                style="width: 100%"
                                :data="adminDemoList"
                                height="550"
                                size="mini"
                                border>
                            <el-table-column
                                    align="center"
                                    type="index"
                                    prop="parkNumber"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="id"
                                    :show-overflow-tooltip="true"
                                    label="账号">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="certification"
                                    :show-overflow-tooltip="true"
                                    label="登录密码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="phone"
                                    label="phone">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="val"
                                    sortable
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="cardNo"
                                    sortable
                                    label="身份证">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="roleName"
                                    sortable
                                    label="角色">
                                <template slot-scope="scope">
                                    <span  v-if="scope.row.isAdmin == 1">超级管理员</span>
                                    <span  v-else>{{scope.row.roleName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-button
                                            type="primary"
                                            size="mini"
                                            @click="adminLogList(scope.row.id)">
                                        操作记录
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-button
                                            v-if="scope.row.isAdmin != 1"
                                            type="primary"
                                            size="mini"
                                            @click="updateAdminAccount(scope.row.id)">
                                        修改
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.status == 1 && scope.row.isAdmin != 1"
                                               type="warning"
                                               size="mini"
                                               @click="updateStatus(scope.row.id,0)">
                                        禁用
                                    </el-button>
                                    <el-button v-if="scope.row.status == 0 && scope.row.isAdmin != 1"
                                               type="warning"
                                               size="mini"
                                               @click="updateStatus(scope.row.id,1)">
                                        启用
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center" >
                                <template slot-scope="scope">
                                    <el-button
                                            v-if="scope.row.isAdmin != 1"
                                            type="danger"
                                            size="mini"
                                            @click="deleteAdmin(scope.row.id)">
                                        注销
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
export default {
    name:'AdminManagement',
    data() {
        return{
            centerDialogVisible: false,
            formInline: {
                user: '',
                region: ''
            },
			authId:'',
        }
    },

    created(){
        if (this.isPath){
			//获取管理员列表
			this.getDemo(this);
        }
    },

    watch:{
		$route() {
			if (this.isPath){
				//获取管理员列表
				this.getDemo(this);
			}
		}
    },

    methods: {

    	//表格搜索
		tableSearch(){

        },

		/**
		 * 平台管理员操作记录
		 * @param id {Number} id
		 * */
		adminLogList(id){
			this.$router.push({
				path:'/admin/adminList/adminLogList/'+id,
			});
		},

        /**
         * 修改管理员账号
         * @param authId {Number} authId
         * */
        updateAdminAccount(authId){
        	this.authId = authId;
			this.$router.push({
				path:'/admin/adminList/updateAdmin/'+authId,
			});
        },

		/**
         * 修改管理员账号状态
		 * @param authId {Number} authId
		 * */
		updateStatus(authId,status){
			let title = status == 0 ? '此操作将会禁用管理员的账号,是否继续?' : '此操作将会启用管理员的账号,是否继续?';
			this.$confirm(title, '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
				customClass:'bg-warning'
			}).then(() => {
				this.authId = authId;
				this.updateStatusData = {
					status:status
				};
				this.updateAdminAccountStatus(this);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			});
		},

		/**
         * 删除管理员账号
		 * @param authId {Number} authId
		 * */
		deleteAdmin(authId){
			let title = '此操作将会注销管理员的账号,是否继续?';
			this.$confirm(title, '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
				customClass:'bg-warning'
			}).then(() => {
				this.authId = authId;
				this.deleteAdminData = {
					isDelete:0
				};
				this.adminAccountDelete(this);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			});
		},

        ...mapActions([
        	'getDemo',
        ])
    },

    computed:{
        ...mapGetters(['adminDemoList']),
		isPath(){
			let path = '/admin/adminList';
			let pathRoute = this.$route.path;
			return decodeURI(pathRoute) == path || decodeURI(pathRoute) == path + '/';
		}
    }
}
</script>
<style lang="less" scoped>
    @import "../../../static/css/common";
    @padding:20px 20px 0 20px;

    .rh-container{
        background: #fff;
        height: 100%;
        & .authorities-table{
            & .el-table{
                min-width: 1330px;
            }
            overflow-x: auto;
          }
    }

    .park-detail-dialog{
        & .dialog-title{
            font-size: @font-size-18;
            font-weight: bold;
        }

        & .detail-row{
            font-size: @font-size-16;
            position: relative;
            padding: 10px 0;
            overflow: hidden;
            zoom: 1;

            & .name{
                font-weight: bold;
                margin-right: 10px;
                float: left;
                display: block;
            }

            & .content{
                float: right;
                text-align: left;
                display: block;
                width: 74%;

                & .fee-time {
                    font-size: @font-size-14;
                    margin-bottom: 10px;

                    & .fee-row{

                        & .fee-title{
                            display: block;
                            float: left;
                        }

                        & .fee-content{
                            display: block;
                            float: right;
                            width: 210px;
                            text-align: left;
                        }

                        & .week-tag{
                            margin: 2px 4px 4px 0;
                        }
                    }
                }
            }
        }
    }
</style>

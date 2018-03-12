<template>
    <div class="">
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
                <el-col :span="12">
                    <el-table
                            style="width: 100%"
                            :data="adminLogList"
                            height="550"
                            size="mini"
                            border>
                        <el-table-column
                                align="center"
                                type="index"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="time"
                                sortable
                                :formatter="logTime"
                                :show-overflow-tooltip="true"
                                label="日期">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="textBody"
                                :show-overflow-tooltip="true"
                                label="操作">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
import util from '../../common/method/util'

export default {
    name:'AdminLogList',
    data() {
        return{
            centerDialogVisible: false,
            formInline: {
                user: '',
                region: ''
            },
			id:this.$route.params.id,
			beginTime:util.getTodayTimeStamp(),
			endTime:(Date.parse(new Date()) / 1000)
        }
    },

    created(){

    	//获取管理员列表
        this.getAdminLogList(this);
    },

    watch:{
		$route() {
			//获取管理员列表
			this.getAdminLogList(this);
		}
    },

    methods: {

    	//表格搜索
		tableSearch(){

        },

		/**
		 * 格式化时间
		 * @param val {Number} 时间戳
		 * */
		logTime(val){
			if(val){
				return util.formatDateYearMonthDayAndHms(val.time);
			}
			return val;
		},

        ...mapActions([
        	'getAdminLogList',
        ])
    },

    computed:{
        ...mapGetters(['adminLogList'])
    }
}
</script>
<style lang="less" scoped>
    @import "../../../static/css/common";


</style>

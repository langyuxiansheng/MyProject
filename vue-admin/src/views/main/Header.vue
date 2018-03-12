<template>
    <el-row>
        <el-col :span="20">
            <div class="header-bar">
                <el-tooltip v-show="isCollapseSidebar"  class="item" effect="dark" content="展开" placement="bottom">
                    <i  @click="collapse(false)" class="fa fa-align-justify align-vertical"></i>
                </el-tooltip>
                <el-tooltip v-show="!isCollapseSidebar" class="item" effect="dark" content="折叠" placement="bottom">
                    <i @click="collapse(true)" class="fa fa-align-justify"></i>
                </el-tooltip>
                <BreadcrumbBar></BreadcrumbBar>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="user-avatar-menu">
                <img class="user-avatar" :src="imgUrl" alt="user">
                <el-dropdown @command="handleCommand">
                    <div class="user-name-cont">
                        <h5>Admin</h5>
                        <span class="user-name">超级管理员</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>消息</el-dropdown-item>
                        <el-dropdown-item>帮助</el-dropdown-item>
                        <el-dropdown-item>关于</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script  type="text/ecmascript-6">
import BreadcrumbBar from './BreadcrumbBar.vue'
import {mapGetters,mapActions} from 'vuex'

export default {
    name:'MyHeader',
    data() {
        return {
            imgUrl:"../../../static/img/default-avatar.png"
        };
    },

    watch:{

    },

    methods: {

        //下拉回调
        handleCommand(command) {
            switch (command){
                case 'logout': //退出系统
                    this.logout();break;
                default:
            }
        },

        //退出系统
        logout(){
			this.$confirm('您确定要退出系统吗?', '提示', {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
				customClass:'bg-warning'
			}).then(() => {
                this.userLogout(this);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			});
        },

        //侧边栏控制
		collapse(bool){
            this.toggleCollapse(bool);
        },

        ...mapActions(['userLogout','toggleCollapse'])
    },

	computed:{
		...mapGetters(['isCollapseSidebar']),
    },

    components:{
        BreadcrumbBar
    }
}
</script>
<style lang="less" scoped>
    @height:77px;
    .user-avatar-menu{
        display: flex;
        height: @height;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #e6e6e6;
        .user-avatar {
            width: 60px;
            height: 60px;
            margin-right: 20px;
            border-radius: 50px;
        }
        .user-name-cont{
            font-size: 16px;
            cursor: pointer;
            text-align: center;
            h5{
                margin-bottom: 8px;
            }
        }
    }

    .header-bar{
        display: flex;
        align-items: center;
        height: @height;
        .fa-align-justify{
            font-size: 24px;
            transition: all .5s;
            cursor: pointer;
            margin-right: 20px;
        }
        .align-vertical{
            transform: rotateZ(90deg);
        }
    }
</style>

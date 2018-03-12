<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="el-fade-in">
            <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
                <!--<span v-if='item.redirect === "noredirect"|| index == levelList.length-1' class="no-redirect">{{item.meta.title}}</span>-->
                <span v-if="item.meta.hidden" class="no-redirect">{{item.meta.title}}</span>
                <router-link v-else :to="item.redirect || item.path,$route.params | routeLink">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>npm
<script>
    export default {
        name: 'BreadcrumbBar',
        data(){
            return {
	            levelList: null
            }
        },

        created(){
	        this.getBreadcrumb();
        },

	    watch:{
		    $route() {
			    this.getBreadcrumb();
		    },
	    },

        methods: {
	        getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name);
		        const first = matched[0];
				if (first && first.name !== 'home') {
			        matched = [{ path: '/home/monitoringStation/', meta: { title: '首页' }}].concat(matched)
		        }
				this.levelList = matched;
			},
        },

        filters:{
			routeLink(path,params){
				if(path && params){
					for(let par in params){
						if(par && path.indexOf(':'+par) != -1){
                            return path.replace(':'+par,params[par]);
						}
                    }
                }
				return path;
			}
        }
    }
</script>
<style type="less" scoped>
   .app-breadcrumb {
       display: inline-block;
       font-size: 16px;
       line-height: 50px;
       margin-left: 10px;
       .no-redirect {
           color: #3d9eff;
           cursor: text;
       }
   }
</style>

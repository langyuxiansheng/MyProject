<template>
    <div class="sidebar-menu">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                :collapse="isCollapseSidebar"
                background-color="#2f4255"
                text-color="#bfcbd8"
                active-text-color="#fff"
                router>
            <div v-if="!isCollapseSidebar" class="sidebar-menu-top">
                <h1 class="title">
                    {{getLanguage.estacionamento_plataforma}}
                    <p class="version">管理端：V1.0.0</p>
                </h1>
            </div>
            <!--循环第一级-->
            <el-submenu
                    v-for="(menu,index) in menus"
                    :index="menu.name || menu.path"
                    :key="index"
                    v-if="menu.meta != undefined && menu.meta != null">
                <template slot="title">
                    <i :class="menu.meta.icon"></i>
                    <span slot="title">{{menu.meta.title}}</span>
                </template>
                <!--循环第二级菜单-->
                <el-menu-item-group
                        v-if="menu.children && menu.children.length > 0"
                        v-for="(menuChildren,childKey) in menu.children"
                        :key="childKey">
                    <!--<span v-if="childKey == 0" slot="title">{{menu.meta.title}}</span>-->
                    <!--无子菜单-->
                    <el-menu-item-group v-if="menuChildren.meta && menuChildren.meta.isSecond">
                        <el-menu-item :index="menuChildren.path">{{menuChildren.meta.title}}</el-menu-item>
                    </el-menu-item-group>
                    <!--有子菜单-->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">

import {mapGetters,mapStates} from 'vuex'
export default {
    name:'Sidebar',
    data() {
        return {
            activeIndex: 0,
        };
    },

    created(){

    },

	methods: {

	},

    watch: {
		$route(val) {
			this.$forceUpdate();
        }
    },

    computed:{
        ...mapGetters([
        	'getLanguage',
            'isCollapseSidebar',
            'menuItem'
        ]),

        //菜单列表
        menus(){
			//菜单权限
            let menuItem = typeof this.menuItem == 'string' ? JSON.parse(this.menuItem) : this.menuItem;
            let routes = this.$router.options.routes;
            if(menuItem && menuItem.length > 0){
				let newMenu = [];
                    for(let item of routes){
                        for(let menu of menuItem){
                            if(item.name == menu.value){
                            	if(menu.children && menu.children.length > 0){
                            		let newChidMenu = [];
                                        for(let menuChild of menu.children){
                                            for(let itemChild of item.children){
                                                if(menuChild.value == itemChild.name){
                                                    newChidMenu.push(itemChild);
                                                }
                                            }
                                        }
									item.children = newChidMenu;
                                }
                                newMenu.push(item);
                            }
                        }
                    }
				return newMenu;
			}
			return routes;
        },
    }
}
</script>
<style lang="less" scoped>
    @import "../../../static/css/common";
    .sidebar-menu{
        height: 100%;
        & .sidebar-menu-top{
            background: #001628;
            padding:0 10px;
            min-width: 210px;
            & .title{
                  font-size: 22px;
                  text-align: center;
                  padding: 16px 0;
                  color: #fff;
              }
            & .version{
                  text-align: center;
                  margin-top: 13px;
                  font-size: 12px;
                  font-weight: normal;
              }
        }
    }
    a{
        display: block;
    }
    .el-menu-vertical-demo{
        height: 100%;
    }

</style>

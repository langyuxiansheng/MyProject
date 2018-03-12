<template>
    <div class="layout-container">
        <div class="layout-aside">
            <Sidebar></Sidebar>
        </div>
        <div class="layout-main">
            <div class="layout-header">
                <MyHeader></MyHeader>
            </div>
            <transition name="el-zoom-in-center">
                <div class="layout-content">
                    <router-view></router-view>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import MyHeader from '../../views/main/Header.vue'
    import Sidebar from '../../views/main/Sidebar.vue'
    export default {
        name: 'Main',
        data(){
            return {
                activeIndex: '1',
                activeIndex2: '1',
                isCollapse: true,
            }
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				return loading;
            }
        },

        computed: {
			key() {
				return this.$route.name !== undefined? this.$route.name + new Date(): this.$route + new Date()
			}
		},

        components: {
            MyHeader,
            Sidebar,
        }
    }
</script>
<style type="less" scoped>
    .layout-container{
        width: 100%;
        height: 100%;
        display: flex;
    }

    .layout-aside{

    }

    .layout-main{
        width: 100%;
        max-width: 100%;
    }

    .layout-header{
        border: 1px solid #e6e6e6;
        padding: 0 20px;
    }

    .layout-content{
        max-height: 100%;
        max-width: 100%;
        padding:20px;
        overflow: auto;
    }
</style>

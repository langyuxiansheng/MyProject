<template>
    <div></div>
</template>
<script>
import { getTest, postTest, putTest, deleteTest} from '@/http';
/**
 * 因为做了 通用的拦截器,需要数据的地方之间取数据,不需要判断 200, 只需要操作状态的取 code 
 * 后台返回数据如下 { code:200, data:[], msg:"success" }
 */
export default {
    data() {
        return {
            queryData: {
                param: '参数1'
            }
        };
    },
    created() {
        this.init();
    },
    methods: {

        async init() {
            const { data } = await getYunDong();
            if(data){
                //to do 
            }
           
        },

        async post(){
            const { code } = await postTest({ param: 1 });
            if(code === 200){
                //to do
            }
        },

        async put(){
            const { code } = await putTest({ param: 1 });
            if(code === 200){
                //to do
            }
        },

        async delete(){
            const { code } = await deleteTest({ param: 1 });
            if(code === 200){
                //to do
            }
        }
    }
};
</script>

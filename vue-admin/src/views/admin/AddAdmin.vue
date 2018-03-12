<template>
    <!--表格工具栏-->
    <div class="authorities-from">
        <el-row :gutter="0">
            <el-form :model="addAdminData" :rules="rules" ref="addAdminData" label-width="125px">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                    <el-form-item label="设置账号" prop="accountNo">
                        <el-input v-model="addAdminData.accountNo" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="设置密码" prop="certification">
                        <el-input type="text" v-model="addAdminData.certification" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkCertification">
                        <el-input type="text" v-model="addAdminData.checkCertification" auto-complete="off" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phone">
                        <el-input type="tel" v-model="addAdminData.phone" auto-complete="off" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="addAdminData.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="cardNo">
                        <el-input v-model="addAdminData.cardNo" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="职位描述" prop="positionDesc">
                        <el-input v-model="addAdminData.positionDesc" placeholder="请输入职位描述"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8" :offset="2">
                    <el-form-item label="选择角色" prop="rId">
                        <el-select class="select-block" v-model="addAdminData.rId" placeholder="请选择角色">
                            <el-option label="管理员" value="001"></el-option>
                            <el-option label="巡查员" value="002"></el-option>
                            <el-option label="暂无" value=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addAdminData')">立即添加</el-button>
                        <el-button @click="resetForm('addAdminData')">重新填写</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name:'AddAdmin',
        data() {
                //密码
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.addAdminData.checkCertification !== '') {
						this.$refs.addAdminData.validateField('checkCertification');
					}
					callback();
				}
			};
                //确认密码
			let validateCheckPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.addAdminData.certification) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

            return{
                images:[],
                addAdminData: {
					accountNo:'', //账号
					certification:'',//密码
                    checkCertification:'',//确认密码
					name:'', //姓名
					phone:'', //电话
					rId:'',    //角色
                    cardNo:'',  //身份证
					positionDesc:'',    //职位描述
                    active:'1'
                },
                rules: {
					accountNo: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
					certification:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 200 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
					checkCertification:[
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
						{ validator: validateCheckPass, trigger: 'blur' }
                    ],
					name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
					phone:[
						{ required: true, message: '请输入电话', trigger: 'blur' },
						{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
					],
					rId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                }
            }
        },

        created(){

        },

        mounted(){

        },

        methods: {

            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('提交成功');
                    } else {
                        this.$message.error('请填写完表单');
                        return false;
                    }
                });
            },

            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },


        },

        computed:{

        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    .rh-container{
        background: #fff;
        height: 100%;
        & .authorities-from{
              padding-right:20px;
            & .select-block{
                    display: block;
                }
        }
    }
</style>

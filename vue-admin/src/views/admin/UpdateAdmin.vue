<template>
    <!--表格工具栏-->
    <div class="authorities-from">
        <el-row :gutter="0">
                <el-form :model="updateAdminData" :rules="rules" ref="updateAdminData" label-width="125px">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                        <el-form-item label="登录账号" prop="accountNo">
                            <el-input
                                    v-model="updateAdminData.accountNo"
                                    placeholder="请输入账号"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="修改密码" prop="certification">
                            <el-input type="text" v-model="updateAdminData.certification" auto-complete="off" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkCertification">
                            <el-input type="text" v-model="updateAdminData.checkCertification" auto-complete="off" placeholder="请输入确认密码"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input type="tel" v-model="updateAdminData.phone" auto-complete="off" placeholder="请输入电话号码"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="updateAdminData.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="cardNo">
                            <el-input v-model="updateAdminData.cardNo" placeholder="请输入身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="职位描述" prop="positionDesc">
                            <el-input v-model="updateAdminData.positionDesc" placeholder="请输入职位描述"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8" :offset="2">
                        <el-form-item label="选择角色" prop="rId">
                            <el-select class="select-block" v-model="updateAdminData.rId" placeholder="请选择角色">
                                <el-option
                                        v-if="roleList && roleList.length > 0"
                                        v-for="(role,key) in roleList"
                                        :key="key"
                                        :label="role.name"
                                        :value="role.id"></el-option>
                                <el-option v-else="roleList && roleList == 0" label="暂无" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('updateAdminData')">立即修改</el-button>
                            <!--<el-button @click="resetForm('updateAdminData')">重新填写</el-button>-->
                        </el-form-item>
                    </el-col>
                </el-form>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name:'UpdateAdmin',
        data() {
                //密码
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.updateAdminData.checkCertification !== '') {
						this.$refs.updateAdminData.validateField('checkCertification');
					}
					callback();
				}
			};
                //确认密码
			let validateCheckPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.updateAdminData.certification) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

            return{
                images:[],
                updateAdminData: {
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
                },
				authId:this.$route.params.authId
            }
        },

        created(){
            //获取角色列表
            this.getRoleList(this);
            //查询管理员账号详情
            this.getAdminAccountDetail(this);
        },

        methods: {

            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateAdminAccount(this);
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

            ...mapActions([
            	'getRoleList',
                'updateAdminAccount',
                'getAdminAccountDetail'
            ])
        },

		watch:{
			adminAccountDetail(val){
				this.updateAdminData = val;
				this.updateAdminData.checkCertification = val.certification;
			},
        },

        computed:{
            ...mapGetters(['roleList','adminAccountDetail'])
        }
    }
</script>
<style lang="less" scoped>
    .rh-container{
        background: #fff;
        height: 100%;
        & .text-center{
              text-align: center;
          }
        & .text-right{
              text-align: right;
          }
        & .authorities-breadcrumb{
              padding: 20px;
          }
        & .authorities-from{
            & .select-block{
                    display: block;
                }
          }
    }
</style>

<template>
    <div class="login-bg">
        <div class="form-bg">
            <div class="user-login-ruleForm" @keyup.enter="submitForm('ruleForm2')">
                <h3 class="title">{{getLanguage.estacionamento_plataforma}}</h3>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="login-form" label-width="100px">
                    <h3 class="login-title">登录</h3>
                    <el-form-item class="user-label" label="账号" prop="accountNo">
                        <div class="user-input">
                            <el-input type="text" v-model="ruleForm2.accountNo" placeholder="请输入管理员账号" auto-complete="off"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item class="user-label" label="密码"  prop="certification">
                        <div class="user-input">
                            <el-input type="password" v-model="ruleForm2.certification" placeholder="请输入管理员密码"  auto-complete="off"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login-btn" @click="submitForm('ruleForm2')" :loading="loading">登录</el-button>
                        <!--<el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>-->
                        <!--<el-button @click="resetForm('ruleForm2')">重置密码</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
            <p class="copyright">四川省豪沃网络科技有限公司</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
export default {
    name:'userLogin',
    data() {

        //用户账户
        var validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入管理员账号'));
            } else {
                callback();
            }
        };

        //用户密码
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入管理员密码'));
            } else {
                callback();
            }
        };

        return {
            loading:false,
            ruleForm2: {
				accountNo: 'admiin',
				certification: 'admiin',
            },

            rules2: {
				accountNo: [
					{ validator: validateAccount,message: '请输入管理员账号', trigger: 'blur' },
                ],
				certification: [
					{validator: validatePass, message: '请输入管理员密码', trigger: 'blur' },
                ]
            }
        };
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.userLogin(this);
                } else {
                    this.$message.error('请输入用户名和密码');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ...mapActions(['userLogin'])
    },
    computed:{
        ...mapGetters(['getLanguage']),
    }
}
</script>
<style lang="less" scoped>

    @login-btn-color:#2aaed4;
    @login-text-color:#fff;

    .user-login-ruleForm{
        position: absolute;
        right:100px;
        top: 0;
        color: @login-text-color;
        .login-form{
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            width: 375px;
            padding: 40px 60px 40px 0;
            background:@login-text-color;
            box-shadow: 0 0 15px #cac6c6;
            .login-title{
                color: #151618;
                padding-left: 60px;
                margin-bottom: 50px;
                font-size: 24px;
            }
            .el-form-item{
                margin-bottom: 40px;
            }
        }
        & .title{
                /*width: 375px;*/
                text-align: center;
                margin-bottom: 20px;
                color: @login-text-color;
                font-size: 24px;
                font-family: sans-serif;
                letter-spacing: 5px;
            }
        & .login-btn{
                width: 100%;
                color: @login-text-color;
                background-color: @login-btn-color;
                border-color: @login-btn-color;
                opacity: .8;
                &:hover{
                    opacity: 1;
                 }
            }
    }
    .login-bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        background: url("../../../static/img/login-bg.jpg") no-repeat 0 0;
        background-size: 100% 100%;
        .form-bg{
            margin: 0 auto;
            margin-top: 200px;
            max-width: 1366px;
            position: relative;
            height:636px;          
        }
    }
    .copyright{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 50px;
        left: 0;
        color: #fff;
    }
</style>

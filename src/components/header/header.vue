<template>
    <div class="header-container">
        <div class="header">
            <div class="navbar">
                <div class="navbar-left-container">
                    <a href="/">
                        <img class="navbar-brand-logo" src="./logo.png"></a>
                </div>
                <div class="navbar-right-container">
                    <span class="item user" v-if="currentUserName">{{currentUserName}}</span>
                    <el-button type="text" @click="DialogVisible = true" class="item navbar-link login"
                               v-if="!currentUserName">Login
                    </el-button>

                    <a href="javascript:void(0)" class="item navbar-link logout" v-if="currentUserName"
                       @click="loginOut(currentUserName)">Logout</a>
                    <div class="item shopping-cart">
                        <el-badge :value="12">
                            <router-link to="/cart"><i class="fa fa-shopping-cart"></i></router-link>
                        </el-badge>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录 -->
        <el-dialog title="登录" :visible.sync="DialogVisible" width="30%" center class="dialog-login">

            <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
                <el-form-item>
                    <span v-if="loginFail" class="login-fail">
                        <i class="fa fa-exclamation-triangle"></i>{{form.errTips}}
                    </span>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPwd">
                    <el-input v-model="form.userPwd" type="password" @keyup.enter="submitForm('form')"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">登录</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--&lt;!&ndash;<el-button @click="DialogVisible = false">取 消</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" @click="DialogVisible = false">确 定</el-button>&ndash;&gt;-->
            <!--</span>-->

        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Header',
        data () {
            return {
                msg: 'Welcome to Your header',
                DialogVisible: false,
                loginFail: false,
                form: {
                    userPwd: '',
                    userName: '',
                    errTips: ''
                },
                currentUserName: '',
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
                    ],
                    userPwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted () {
            this.loginCheck();
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            login () {
                axios.post('/users/login', {
                    userName: this.form.userName,
                    userPwd: this.form.userPwd
                }).then((response) => {
                    let res = response.data;
                    if (res.status === '0') {
                        this.loginFail = false;
                        this.DialogVisible = false;
                        this.form.errTips = '';
                        this.currentUserName = res.result.userName;
                    } else {
                        this.loginFail = true;
                        this.form.errTips = res.msg;
                    }
                });
            },
            loginOut (userName) {
                axios.post('/users/loginOut', {userName: userName}).then((response) => {
                    let res = response.data;
                    if (res.status === '0') {
                        this.currentUserName = '';
                    } else {
                        alert('登出失败');
                    }
                });
            },
            loginCheck () {
                axios.get('/users/loginCheck').then((response) => {
                    let res = response.data;
                    if (res.status === '0') {
                        this.currentUserName = res.result;
                    }
                });
            }
        }
    };
</script>

<style lang="stylus">
    .header-container {
        background: #ffffff
    }

    .header {
        box-sizing: content-box
        margin: auto
        width: 1200px
        height: 55px
        padding: 5px 20px 10px 20px
        position: relative
        /*background: #ccc*/
        .navbar {
            .navbar-left-container {
                position: absolute
                top: -10px
                left: 0
            }
            .navbar-right-container {
                float: right
                display: flex
                .item {
                    flex: 0 1 auto
                    padding-right: 10px
                    line-height: 60px
                    font-family: moderat, sans-serif
                    font-size: 16px
                    text-decoration: none
                }
                .navbar-link:hover {
                    color: #d1434a
                }
                .login {
                    color: #606266
                    line-height: 0
                }
                .shopping-cart {
                    font-size: 2em
                    sup {
                        top: 15px
                    }
                }
            }
        }
    }

    .dialog-login {
        .login-fail {
            color: #f93737
        }
    }

    .bread {
        width: 100%
        height: 45px
        background: #f0f0f0
        .nav-bread {
            width: 1260px
            margin: auto
            line-height: 45px
            padding-left: 20px
            font-size: 16px
            /*background: #aaa*/
            .slot {
                padding: 0 5px 0 5px
            }
        }
    }
</style>

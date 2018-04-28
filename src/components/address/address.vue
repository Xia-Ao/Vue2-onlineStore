<template>
    <div class="address">
        <nav-bread>
            <span>Address</span>
        </nav-bread>
        <check-process>
            <span>Address</span>
        </check-process>
        <div class="content">
            <div class="top-bar">
                MY ADDRESS
            </div>
            <div class="addressList">
                <div class="address-item address-items"
                     v-bind:class="{'addressChecked': address.checked===true}"
                     v-for="(address,index) in addressList" :key="index" @click="addressSelect(address.addressId)">
                    <div class="nickName">{{address.nickName}}</div>
                    <div class="address-detail">{{address.userAddress}}</div>
                    <div class="postCode">{{address.userPost}}</div>
                    <div class="phone">{{address.userPhone}}</div>

                    <div class="defaultAddress" v-if="address.defaultAddress==='1'">默认地址</div>
                    <div class="operating">
                        <span class="edit" @click.stop="addressOp('addressForm','edit',address)"><i
                            class="el-icon-edit"></i></span>
                        <span class="delete" @click.stop="deleteAddress(address)"><i class="el-icon-delete"></i></span>
                    </div>
                </div>
                <div class="address-item addressAdd" @click="addressOp('addressForm','add')">
                    <div class="newAddress">
                        <span class="add"><i class="el-icon-plus"></i></span><br>
                        <span>Add New Address</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="next">
            <el-button class="next-btn" type="danger" @click="confirm">Next</el-button>
        </div>

        <!--添加地址-->
        <el-dialog v-bind:title="addressType ? '新增地址': '修改地址'" :visible.sync="addressDialogVisible" width="30%" center
                   class="dialog-login">

            <el-form ref="addressForm" :model="addressForm" status-icon :rules="addressRules" label-width="80px"
                     class="demo-ruleForm">
                <el-form-item label="地址ID" prop="addressId">
                    <el-input v-model="addressForm.addressId" v-bind:disabled="!addressType"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="nickName">
                    <el-input v-model="addressForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userPhone">
                    <el-input v-model="addressForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="userPost">
                    <el-input v-model="addressForm.userPost"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="userAddress">
                    <el-input type="textarea" v-model="addressForm.userAddress"></el-input>
                </el-form-item>
                <el-form-item label="默认地址" prop="defaultAddress">
                    <el-radio-group v-model="addressForm.defaultAddress">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitAddressForm('addressForm',addressType)">
                        {{addressType ? '添加' : '修改'}}
                    </el-button>
                    <el-button @click="resetForm('addressForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    import NavBread from '@/components/navBread/navBread';
    import CheckProcess from '@/components/checkProcess/checkProcess';
    import axios from 'axios';
    import {mapMutations} from 'vuex';


    export default {
        data () {
            return {
                addressList: [],
                addressDialogVisible: false,
                addressType: true,      // true为新增，false为修改
                addressForm: {
                    addressId: '',
                    nickName: '',
                    userPhone: '',
                    userPost: '',
                    userAddress: '',
                    defaultAddress: '0',
                    checked: false

                },
                defAddress: '',
                addressChecked: '',
                addressRules:
                    {
                        addressId: [
                            {required: true, message: '请输入地址ID', trigger: 'blur'},
                            {pattern: /^\d\d{3}$/, message: '地址ID为四位数字', trigger: 'blur'}
                        ],
                        nickName:
                            [
                                {required: true, message: '请输入用户名', trigger: 'blur'},
                                {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
                            ],
                        userPhone:
                            [
                                {required: true, message: '请输入手机号', trigger: 'blur'},
                                {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆11位手机号码', trigger: 'blur'}
                            ],
                        userPost:
                            [
                                {required: true, message: '请输入邮编', trigger: 'blur'},
                                {pattern: /^\d\d{5}$/, message: '邮编为六位数字', trigger: 'blur'}
                            ],
                        userAddress:
                            [
                                {required: true, message: '请输入地址', trigger: 'blur'},
                                {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
                            ],
                        defaultAddress:
                            [
                                {required: true, message: '请选择', trigger: 'blur'}
                            ]
                    }
            }
                ;
        },
        mounted () {
            if (!this.util.refresh()) {
                this.$router.push({path: '/'});
            }
            this.menuShow(0);
            this.menuHidden(1);
            this.menuHidden(2);
            this.menuHidden(3);
            this.init();
        },
        methods: {
            ...mapMutations(['menuShow', 'menuHidden']),
            init () {
                axios.get('/users/address').then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.addressList = res.result.address;
                        this.defAddress = res.result.defaultAddress;
                        this.addressChecked = res.result.defaultAddress;
                        this.addressList.forEach((item) => {
                            if (item.defaultAddress === '1') {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        });
                    }
                });
            },
            addressOp (formName, type, item) {
                this.addressDialogVisible = true;
                if (type === 'add') {
                    this.addressType = true;
                    this.addressForm = {
                        addressId: '',
                        nickName: '',
                        userPhone: '',
                        userPost: '',
                        userAddress: '',
                        defaultAddress: '0',
                        checked: false

                    };
                } else if (type === 'edit') {
                    this.addressType = false;
                    this.addressForm = item;
                }
                setTimeout(() => {
                    this.$refs[formName].clearValidate();
                }, 0);
            },
            submitAddressForm (formName, type) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (type) {
                            this.addAddress();
                        } else {
                            this.editAddress();
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            addAddress () {
                axios.post('/users/addAddress', {
                    address: this.addressForm
                }).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.addressDialogVisible = false;
                        this.init();
                    } else if (res.status === '2') {
                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    } else {
                        this.addressDialogVisible = false;
                        this.$message({
                            type: 'danger',
                            message: '添加失败！'
                        });
                    }
                });
            },
            editAddress () {
                axios.post('/users/editAddress', {
                    address: this.addressForm
                }).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.addressDialogVisible = false;
                        this.init();
                    } else {
                        this.addressDialogVisible = false;
                        alert('修改失败');
                    }
                });
            },
            deleteAddress (address) {
                axios.post('/users/addressDel', {addressId: address.addressId}).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.init();
                    }
                });
            },

            addressSelect (addressId) {
                this.addressList.forEach((item) => {
                    if (item.addressId === addressId) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                });
                axios.post('/users/addressSelect', {addressId: addressId}).then((res) => {

                });
            },
            confirm () {
                let address = {};
                this.addressList.forEach((item) => {
                    if (item.checked) {
                        address = item;
                    }
                });
                this.$router.push({
                    name: 'order',
                    params: {
                        address: address
                    }
                });
            }

        },
        components: {
            'nav-bread': NavBread,
            'check-process': CheckProcess
        }
    };
</script>

<style lang="stylus">
    .address {
        width: 1200px
        margin: 0 auto 20px
        .content {
            .top-bar {
                color: #484848
                letter-spacing: 2px
                font-size: 18px
                font-weight: 700
                margin-bottom 20px
            }
            .addressList {
                display: flex
                flex-wrap: wrap
                justify-content: flex-start
                .address-item {
                    flex: 0 1 280px
                    width: 280px
                    height: 190px
                    border: 2px solid #cccccc
                    background #ffffff
                    margin-right: 20px
                    margin-bottom: 20px
                }
                .address-items {
                    position: relative
                    padding-left: 20px
                    padding-right: 10px
                    font-size: 14px
                    div {
                        margin-top: 5px
                    }
                    .nickName {
                        font-size: 16px
                        font-weight: 600
                    }
                    .address-detail {
                        height: 60px
                        /*overflow: hidden*/
                        /*text-overflow: ellipsis;*/
                        white-space: pre-wrap;
                    }
                    .phone {
                        margin-top: 10px
                        font-size: 18px
                        color: #303030
                    }
                    .defaultAddress {
                        margin-top: 5px
                        color: #fe6962
                    }
                    .operating {
                        position: absolute
                        bottom: 15px
                        right: 15px
                        font-size: 24px
                        span {
                            margin-left: 20px
                        }
                        .edit:hover {
                            color: #ff6c15
                        }
                        .delete:hover {
                            color: #ff1810
                        }
                    }
                }
                .addressChecked {
                    border-color: #ff6c15
                }
                .address-item:hover {
                    cursor: pointer
                    border-color: #ff6c15
                }
                .addressAdd {
                    text-align: center
                    position: relative
                    .newAddress {
                        position: relative
                        top: 30%
                        .add {
                            font-size: 4em
                        }
                        span:last-child {
                            top: -20px
                        }
                    }

                }
            }
        }
        .next {
            float: right
            .next-btn {
                width: 200px
                border-radius: 0
                font-size: 18px
            }
        }
    }
</style>

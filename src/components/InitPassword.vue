<template>
    <el-main>
        <el-form :model="PasswordForm" ref="PasswordForm" :rules="rule" label-width="0" class="login-form">
            <h3>重置密码</h3>
            <el-form-item prop="oldPassword" label="原密码：" label-width="80px" >
              <el-col>
                <el-input type="password" v-model="PasswordForm.oldPassword" placeholder="原密码" >
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="newPassword" label="新密码：" label-width="80px">
              <el-col>
                <el-input type="password" v-model="PasswordForm.newPassword" placeholder="新密码" >
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="newPasswordRepeated" label="新密码：" label-width="80px">
              <el-col>
                <el-input type="password" v-model="PasswordForm.newPasswordRepeated" placeholder="重复输入新密码" >
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item >
              <el-col>
                <el-button type="danger" class="submitBtn" round @click.native.prevent="submit" v-loading.fullscreen.lock="fullscreenLoading"> 提交 </el-button>
              </el-col>
                <br> 
                <br> 
            </el-form-item>
        </el-form>
    </el-main>
</template>
<script>
import axios from 'axios';
import store from '@/vuex/store';
export default { 
    // .... 
    data () { 
        return { 
            fullscreenLoading: false,
            PasswordForm: { 
                oldPassword: '', 
                newPassword: '',
                newPasswordRepeated:''
            }, 
            // logining: false, 
            rule: { 
                oldPassword: [ { 
                    required: true, 
                    min: 6,
                    max: 20,
                    message: '原密码是必须的，长度为6-20位！', 
                    trigger: 'blur' 
                }],
                newPassword: [ { 
                    required: true, 
                    message: '新密码是必须的！', 
                    trigger: 'blur' 
                }],
                newPasswordRepeated: [ { 
                    required: true, 
                    message: '新密码是必须的！', 
                    trigger: 'blur' 
                }],
            } 
        } 
    }, 
    methods: { 
        // ... 
        submit () { 
            this.fullscreenLoading = true;
            this.$refs.PasswordForm.validate(valid => { 
                if (valid) { 
                    //获取值  
                    let oldPassword = this.PasswordForm.oldPassword;  
                    let newPassword = this.PasswordForm.newPassword;  
                    let newPasswordRepeated = this.PasswordForm.newPasswordRepeated;  
                    if(newPassword != newPasswordRepeated){  
                        this.$message({  
                            message : '两次输入的新密码不一致！',  
                            type : 'error'  
                        })  
                        return;  
                    } else if(oldPassword == newPassword){
                        this.$message({  
                            message : '新旧密码不可一样，请重新设置新密码！',  
                            type : 'error'  
                        })  
                        return;  
                    }else{
                        this.fullscreenLoading = true;
                        setTimeout(() => {
                            this.fullscreenLoading = false;
                            let flag = false;
                            this.$axios.post("/resetPassword.action",{
                                oldPassword:this.PasswordForm.oldPassword,
                                newPassword:this.PasswordForm.newPassword
                            })
                            .then(response=>{
                                if(response.data=='999999'){
                                    this.$message({
                                        type: 'warning',
                                        message: '请重新登录!'
                                    }); 
                                    this.$router.push('/');
                                    return;
                                }
                                let errorcode = response.data.head.errorCode;
                                if(errorcode =='100006'){
                                    this.$message({
                                        message: errorMessage,
                                        type: 'error'
                                    });
                                    this.$router.push('/');
                                    return;
                                }
                                if(errorcode != '000000'){
                                    let errorMessage = response.data.head.errorMessage;
                                    this.$message({
                                        message: errorMessage,
                                        type: 'error'
                                    });
                                    return;
                                }
                                this.$message({
                                    message: '恭喜你，重置密码成功',
                                    type: 'success'
                                });
                                flag=true;
                                this.$router.push('/container');
                                return;
                            }).catch(error=>{
                                console.log('error='+error);
                                this.$message({
                                    message: '重置密码失败',
                                    type: 'error'
                                });
                                flag=false;
                                this.$router.push('/');
                                return;
                            });
                            //超时后的处理
                            if(flag){
                                this.$router.push('/container');
                            }else{
                                this.$router.push('/');
                            }

                        }, 2000);
                        
                    }
                } else { 
                    console.log('submit err') 
                } 
            }) 
        }
    }
}
</script>
<style scoped>
    .login-form {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 35px #b4bccc;
        padding: 30px 30px 0 30px;
        border-radius: 25px;
        /* background:url('../assets/logo.png') no-repeat;
        background-size:100%;
        -moz-background-size:100% 100%; */
    }
    .submitBtn {
      width: 100%;
    }
    

    .to {
      color: #67c23a;
      cursor: pointer;
    }
</style>
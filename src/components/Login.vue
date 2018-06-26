<template>
    <el-main>
        <el-form :model="LoginForm" ref="LoginForm" :rules="rule" label-width="0" class="login-form">
            <h3>用户登录</h3>
            <el-form-item prop="username" label="用户名：" label-width="80px" >
              <el-col>
                <el-input type="text" v-model="LoginForm.username" placeholder="用户名" >
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="password" label="密码：" label-width="80px">
              <el-col>
                <el-input type="password" v-model="LoginForm.password" placeholder="密 码" >
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item >
              <el-col>
                <el-button type="danger" class="submitBtn" round @click.native.prevent="submit" v-loading.fullscreen.lock="fullscreenLoading"> 登录 </el-button>
                <el-button type="primary" class="resetBtn" round @click.native.prevent="reset"> 重置 </el-button> 
              </el-col>
                <hr> 
                <p>忘记密码，请联系超级管理员<span class="to" @click="toregin">超级</span></p>
              
            </el-form-item>
        </el-form>
    </el-main>
</template>
<script>
// import axios from 'axios';
import store from '@/vuex/store';
export default { 
  data () { 
      return { 
          fullscreenLoading: false,
          LoginForm: { 
              username: '', 
              password: '' 
          }, 
          // logining: false, 
          rule: { 
              username:[{
                  required:true,
                  min: 3,
                  max: 10,
                  message:'用户名是必须的，长度为3-10位',
                  trigger: 'blur'
              } ], 
              password: [ { 
                  required: true, 
                  message: '密码是必须的！', 
                  trigger: 'blur' 
              } ] 
          } 
      } 
  }, 
  methods: { 
    submit () { 
      this.fullscreenLoading = true;
      this.$refs.LoginForm.validate(valid => { 
        if (valid) { 
          //获取值  
          var name = this.LoginForm.username;  
          var password = this.LoginForm.password;  
          if(name == '' || password == ''){  
          this.$message({  
              message : '账号或密码为空！',  
              type : 'error'  
          })  
          return;  
        } else{
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            let flag = false;
            this.$axios.post("http://localhost:8080/login.action",{
              name:this.LoginForm.username,
              password:this.LoginForm.password})
              .then(response=>{
                let errorcode = response.data.head.errorCode;
                if(errorcode == '100004'){
                  this.$router.push('resetPassword');
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
                let role = response.data.body.type;
                // alert(role);
                if(role == '0'){
                  store.commit('setRole',true);
                }else{
                  store.commit('setRole',false);
                }
                store.commit('initAlias',response.data.body.alias);
                store.commit('initName',response.data.body.name);
                store.commit('initOptions',response.data.body.branch_rate);
                // store.commit('initWorker',response.data.body.worker);
                store.commit('initManagerType',response.data.body.manager_type);
                store.commit('initPageSize',response.data.body.pageSize);
                store.commit('initBranchMasterType',response.data.body.branch_master_type);
                store.commit('initBranchSlaverType',response.data.body.branch_slaver_type);
                store.commit('setIsLogin',true);
                this.$message({
                    message: '恭喜你，登录成功',
                    type: 'success'
                });
                flag=true;
                this.$router.push('/container');
                return;
              })
              .catch(error=>{
                console.log('error='+error);
                this.$message({
                    message: '登录失败',
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
          console.log('submit err');
        } 
      }) 
    }, 
    reset () { 
      this.$refs.LoginForm.resetFields();
    }, 
    toregin () { 
      this.$router.push('/regin') ;
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
      width: 70%;
    }
    

    .to {
      color: #67c23a;
      cursor: pointer;
    }
</style>
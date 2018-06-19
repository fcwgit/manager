<template>
  <div class="login-box">  
    <el-row>  
        <el-col :span="8">  
            <el-input id="name"  v-model="name" placeholder="请输入帐号">  
                <template slot="prepend">帐号</template>  
            </el-input>   
        </el-col>  
    </el-row>  
    <el-row>  
        <el-col :span="8">  
            <el-input id="password" v-model="password" type="password" placeholder="请输入密码">  
                <template slot="prepend">密码</template>  
            </el-input>  
        </el-col>  
    </el-row>  
    <el-row>  
        <el-col :span="8">  
            <el-button id="login" v-on:click="check" style="width:100%" type="primary" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>  
        </el-col>  
    </el-row>  
  </div> 
</template>

<script>
import axios from 'axios';
import store from '@/vuex/store';
export default {
  name: 'pos',
  
  data() {  
    return{
      name : '',  
      password : '',
      fullscreenLoading: false
    }
  },  
  methods : {  
    check : function(event){  
        //获取值  
        var name = this.name;  
        var password = this.password;  
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
            axios.post("http://localhost:8080/login.action",{
              name:this.name,
              password:this.password
            })
            .then(response=>{
              let errorcode = response.data.head.errorCode;
              if(errorcode != '000000'){
                let errorMessage = response.data.head.errorMessage;
                this.$message({
                message: errorMessage,
                type: 'error'
              });
                return;
              }
              store.commit('initOptions',response.data.body.branch_rate);
              store.commit('initWorker',response.data.body.worker);
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
              flag=true;
              this.$router.push('/container');
              return;
            }).catch(error=>{
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
    }  
  }  
}
</script>

<style scoped>
  .el-row {  
    margin-bottom: 20px;  
    /* &:last-child {  
      margin-bottom: 0;  
    }   */
  }  
  .login-box {  
      margin-top:20%;  
      margin-left:40%;
  } 
</style>

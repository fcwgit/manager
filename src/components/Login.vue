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
import axios from 'axios'
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
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            this.$router.push('/container');
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

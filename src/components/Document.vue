<template>
<div>
  <el-row style="text-align:center;">
    <el-input
      style="width:90%;margin-top:50px"
      class="input-class"
      type="textarea"
      :rows="12"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  </el-row>
  <el-row style="text-align:center">
    <el-button type="primary" icon="el-icon-edit" @click="updateMessage" v-loading.fullscreen.lock="fullscreenLoading" v-if=role></el-button>
  </el-row>
</div>
</template>

<style>

</style>

<script>
  export default {
    data() {
      return {
        fullscreenLoading:false,
        role:false,
        textarea: ''
      }
    },
    mounted:function(){
      this.fullscreenLoading = true;
      if(sessionStorage.getItem('role') == 'false'){
        this.role = false;
      }else{
        this.role = true;
      }
    
      setTimeout(() => {
      
      this.$axios.post("/queryMessage.action")
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
        if(errorcode != '000000'){
          let errorMessage = response.data.head.errorMessage;
          this.$message({
            message: errorMessage,
            type: 'error'
          });
          return;
        }
        this.textarea = response.data.body.message;
        this.fullscreenLoading = false;
        return;
      })
      .catch(error=>{
        this.$message({
            message: '查询信息失败',
            type: 'error'
        });
        this.fullscreenLoading = false;
        return;
      });
      
    }, 2000);
    },
    methods:{
      updateMessage(){
        this.fullscreenLoading = true;
        setTimeout(() => {
        
          this.$axios.post("/updateMessage.action",{
            contents:this.textarea
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
            if(errorcode != '000000'){
              let errorMessage = response.data.head.errorMessage;
              this.$message({
                message: errorMessage,
                type: 'error'
              });
              return;
            }
            this.fullscreenLoading = false;
            return;
          })
          .catch(error=>{
            this.$message({
                message: '修改信息失败',
                type: 'error'
            });
            this.fullscreenLoading = false;
            return;
          });
          
          }, 2000);
      }
    }
  };
</script>


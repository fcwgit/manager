<template>
  <el-row>
    <el-col :span="23">
        <div class="title">修改机构信息</div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="id">
              <el-col :span="24">
                <el-input v-model="ruleForm.id" :disabled=true></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="添加日期">
              <el-col :span="24">
                <el-input v-model="ruleForm.time" :disabled=true></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="机构名称" prop="label">
                <el-input v-model="ruleForm.label"></el-input>
            </el-form-item>
            <el-form-item label="一级机构">
                <el-col :span="24">
                  <el-input v-model="ruleForm.master" :disabled=true></el-input> 
                </el-col>
            </el-form-item>
            
            <el-form-item label="二级机构">
              <el-col :span="24">
                <el-input v-model="ruleForm.slaver" :disabled=true></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="状态">
              <el-col :span="24">
                <el-input v-model="ruleForm.state" :disabled=true></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="添加人">
              <el-col :span="24">
                <el-input v-model="ruleForm.author" :disabled=true></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
                <!-- <el-col :span="12"> -->
                  <el-button type="primary" @click="goBackForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">返回</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">修改机构信息</el-button>
                  <el-button type="primary" @click="unregisterForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">注销</el-button>
                  <el-button type="primary" @click="registerForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">激活</el-button>
                <!-- </el-col> -->
            </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  name: "detailProject",
  data() {
    return {
      ruleForm: {
        id: '',
        num: '',
        master: '',
        slaver: '',
        label: '',
        state: '',
        author: '',
        time: ''
        
      },
      rules: {
        label: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ]
      },
      fullscreenLoading:false
    };
  },
  methods: {
    goBackForm(formName) {
      this.$router.go(-1);
    },
    submitForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("http://localhost:8080/modifyBranch.action",{
          key:this.ruleForm.id,
          name:this.ruleForm.label
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
          this.$message({
              message: '修改机构信息成功',
              type: 'success'
          });
          this.$router.push('/container/queryBranch');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '修改机构信息失败',
              type: 'error'
          });
          fullscreenLoading:false;
          return;
        });
      }, 2000);
    },
    unregisterForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("http://localhost:8080/unregisterBranch.action",{
          key:this.ruleForm.id
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
          this.$message({
              message: '恭喜你，注销机构成功',
              type: 'success'
          });
          this.$router.push('/container/queryBranch');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '注销机构失败',
              type: 'error'
          });
          fullscreenLoading:false;
          return;
        });
      }, 2000);
    },
    registerForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("http://localhost:8080/registerBranch.action",{
          key:this.ruleForm.id
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
          this.$message({
              message: '恭喜你，激活机构成功',
              type: 'success'
          });
          this.$router.push('/container/queryBranch');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '激活机构失败',
              type: 'error'
          });
          fullscreenLoading:false;
          return;
        });
      }, 2000);
    }
  },
  mounted:function(){
    this.ruleForm.id = this.$route.params.id;
    this.ruleForm.num = this.$route.params.num;
    this.ruleForm.master = this.$route.params.master;
    this.ruleForm.slaver = this.$route.params.slaver;
    this.ruleForm.label = this.$route.params.label;
    this.ruleForm.state = this.$route.params.state;
    this.ruleForm.author = this.$route.params.author;
    this.ruleForm.time = this.$route.params.time;
  }
};
</script>

<style scoped>
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  /* text-align: left; */
}

</style>

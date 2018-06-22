<template>
    <el-row>
      <el-col :span="23">
          <div class="title">修改用户信息</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.time" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="用户名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="拼音" prop="pinyin">
                  <el-input v-model="ruleForm.pinyin" ></el-input>
              </el-form-item>
              <el-form-item label="处室" prop="section">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.section"></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="职务" prop="post">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post" ></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="状态">
                <el-col :span="24">
                  <el-input v-model="ruleForm.stateDesc" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="专长" prop="specialty">
                <el-col :span="24">
                  <el-input v-model="ruleForm.specialty"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加者">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="goBackForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">返回</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
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
    var checkName = (rule,value,callback)=>{
      if(value == ''){
        callback(new Error('请输入用户名'));
      }else{
        var reg= /^[A-Za-z]+$/;
        if (reg.test(value)) //判断是否符合正则表达式
        {
          callback();
        }else{
          callback(new Error('用户名为1到10个字母组成'));
        }
      }
    };
    return {
      ruleForm: {
        key:'',
        time:'',
        name: '',
        pinyin:'',
        section: '',
        post: '',
        author: '',
        specialty:'',
        stateDesc:''
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        pinyin: [
          { required:true,validator:checkName, trigger: "blur" }
        ],
        section: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        post:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 32到 20 个字符", trigger: "blur" }
        ],
        specialty:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
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
      this.$refs.ruleForm.validate(valid => { 
        if (valid) { 
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = true;
            this.$axios.post("http://localhost:8080/modifyUser.action",{
              name:this.ruleForm.name,
              pinyin:this.ruleForm.pinyin,
              section:this.ruleForm.section,
              post:this.ruleForm.post,
              specialty:this.ruleForm.specialty,
              key:this.ruleForm.key
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
                  message: '恭喜你，修改用户信息成功',
                  type: 'success'
              });
              this.$router.push('/container/queryUser');
              return;
            })
            .catch(error=>{
              this.$message({
                  message: '添加用户信息失败',
                  type: 'error'
              });
              fullscreenLoading:false;
              return;
            });
            
          }, 2000);
        } else { 
          console.log('submit err');
          this.$message({
              message: '补充信息',
              type: 'error'
          });
          this.fullscreenLoading = false;
          return;
        } 
      }) 
    }
  },
  mounted:function(){
    this.ruleForm.time = this.$route.params.time;
    this.ruleForm.pinyin = this.$route.params.pinyin;
    this.ruleForm.name = this.$route.params.name;
    this.ruleForm.section = this.$route.params.section;
    this.ruleForm.post = this.$route.params.post;
    this.ruleForm.specialty = this.$route.params.specialty;
    this.ruleForm.stateDesc = this.$route.params.stateDesc;
    this.ruleForm.author = this.$route.params.author;
    this.ruleForm.key = this.$route.params.key;
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

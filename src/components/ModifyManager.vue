<template>
    <el-row>
      <el-col :span="23">
          <div class="title">修改管理员信息</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.time" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="alias">
                  <el-input v-model="ruleForm.alias" ></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                  <el-input v-model="ruleForm.name" :disabled=true></el-input>
              </el-form-item>
              <el-form-item label="处室" prop="section">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.section"></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="职务" prop="post">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="角色">
                <el-col :span="24">
                  <el-input v-model="ruleForm.type" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="角色" prop="type2">
                <el-col :span="24">
                  <el-select v-model="ruleForm.type2" placeholder="请选择" size="small" >
                      <el-option
                        v-for="item in managerType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                </el-col>
              </el-form-item>

              <el-form-item label="状态">
                <el-col :span="24">
                  <el-input v-model="ruleForm.state" :disabled=true></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="添加者">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">返回</el-button>
                    <el-button type="primary" @click="modifyForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">修改信息</el-button>
                    <el-button type="primary" @click="unRegisterForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">注销</el-button>
                    <el-button type="primary" @click="registerForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">激活</el-button>
                    <el-button type="primary" @click="initForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">重置密码</el-button>
                  <!-- </el-col> -->
              </el-form-item>
          </el-form>
      </el-col>
    </el-row>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store";
export default {
  name: "modifyProject",
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
      fullscreenLoading:false,
      managerType:store.state.managerType,
      ruleForm: {
        time: '',
        alias: '',
        name: '',
        section: '',
        post: '',
        type:'',
        type2:'',
        state:'',
        author:''
      },
      rules: {
        alias: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 100, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required:true,validator:checkName, trigger: "blur" }
        ],
        section: [
          { required: true, message: "请填写处室", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        post:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        author:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        type2:[
          { required: true, message: "请选择角色", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    submitForm() {
      this.$router.go(-1);
    },
    modifyForm(){
      this.fullscreenLoading = true;
      this.$refs.ruleForm.validate(valid => { 
        if (valid) { 
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = true;
            this.$axios.post("/modifyManager.action",{
              name:this.ruleForm.name,
              alias:this.ruleForm.alias,
              section:this.ruleForm.section,
              post:this.ruleForm.post,
              type:this.ruleForm.type2
            })
            .then(response=>{
              if(response.data=='999999'){
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
              this.$message({
                  message: '恭喜你，修改管理员信息成功',
                  type: 'success'
              });
              this.$router.push('/container/queryManager');
              return;
            })
            .catch(error=>{
              this.$message({
                  message: '添加管理员失败',
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
    },
    initForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("/initPassword.action",{
          name:this.ruleForm.name,
        })
        .then(response=>{
          if(response.data=='999999'){
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
            this.fullscreenLoading=false;
            return;
          }
          this.$message({
              message: '恭喜你，初始化管理员密码成功',
              type: 'success'
          });
          this.$router.push('/container/queryManager');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '初始化管理员密码失败',
              type: 'error'
          });
          this.fullscreenLoading=false;
          return;
        });
        
      }, 2000);
    },
    unRegisterForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("/unRegisterManager.action",{
          name:this.ruleForm.name,
        })
        .then(response=>{
          if(response.data=='999999'){
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
            this.fullscreenLoading=false;
            return;
          }
          this.$message({
              message: '恭喜你，注销管理员成功',
              type: 'success'
          });
          this.$router.push('/container/queryManager');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '注销管理员失败',
              type: 'error'
          });
          this.fullscreenLoading=false;
          return;
        });
        
      }, 2000);
    },
    registerForm(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = true;
        this.$axios.post("/initPassword.action",{
          name:this.ruleForm.name,
        })
        .then(response=>{
          if(response.data=='999999'){
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
            this.fullscreenLoading=false;
            return;
          }
          this.$message({
              message: '恭喜你，激活管理员成功',
              type: 'success'
          });
          this.$router.push('/container/queryManager');
          return;
        })
        .catch(error=>{
          this.$message({
              message: '激活管理员失败',
              type: 'error'
          });
          this.fullscreenLoading=false;
          return;
        });
        
      }, 2000);
    }
  },
  mounted:function(){
    this.ruleForm.time = this.$route.params.time;
    this.ruleForm.alias = this.$route.params.alias;
    this.ruleForm.name = this.$route.params.name;
    this.ruleForm.section = this.$route.params.section;
    this.ruleForm.post = this.$route.params.post;
    this.ruleForm.type = this.$route.params.type;
    this.ruleForm.state = this.$route.params.state;
    this.ruleForm.author = this.$route.params.author;
  }
};
</script>

<style scoped>
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}

</style>

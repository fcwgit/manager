<template>
    <el-row>
      <el-col :span="23">
          <div class="title">新增管理员</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              
              <el-form-item label="用户名" prop="name">
                <el-col :span="24">
                  <el-input v-model="ruleForm.name"  maxlength="10"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名" prop="alias">
                <el-col :span="24">
                  <el-input v-model="ruleForm.alias"></el-input>
                </el-col>
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
              
              <el-form-item label="角色" prop="type">
                <el-col :span="24">
                  <el-select v-model="ruleForm.type" placeholder="请选择" size="small" >
                      <el-option
                        v-for="item in managerType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="添加者" prop="author">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="submit()" >提交</el-button>
                  <!-- </el-col> -->
              </el-form-item>
          </el-form>
      </el-col>
    </el-row>
</template>

<script>
import axios from "axios";
import store from '@/vuex/store';
export default {
  name: "addManager",
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
      managerType:store.state.managerType,
      fullscreenLoading:true,
      ruleForm: {
        alias:'',
        name: '',
        section: '',
        post: '',
        type:'',
        author: store.state.alias
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
        ]
      },
      
    };
  },
  methods: {
    submit () { 
      this.fullscreenLoading = true;
      this.$refs.ruleForm.validate(valid => { 
        if (valid) { 
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.$axios.post("http://localhost:8080/addManager.action",{
              alias:this.ruleForm.alias,
              name:this.ruleForm.name,
              section:this.ruleForm.section,
              post:this.ruleForm.post,
              type:this.ruleForm.type
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
                  message: '恭喜你，添加管理员成功',
                  type: 'success'
              });
              this.$router.push('/container/queryManager');
              return;
            })
            .catch(error=>{
              // console.log('error='+error);
              this.$message({
                  message: '添加管理员失败',
                  type: 'error'
              });
              // flag=false;
              // this.$router.push('/');
              return;
            });
            
          }, 2000);
        } else { 
          console.log('submit err');
        } 
      }) 
    }
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

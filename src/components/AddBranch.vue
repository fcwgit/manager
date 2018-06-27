<template>
    <el-row>
      <el-col :span="23">
          <div class="title">新增检查机构</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="机构名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="编号" prop="num">
                  <el-input v-model="ruleForm.num"></el-input>
              </el-form-item>

              <el-form-item label="一级类别" prop="master">
                <el-col :span="24">
                  <el-select v-model="ruleForm.master" placeholder="请选择" size="small" >
                      <el-option
                        v-for="item in branchMasterType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                </el-col>
              </el-form-item>

              <el-form-item label="二级类别" prop="slaver">
                <el-col :span="24">
                  <el-select v-model="ruleForm.slaver" placeholder="请选择" size="small" >
                      <el-option
                        v-for="item in branchSlaverType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                </el-col>
              </el-form-item>

              <el-form-item label="添加者">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
                  <!-- </el-col> -->
              </el-form-item>
          </el-form>
      </el-col>
    </el-row>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store"
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
      branchMasterType:store.state.branchMasterType,
      branchSlaverType:store.state.branchSlaverType,
      ruleForm: {
        name: '',
        num:'',
        master: '',
        slaver: '',
        author: store.state.alias
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        num: [
          { required: true, message: "请输入机构编号", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
          
        ],
        master: [
          { required: true, message: "请选择机构类别", trigger: "blur" },
        ],
        slaver:[
          { required: true, message: "请填写职务", trigger: "blur" },
        ]
      },
      fullscreenLoading:false
    };
  },
  methods: {
    submitForm(formName) {
      this.fullscreenLoading = true;
      this.$refs.ruleForm.validate(valid => { 
        if (valid) { 
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = true;
            this.$axios.post("/addBranch.action",{
              name:this.ruleForm.name,
              num:this.ruleForm.num,
              master:this.ruleForm.master,
              slaver:this.ruleForm.slaver
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
                  message: '恭喜你，添加机构成功',
                  type: 'success'
              });
              this.$router.push('/container/addBranch');
              this.ruleForm.name='';
              this.ruleForm.num='';
              this.ruleForm.master='';
              this.ruleForm.slaver='';
              this.fullscreenLoading = false
              return;
            })
            .catch(error=>{
              this.$message({
                  message: '添加机构失败',
                  type: 'error'
              });
              this.fullscreenLoading = false;
              return;
            });
            
          }, 2000);
        } else { 
          console.log('submit err');
          this.fullscreenLoading = false;
          this.$message({
            message: '请补充信息',
            type: 'error'
        });
        } 
      }) 
    }
  },
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

<template>
  <el-row>
    <el-col :span="24">
      <div class="title">创建项目</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="检查项目名称" prop="name">
          <el-col :span="23">
            <el-input type="textarea" v-model="ruleForm.name" rows=2 maxlength=100></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="检查项目简介" prop="des">
          <el-col :span="23">
            <el-input type="textarea" v-model="ruleForm.des" rows=16 maxlength=1000></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="检查月份" required>
            <el-col :span="2">
            <el-form-item prop="date">
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker> -->
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" 
                format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker> -->
                
                <el-date-picker
                  v-model="ruleForm.date"
                  type="month"
                  placeholder="选择月"
                  value-format="yyyy-MM">
                </el-date-picker>
            </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// import axios from "axios";
export default {
  name: "createProject",

  data() {
    return {
      fullscreenLoading:false,
      ruleForm: {
        name: '',
        date: '',
        des: '',
        // projectId:'',
        // bankData:[]
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" }
        ],
        des: [
          { required: true, message: "请填写项目简介", trigger: "blur" },
          { min: 3, max: 1000, message: "长度在 3 到 1000 个字符", trigger: "blur" }
        ],
        date:[
          { required: true, message: "请设置检查月份", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$refs.ruleForm.validate(valid => { 
            if (valid) { 
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = true;
                this.$axios.post("http://localhost:8080/addProject.action",{
                  name:this.ruleForm.name,
                  des:this.ruleForm.des,
                  date:this.ruleForm.date
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
                      message: '恭喜你，添加项目成功',
                      type: 'success'
                  });
                  // this.$router.push('/container/addBranch');
                  this.fullscreenLoading = false;
                  // this.projectId = response.data.body.id;
                  // this.bankData = response.data.body.bankData;
                  let projectObj={
                    name:this.ruleForm.name,
                    des:this.ruleForm.des,
                    date:this.ruleForm.date,
                    projectId:response.data.body.id,
                    bankData:response.data.body.bankData,
                    worker:response.data.body.worker
                  }
                  sessionStorage.setItem('worker',JSON.stringify(projectObj));
                  // this.$router.push({name:'conformProject',params:project});
                  this.$router.push('/container/conformProject');
                  return;
                })
                .catch(error=>{
                  this.$message({
                      message: '添加项目失败',
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  text-align: left;
}

</style>

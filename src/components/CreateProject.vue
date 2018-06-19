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
        <el-form-item label="检查项目简介" prop="desc">
          <el-col :span="23">
            <el-input type="textarea" v-model="ruleForm.desc" rows=16 maxlength=1000></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="检查月份" required>
            <el-col :span="2">
            <el-form-item prop="date1">
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker> -->
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" 
                format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker> -->
                
                <el-date-picker
                  v-model="ruleForm.date1"
                  type="month"
                  placeholder="选择月"
                  value-format="yyyy-MM">
                </el-date-picker>
            </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      ruleForm: {
        name: "",
        date1: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请填写项目简介", trigger: "blur" },
          { min: 3, max: 1000, message: "长度在 3 到 1000 个字符", trigger: "blur" }
        ],
        data1:[
          { required: true, message: "请设置检查月份", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleNodeClick(data) {
        if(data.id != undefined){
          this.$router.push("/" + data.id);
        }
      },


    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          // console.log(this.ruleForm.name);
          this.$router.push('/container/conformProject/' + this.ruleForm.name + "/" + this.ruleForm.desc + "/" + this.ruleForm.date1);
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

/* .el-row{
  width: 89%;
  float:right;
}
.left-nav{
  color: #fff;
  font-size: 10px;;
  width: 10%;
  height: 100%;
  border: 1px solid #20a0ff;
  margin: 0;
  float: left; 
}*/
</style>

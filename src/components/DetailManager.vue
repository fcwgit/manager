<template>
    <el-row>
      <el-col :span="23">
          <div class="title">管理员详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.date" disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input v-model="ruleForm.name" disabled=true></el-input>
              </el-form-item>
              <el-form-item label="处室">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.mobile" disabled=true></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="类别">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post" disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加者">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="submitForm('ruleForm')" >返回</el-button>
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
        date: '2018-05-03',
        name: '王五',
        mobile: '电子银行三室',
        post: '超级管理员',
        author: 'chaoji'
      },
    };
  },
  methods: {
    // handleNodeClick(data) {
    //   alert(data.id);
    //   if(data.id != undefined){
    //     this.$router.push("/" + data.id);
    //   }
    // },
    submitForm(formName) {
      this.$router.go(-1);
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

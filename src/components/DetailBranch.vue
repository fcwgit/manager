<template>
  <el-row>
    <el-col :span="23">
        <div class="title">机构详细信息</div>
          <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
            <el-form-item label="机构名称">
                <el-input v-model="ruleForm.label" :disabled=true></el-input>
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
        id: '',
        num: '',
        master: '',
        slaver: '',
        label: '',
        state: '',
        author: '',
        time: ''
        
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$router.go(-1);
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

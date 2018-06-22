<template>
    <el-row>
      <el-col :span="23">
          <div class="title">管理员详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.time" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input v-model="ruleForm.alias" :disabled=true></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                  <el-input v-model="ruleForm.name" :disabled=true></el-input>
              </el-form-item>
              <el-form-item label="处室">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.section" :disabled=true></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="职务">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="角色">
                <el-col :span="24">
                  <el-input v-model="ruleForm.type" :disabled=true></el-input>
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
        time: '',
        alias: '',
        name: '',
        section: '',
        post: '',
        type:'',
        state:'',
        author:''
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$router.back(-1);
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

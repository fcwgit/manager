<template>
    <el-row>
      <el-col :span="23">
          <div class="title">用户详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.time" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="用户名">
                  <el-input v-model="ruleForm.name" :disabled=true></el-input>
              </el-form-item>
              <el-form-item label="拼音">
                  <el-input v-model="ruleForm.pinyin" :disabled=true></el-input>
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
              <el-form-item label="状态">
                <el-col :span="24">
                  <el-input v-model="ruleForm.stateDesc" :disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="专长">
                <el-col :span="24">
                  <el-input v-model="ruleForm.specialty" :disabled=true></el-input>
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
        time:'',
        name: '',
        pinyin:'',
        section: '',
        post: '',
        author: '',
        specialty:'',
        stateDesc:''
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
  mounted:function(){
    this.ruleForm.time = this.$route.params.time;
    this.ruleForm.pinyin = this.$route.params.pinyin;
    this.ruleForm.name = this.$route.params.name;
    this.ruleForm.section = this.$route.params.section;
    this.ruleForm.post = this.$route.params.post;
    this.ruleForm.specialty = this.$route.params.specialty;
    this.ruleForm.stateDesc = this.$route.params.stateDesc;
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
  /* text-align: left; */
}

</style>

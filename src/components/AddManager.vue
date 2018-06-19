<template>
    <el-row>
      <el-col :span="23">
          <div class="title">新增管理员</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <!-- <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.date"></el-input>
                </el-col>
              </el-form-item> -->
              <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="处室" prop="mobile">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.mobile"></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="类别" prop="post">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加者" prop="author">
                <el-col :span="24">
                  <el-input v-model="ruleForm.author" readonly="true" disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                  <!-- <el-col :span="12"> -->
                    <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
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
        date: '',
        name: '',
        mobile: '',
        post: '',
        author: 'chaoji'
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 100, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请填写处室", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        post:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        author:[
          { required: true, message: "请填写职务", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
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

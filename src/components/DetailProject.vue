<template>
    <el-row>
      <el-col :span="24">
          <div class="title">项目详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="检查项目名称" prop="name">
                <el-col :span="24">
                  <el-input v-model="ruleForm.name" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="检查项目简介" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="检查年份">
                  <el-col :span="7">
                    <el-input v-model="ruleForm.date" :disabled="true"></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="检查对象" prop="target">
                <el-col :span="24">
                  <el-input v-model="ruleForm.target" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="组长" prop="leader">
                <el-col :span="24">
                  <el-input v-model="ruleForm.leader" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="副组长" prop="leaderBak">
                <el-col :span="24">
                  <el-input v-model="ruleForm.leaderBak" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="主查" prop="master">
                <el-col :span="24">
                  <el-input v-model="ruleForm.master" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="副主查" prop="masterBak">
                <el-col :span="24">
                  <el-input v-model="ruleForm.masterBak" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="成员" prop="slaver">
                <el-col :span="24">
                  <el-input v-model="ruleForm.slaver" :disabled="true"></el-input>
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
        projectId:'',
        name: "",
        desc: "",
        date: "",
        target:"",
        leader:"",
        master:"",
        slaver:""
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$router.go(-1);
    }
  },
  mounted:function(){

    this.ruleForm.projectId = this.$route.params.id;
    this.$axios.post("/queryProjectDetail.action",{
      key:this.ruleForm.projectId,
    })
    .then(response=>{
      if(response.data=='999999'){
        this.$message({
          type: 'warning',
          message: '请重新登录!'
        }); 
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
          message: '查询成功',
          type: 'success'
      });

      this.ruleForm.name = response.data.body.project.name;
      this.ruleForm.desc = response.data.body.project.des;
      this.ruleForm.date = response.data.body.project.date;
      this.ruleForm.target = response.data.body.target;
      this.ruleForm.leader = response.data.body.leader;
      this.ruleForm.leaderBak = response.data.body.leaderBak;
      this.ruleForm.master = response.data.body.master;
      this.ruleForm.masterBak = response.data.body.masterBak;
      this.ruleForm.slaver = response.data.body.slaver;
      return;
    })
    .catch(error=>{
      console.log('error='+error);
      this.$message({
          message: '查询失败',
          type: 'error'
      });
      return;
    });
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

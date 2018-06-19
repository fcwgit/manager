<template>
    <el-row>
      <el-col :span="24">
          <div class="title">项目详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="检查项目名称" prop="name">
                <el-col :span="24">
                  <el-input v-model="ruleForm.name" disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="检查项目简介" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="检查年份">
                  <el-col :span="7">
                    <el-input v-model="ruleForm.date" disabled="true"></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="检查对象" prop="target">
                <el-col :span="24">
                  <el-input v-model="ruleForm.target" disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="组长" prop="leader">
                <el-col :span="24">
                  <el-input v-model="ruleForm.leader" disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="主查" prop="master">
                <el-col :span="24">
                  <el-input v-model="ruleForm.master" disabled="true"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="成员" prop="slaver">
                <el-col :span="24">
                  <el-input v-model="ruleForm.slaver" disabled="true"></el-input>
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
        name: "深化整治银行业市场乱象的检查",
        desc: "深化整治银行业市场乱象的检查",
        date: "2018-06-13",
        target:"中国银行、农业银行",
        leader:"张三",
        master:"李四",
        slaver:"王五"
      },
      data: [{
        label: '项目管理',
        children: [{
          label: '新建项目',
          id:'createProject'
        },{
          label: '查询项目',
          id:'queryProject'
        }
        ]
      }, {
        label: '机构管理',
        children: [{
          label: '添加机构',
          id:'addBranch'
        }, {
          label: '查询机构',
          id:'queryBranch'
        }]
      }, {
        label: '用户管理',
        children: [{
          label: '新增管理员',
          id:'addUser'
        }, {
          label: '查询管理员',
          id:'queryUser'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
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

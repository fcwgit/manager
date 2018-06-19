<template>
    <el-row>
      <el-col :span="23">
          <div class="title">用户详细信息</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="添加日期">
                <el-col :span="24">
                  <el-input v-model="ruleForm.date" disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="用户名">
                  <el-input v-model="ruleForm.name" disabled=true></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                  <el-col :span="24">
                    <el-input v-model="ruleForm.mobile" disabled=true></el-input> 
                  </el-col>
              </el-form-item>
              
              <el-form-item label="职位">
                <el-col :span="24">
                  <el-input v-model="ruleForm.post" disabled=true></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加人">
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
        name: '张三',
        mobile: '13425676567',
        post: '100000000001',
        author: '李四'
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

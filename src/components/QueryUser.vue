<template>
<div>
  <div class="title">查询人员库信息</div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="人员姓名" prop="name">
          <el-col :span="10">
            <el-input type="text" v-model="ruleForm.name" maxlength=10></el-input>
          </el-col>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="addForm()">新增</el-button>
        </el-form-item>
      </el-form>
      <hr>
      <el-table :data="tableData" style="width:98%" >
        <el-table-column
          prop="time"
          label="添加日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100" style="text-overflow:ellipsis">
        </el-table-column>
        <el-table-column
          prop="pinyin"
          label="拼音"
          width="100" style="text-overflow:ellipsis">
        </el-table-column>
        <el-table-column
          prop="section"
          label="处室"
          width="100">
        </el-table-column>
        <el-table-column
          prop="post"
          label="职务"
          width="100">
        </el-table-column>
        <el-table-column
          prop="specialty"
          label="特长"
          width="300">
        </el-table-column>
        <el-table-column
          prop="stateDesc"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="author"
          label="添加者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="key"
          label="添加者"
          width="100" v-if="false">
        </el-table-column>
        
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="detailClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="modifyClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size=pageSize
        :total=count>
      </el-pagination>
</div>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store"
  export default {
    // name:queryManager,
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.submitForm();
      },
      detailClick(row) {
        // this.$router.push('/container/detailUser/'+row.time+"/"+row.pinyin+"/"+row.name+"/"+row.section+"/"+row.post+"/"+row.specialty+"/"+row.stateDesc+"/"+row.author+"/"+row.key);
        this.$router.push({name:'detailUser',params:row});
      },
      modifyClick(row) {
        // this.$router.push('/container/modifyUser/'+row.time+"/"+row.pinyin+"/"+row.name+"/"+row.section+"/"+row.post+"/"+row.specialty+"/"+row.stateDesc+"/"+row.author+"/"+row.key);
        this.$router.push({name:'modifyUser',params:row})
      },
      submitForm(formName) {
        this.$axios.post("/queryUser.action",{
          pinyin:this.ruleForm.name,
          currentPage:this.currentPage
        })
        .then(response=>{
          if(response.data=='999999'){
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

          this.tableData = response.data.body.userList;
          this.count = parseInt(response.data.body.count);
          this.pageSize = parseInt(store.state.pageSize);
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addForm() {
        this.$router.push('/container/addUser');
      }
    },
    data() {
      var checkName = (rule,value,callback)=>{
        if(value == ''){
          callback();
        }else{
          var reg= /^[A-Za-z]+$/;
          if (reg.test(value)) //判断是否符合正则表达式
          {
            callback();
          }else{
            callback(new Error('用户名为1到10个字母组成'));
          }
        }
      };
      return {
        ruleForm: {
          name: "",
        },
        rules: {
          name: [
          { validator:checkName, trigger: "blur" }
        ]
        },
        tableData: [],
        count:0,
        pageSize:0,
        currentPage:'1'
      }
    },
  }
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
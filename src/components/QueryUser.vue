<template>
<div>
  <div class="title">查询人员库信息</div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="人员名称" prop="name">
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


      <el-table
        :data="tableData3"
        style="width:98%"
        >
        <el-table-column
          prop="date"
          label="添加日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="100" style="text-overflow:ellipsis">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="处室"
          width="300">
        </el-table-column>
        <el-table-column
          prop="post"
          label="职务"
          width="200">
        </el-table-column>
        <el-table-column
          prop="author"
          label="专长"
          width="300">
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
        :total="50">
      </el-pagination>
</div>
</template>

<script>
  export default {
    
    methods: {
      detailClick(row) {
        console.log(row);
        this.$router.push('/container/detailUser');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/container/modifyUser');
      },
      submitForm(formName) {
        // this.$refs[formName].validate(valid => {
        //   if (valid) {
        //     // alert("submit!");
        //     // console.log(this.ruleForm.name);
        //     this.$router.push('/container/conformProject/' + this.ruleForm.name + "/" + this.ruleForm.desc + "/" + this.ruleForm.date1);
        //   } else {
        //     console.log("error submit!!");
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addForm() {
        this.$router.push('/container/addUser');
      }
    },
    data() {
      return {
        ruleForm: {
          name: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入人员名称", trigger: "blur" },
            { min: 3, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ]
    },
        tableData3: [{
          date: '2018-05-03',
          name: '张三',
          mobile: '科技处一室',
          post: '处长',
          author: 'zookeeper、dubbo'
        }, {
          date: '2018-05-03',
          name: '李四',
          mobile: '电子银行二室',
          post: '科员',
          author: 'dubbo、redis'
        }, {
          date: '2018-05-03',
          name: '王五',
          mobile: '电子银行三室',
          post: '局长',
          author: 'redis、MongoDB'
        }, {
          date: '2018-05-03',
          name: '赵六',
          mobile: '电子银行二室',
          post: '司长',
          author: 'ActiveMQ'
        }, {
          date: '2018-05-03',
          name: '孙七',
          mobile: '电子银行一室',
          post: '组长',
          author: 'SpringBoot'
        }, {
          date: '2018-05-03',
          name: '周八',
          mobile: '电子银行二室',
          post: '主管',
          author: 'SpringCloud'
        }, {
          date: '2018-05-03',
          name: '吴九',
          mobile: '电子银行三室',
          post: '部长',
          author: 'ssm'
        }]
      }
    }
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
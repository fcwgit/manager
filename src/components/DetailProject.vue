<template>
<div>
  <div>
    <el-tabs style="padding:5px">
      <el-tab-pane label="项目详细信息" >
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
          
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="检查对象设置信息" >
        <el-table :data="addTarget" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="组长设置信息">
        <el-table :data="addLeader" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="副组长设置信息">
        <el-table :data="addLeaderBak" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="主查设置信息">
        <el-table :data="addMaster" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="副主查设置信息">
        <el-table :data="addMasterBak" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="检查人员设置信息">
        <el-table :data="addSlaver" style="width:98%" >
          <el-table-column
            prop="time"
            label="设置日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contents"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="author"
            label="操作员"
            width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col :span="2" :offset="6">
        <el-button type="primary" @click="submitForm('ruleForm')" >返回</el-button>
      </el-col>
      <el-col :span="6" >
        <el-button type="primary" @click="handleDownload()" >导出excel文件</el-button>
      </el-col>
    </el-row>
  </div>
</div>

</template>

<script>
import axios from "axios";
export default {
  name: "detailProject",
  data() {
    return {
      ruleForm: {
        projectId:'',
        name: '',
        desc: '',
        date: '',
        target:'',
        leader:'',
        leaderBak:'',
        master:'',
        masterBak:'',
        slaver:'',
      },
      addTarget:[],
      addLeader:[],
      addLeaderBak:[],
      addMaster:[],
      addMasterBak:[],
      addSlaver:[]
    };
  },
  methods: {
    submitForm(formName) {
      this.$router.go(-1);
    },


    handleDownload() {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_object_to_excel } = require('@/vendor/Export2Excel')
          var arr = [];

          const filterVal = ['name', 'desc', 'date','target','leader','leaderBak','master','masterBak','slaver'];
          let ruleArr = [];
          ruleArr.push(this.ruleForm);
          const list = ruleArr;
          const data = this.formatJson(filterVal, list)
          
          var obj = {
            th:['项目名称', '项目简介', '检查年份','检查对象','组长','副组长','主查','副主查','检查人员'],
            jsonData:data,
            sheetName:'项目详细信息'
          };
          arr.push(obj);

          const filterVal2 = ['time', 'contents', 'author'];
          const list2 = this.addTarget;
          const data2 = this.formatJson(filterVal2, list2);
          var obj2 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data2,
            sheetName:'检查对象设置信息'
          };
          arr.push(obj2);

          const filterVal3 = ['time', 'contents', 'author'];
          const list3 = this.addLeader;
          const data3 = this.formatJson(filterVal3, list3);
          var obj3 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data3,
            sheetName:'组长设置信息'
          };
          arr.push(obj3);


          const filterVal4 = ['time', 'contents', 'author'];
          const list4 = this.addLeaderBak;
          const data4 = this.formatJson(filterVal4, list4);
          var obj4 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data4,
            sheetName:'副组长设置信息'
          };
          arr.push(obj4);

          const filterVal5 = ['time', 'contents', 'author'];
          const list5 = this.addMaster;
          const data5 = this.formatJson(filterVal5, list5);
          var obj5 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data5,
            sheetName:'主查设置信息'
          };
          arr.push(obj5);

          const filterVal6 = ['time', 'contents', 'author'];
          const list6 = this.addMasterBak;
          const data6 = this.formatJson(filterVal6, list6);
          var obj6 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data6,
            sheetName:'副主查设置信息'
          };
          arr.push(obj6);


          const filterVal7 = ['time', 'contents', 'author'];
          const list7 = this.addSlaver;
          const data7 = this.formatJson(filterVal7, list7);
          var obj7 = {
            th:['设置时间', '内容', '操作员'],
            jsonData:data7,
            sheetName:'检查人员设置信息'
          };
          arr.push(obj7);


          export_json_object_to_excel(arr,'branchRelation');

          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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


      this.addTarget = response.data.body.addTarget;
      this.addLeader = response.data.body.addLeader;
      this.addLeaderBak = response.data.body.addLeaderBak;
      this.addMaster = response.data.body.addMaster;
      this.addMasterBak = response.data.body.addMasterBak;
      this.addSlaver = response.data.body.addSlaver;
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

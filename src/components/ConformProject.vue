<template>
<div>
    <!-- Hello AwesomePos Demo. -->
    <el-row>
      <el-col :span='12' class="content">
        <el-tabs style="padding:5px"> 
          <el-tab-pane label="项目信息">
            <el-form label-width="100px">
              <el-form-item label="检查项目名称" >
                <el-input type="textarea" :rows=2 v-model="projectName" :disabled="true">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="检查项目描述" >
                <!-- <el-input v-model="projectDesc" :disabled="true">
                </el-input> -->
                <el-input type="textarea" :rows=5 :disabled="true" v-model="projectDesc">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="检查年份" >
                <el-input v-model="projectDate" :disabled="true">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="检查对象" >
                <el-input v-model="projectTarget" :readonly="true" @click.native="showTransfer1">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="组长" >
                <el-input v-model="projectLeader" :readonly="true" @click.native="showTransfer2">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="主查" >
                <el-input v-model="projectMaster" :readonly="true" @click.native="showTransfer3">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="检查人员" >
                <el-input v-model="projectSlaver" :readonly="true" @click.native="showTransfer4">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="fileHandleChange"
                  :file-list="fileList3">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <div id="transfer1">
          <el-tabs style="padding:5px">
            <el-tab-pane label="检查对象">

              <div class="tree-class">
                <el-tree
                  :data="bankData"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @check-change="bankHandleChange"
                  >
                </el-tree>
              </div>


              <el-table :data="bankTableData" height="250" size="small">
                <el-table-column prop="masterDisplay" label="类别" width="80">
                </el-table-column>
                <el-table-column prop="slaverDisplay" label="行名" v-if="false">
                </el-table-column>
                <el-table-column prop="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="label" label="简称" width="200">
                </el-table-column>
                <el-table-column prop="num" label="编号" width="120">
                </el-table-column>
                <el-table-column prop="right"
                  fixed="right"
                  label="权重"
                  >
                  <template  slot-scope="scope">
                    <el-select v-model="scope.row.right" placeholder="请选择" size="small" @click.native="handleClick(scope.row)" >
                      <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
              <div class="totalDiv" > 
                <el-row>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="样本数量" >
                    <el-input :disabled="true" v-model=bankTableDataLength>
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="随机数量" >
                    <el-input v-model="bankTargetCount" value="number">
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                </el-row>
              </div>
              <div class="div-btn">
                <!-- <el-button type="success" @click="checkoutBank()">随机</el-button> -->
                <el-button type="success" @click="checkoutBank" v-loading.fullscreen.lock="fullscreenLoading">
                  随机</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div id="transfer2">
          <el-tabs style="padding:5px">
            <el-tab-pane label="组长">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                :titles="['资源库', '备选项']"
                filter-placeholder="请输入人名拼音"
                v-model="leaderSelected"
                height="150"
                @change="leaderHandleChange"
                size="small"
                :data="worker">
              </el-transfer>
              <el-table :data="leaderTableData" height="250" size="small">
                <el-table-column prop="label" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="section" label="处室" width="120">
                </el-table-column>
                <el-table-column prop="post" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长">
                </el-table-column>
              </el-table>
              <div class="totalDiv" > 
                <el-row>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="样本数量" >
                    <el-input :disabled="true" v-model=leaderTableDataLength>
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="随机数量" >
                    <el-input v-model="leaderTargetCount" value="number">
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                </el-row>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutLeader()">随机</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div id="transfer3">
          <el-tabs style="padding:5px">
            <el-tab-pane label="主查">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                :titles="['资源库', '备选项']"
                filter-placeholder="请输入城市拼音"
                v-model="masterSelected"
                @change="masterHandleChange"
                height="150"
                size="small"
                :data="worker">
              </el-transfer>
              <el-table :data="masterTableData" height="250" size="small">
                <el-table-column prop="label" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="section" label="处室" width="120">
                </el-table-column>
                <el-table-column prop="post" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长">
                </el-table-column>
              </el-table>

              <div class="totalDiv" > 
                <el-row>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="样本数量" >
                    <el-input :disabled="true" v-model=masterTableDataLength>
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="随机数量" >
                    <el-input v-model="masterTargetCount" value="number">
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                </el-row>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutMaster()">随机</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div id="transfer4">
          <el-tabs style="padding:5px">
            <el-tab-pane label="检查人员">
              <el-transfer
                filterable
                :filter-method="filterMethod"
                :titles="['资源库', '备选项']"
                filter-placeholder="请输入城市拼音"
                v-model="slaverSelected"
                @change="slaverHandleChange"
                height="150"
                size="small"
                :data="worker">
              </el-transfer>
              <el-table :data="slaverTableData" height="250" size="small">
                <el-table-column prop="label" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="section" label="处室" width="120">
                </el-table-column>
                <el-table-column prop="post" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长">
                </el-table-column>
              </el-table>

              <div class="totalDiv" > 
                <el-row>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="样本数量" >
                    <el-input :disabled="true" v-model=slaverTableDataLength>
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                <el-col :span="10">
                <el-form label-width="100px">
                  <el-form-item label="随机数量" >
                    <el-input v-model="slaverTargetCount" value="number">
                    </el-input>
                  </el-form-item>
                </el-form>
                </el-col>
                </el-row>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutSlaver()">随机</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  <!-- <div> -->
    <el-row>
      <el-col>
        <el-button id="login" style="width:100%" type="primary">提交</el-button> 
      </el-col>
    </el-row>
 <!-- </div>  -->
 </div>
</template>

<script>
import axios from "axios";
import store from '@/vuex/store';
export default {
  name: "conformProject",
 
  data() {
    return {
      fullscreenLoading:false,
      options:[],
      worker:[],
      projectName: '',
      projectDesc: '',
      projectDate:'',
      projectId:'',
      projectTarget:'',
      projectLeader:'',
      projectMaster:'',
      projectSlaver:'',
      bankSelected: [],
      leaderSelected: [],
      masterSelected: [],
      slaverSelected: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      bankTableData:[],
      bankTableDataLength:0,
      leaderTableData:[],
      leaderTableDataLength:0,
      masterTableData:[],
      masterTableDataLength:0,
      slaverTableData:[],
      slaverTableDataLength:0,
   
      value:'',
      fileList3: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      bankData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      bankTargetCount:0,
      leaderTargetCount:0,
      masterTargetCount:0,
      slaverTargetCount:0
    }
  },
  methods: {
    fileHandleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
    showTransfer1(){
      document.getElementById("transfer1").style.display="";
      document.getElementById("transfer2").style.display="none";
      document.getElementById("transfer3").style.display="none";
      document.getElementById("transfer4").style.display="none";
    },
    showTransfer2(){
      document.getElementById("transfer1").style.display="none";
      document.getElementById("transfer2").style.display="";
      document.getElementById("transfer3").style.display="none";
      document.getElementById("transfer4").style.display="none";
      
    },
    showTransfer3(){
      document.getElementById("transfer1").style.display="none";
      document.getElementById("transfer2").style.display="none";
      document.getElementById("transfer3").style.display="";
      document.getElementById("transfer4").style.display="none";
    },
    showTransfer4(){
      document.getElementById("transfer1").style.display="none";
      document.getElementById("transfer2").style.display="none";
      document.getElementById("transfer3").style.display="none";
      document.getElementById("transfer4").style.display="";
    },
    bankHandleChange() {

      this.bankTableData = this.$refs.tree.getCheckedNodes(true);
      this.bankTableDataLength = this.bankTableData.length;
      
      this.showTransfer1();
    },
    
    showRender(){
    },
    handleClick(row) {
      // console.log("=======");
      // console.log(row);
      // console.log(row.id);
      // console.log(row.name);
      // console.log(row.right);
    },
    checkoutBank(){
      if(this.bankTableData.length == 0){
        this.$message({  
            message : '请选择机构！',  
            type : 'warning'  
        })  
        return; 
      }
      if(this.bankTargetCount == 0){
        this.$message({  
            message : '请设置检查对象随机数量！',  
            type : 'warning'  
        })  
        return; 
      }
      if(this.bankTargetCount>this.bankTableData.length){
        this.$message({  
            message : '请重新设置检查对象随机数量！',  
            type : 'warning'  
        })  
        return; 
      }
      let targetArr = [];
      let randomSeed = [];
      let sortSeed = [];
      for(let i=0;i<this.bankTableData.length;i++){
        let obj = this.bankTableData[i];
        if(obj.right == undefined){
          this.$message({  
            message : '请设置机构权重！',  
            type : 'warning'  
          })  
          return; 
        }
        let randomNum = Math.random() * parseInt(obj.right);
        randomSeed[i] = randomNum;
        sortSeed[i] = randomNum;
      }
      randomSeed = randomSeed.sort();
      randomSeed = randomSeed.reverse();
      for(let j=0;j<this.bankTargetCount;j++){
        let jj = randomSeed[j];
        for(let k=0;k<sortSeed.length;k++){
          if(jj == sortSeed[k]){
            targetArr[j] = this.bankTableData[k];
            break;
          }
        }
      }

      let message1 = '';
      let message2 = '';
      for(let i=0;i<this.bankTableData.length;i++){
        let obj = this.bankTableData[i];
        message1 += '[' + obj.label + ']';
      }
      for(let i=0;i<targetArr.length;i++){
        let obj = targetArr[i];
        message2 += '[' + obj.label + ']';
      }

      this.$confirm('从'+message1+'这'+this.bankTableData.length+'个备选机构随机选择'+message2+'这'+this.bankTargetCount+'个检查对象, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '随机选择成功!'
        });

        this.projectTarget = message2;


        setTimeout(() => {
          this.fullscreenLoading = true;
          this.$axios.post("http://localhost:8080/addTarget.action",{
            target:targetArr,
            key:this.projectId
          })
          .then(response=>{
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
                message: '恭喜你，设置检查对象成功',
                type: 'success'
            });
            // this.$router.push('/container/addBranch');
            this.fullscreenLoading = false;
            return;
          })
          .catch(error=>{
            this.$message({
                message: '设置检查对象失败',
                type: 'error'
            });
            this.fullscreenLoading = false;
            return;
          });
          
        }, 2000);

      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '请重新选择检查对象!'
        });          
      });
      return;
    },
    leaderHandleChange(value, direction, movedKeys) {
      this.leaderTableData = [];
      for(let i=0;i<value.length;i++){
        for(let j=0;j<this.worker.length;j++){
          let obj = this.worker[j];
          if(obj.id == value[i]){
            this.leaderTableData.push(obj);
            break;
          }
        }
      }

      this.leaderTableDataLength = this.leaderTableData.length;
    },
    
    checkoutLeader(){
      if(this.leaderTableData.length == 0){
        this.$message({  
            message : '请选择组长！',  
            type : 'warning'  
        })  
        return; 
      }

      if(this.leaderTableDataLength == 0){
        this.$message({  
            message : '请重新设置检查对象随机数量！',  
            type : 'warning'  
        })  
        return; 
      }
      
      if(this.leaderTableDataLength>this.leaderTableData.length){
        this.$message({  
            message : '请重新设置检查对象随机数量！',  
            type : 'warning'  
        })  
        return; 
      }

      let targetArr = [];
      let randomSeed = [];
      let sortSeed = [];
      for(let i=0;i<this.leaderTableData.length;i++){
        let obj = this.leaderTableData[i];
        
        let randomNum = Math.random();
        randomSeed[i] = randomNum;
        sortSeed[i] = randomNum;
      }
      randomSeed = randomSeed.sort();
      randomSeed = randomSeed.reverse();

      for(let j=0;j<this.leaderTargetCount;j++){
        let jj = randomSeed[j];
        for(let k=0;k<sortSeed.length;k++){
          if(jj == sortSeed[k]){
            targetArr[j] = this.leaderTableData[k];
            break;
          }
        }
      }

      let message1 = '';
      let message2 = '';
      for(let i=0;i<this.leaderTableData.length;i++){
        let obj = this.leaderTableData[i];
        message1 += '[' + obj.label + ']';
      }
      for(let i=0;i<targetArr.length;i++){
        let obj = targetArr[i];
        message2 += '[' + obj.label + ']';
      }

      this.$confirm('从'+message1+'这'+this.leaderTableData.length+'个备选人员随机选择'+message2+'这'+this.leaderTargetCount+'个人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '随机选择成功!'
        });

        this.projectLeader = message2;


        setTimeout(() => {
          this.fullscreenLoading = true;
          this.$axios.post("http://localhost:8080/addLeader.action",{
            leader:targetArr,
            key:this.projectId
          })
          .then(response=>{
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
                message: '恭喜你，设置组长成功',
                type: 'success'
            });
            // this.$router.push('/container/addBranch');
            this.fullscreenLoading = false;
            return;
          })
          .catch(error=>{
            this.$message({
                message: '设置组长失败',
                type: 'error'
            });
            this.fullscreenLoading = false;
            return;
          });
          
        }, 2000);

      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '请重新选设置组长!'
        });          
      });
      return;
    },
    masterHandleChange(value, direction, movedKeys) {
      this.masterTableData = [];
      for(let i=0;i<value.length;i++){
        for(let j=0;j<this.worker.length;j++){
          let obj = this.worker[j];
          if(obj.id == value[i]){
            this.masterTableData.push(obj);
            break;
          }
        }
      }

      this.masterTableDataLength = this.masterTableData.length;
    },
    
    checkoutMaster(){
      if(this.masterTableData.length == 0){
        this.$message({  
            message : '请选择主查！',  
            type : 'warning'  
        })  
        return; 
      }

      if(this.masterTableDataLength == 0){
        this.$message({  
            message : '请重新设置主查随机数量！',  
            type : 'warning'  
        })  
        return; 
      }
      
      if(this.masterTableDataLength>this.masterTableData.length){
        this.$message({  
            message : '请重新设置主查随机数量！',  
            type : 'warning'  
        })  
        return; 
      }

      let targetArr = [];
      let randomSeed = [];
      let sortSeed = [];
      for(let i=0;i<this.masterTableData.length;i++){
        let obj = this.masterTableData[i];
        
        let randomNum = Math.random();
        randomSeed[i] = randomNum;
        sortSeed[i] = randomNum;
      }
      randomSeed = randomSeed.sort();
      randomSeed = randomSeed.reverse();

      for(let j=0;j<this.masterTargetCount;j++){
        let jj = randomSeed[j];
        for(let k=0;k<sortSeed.length;k++){
          if(jj == sortSeed[k]){
            targetArr[j] = this.masterTableData[k];
            break;
          }
        }
      }

      let message1 = '';
      let message2 = '';
      for(let i=0;i<this.masterTableData.length;i++){
        let obj = this.masterTableData[i];
        message1 += '[' + obj.label + ']';
      }
      for(let i=0;i<targetArr.length;i++){
        let obj = targetArr[i];
        message2 += '[' + obj.label + ']';
      }

      this.$confirm('从'+message1+'这'+this.masterTableData.length+'个备选人员随机选择'+message2+'这'+this.masterTargetCount+'个人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '随机选择成功!'
        });

        this.projectMaster = message2;


        setTimeout(() => {
          this.fullscreenLoading = true;
          this.$axios.post("http://localhost:8080/addMaster.action",{
            leader:targetArr,
            key:this.projectId
          })
          .then(response=>{
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
                message: '恭喜你，设置主查成功',
                type: 'success'
            });
            // this.$router.push('/container/addBranch');
            this.fullscreenLoading = false;
            return;
          })
          .catch(error=>{
            this.$message({
                message: '设置主查失败',
                type: 'error'
            });
            this.fullscreenLoading = false;
            return;
          });
          
        }, 2000);

      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '请重新选设置主查!'
        });          
      });
      return;
      
    },

    slaverHandleChange(value, direction, movedKeys) {
      this.slaverTableData = [];
      for(let i=0;i<value.length;i++){
        for(let j=0;j<this.worker.length;j++){
          let obj = this.worker[j];
          console.log(obj);
          if(obj.id == value[i]){
            
            this.slaverTableData.push(obj);
            break;
          }
        }
      }
      this.slaverTableDataLength = this.slaverTableData.length;
    },
    checkoutSlaver(){
      if(this.slaverTableData.length == 0){
        this.$message({  
            message : '请选择检查人员！',  
            type : 'warning'  
        })  
        return; 
      }

      if(this.slaverTableDataLength == 0){
        this.$message({  
            message : '请重新设置检查人员随机数量！',  
            type : 'warning'  
        })  
        return; 
      }
      
      if(this.slaverTableDataLength>this.slaverTableData.length){
        this.$message({  
            message : '请重新设置检查人员随机数量！',  
            type : 'warning'  
        })  
        return; 
      }

      let targetArr = [];
      let randomSeed = [];
      let sortSeed = [];
      for(let i=0;i<this.slaverTableData.length;i++){
        let obj = this.slaverTableData[i];
        
        let randomNum = Math.random();
        randomSeed[i] = randomNum;
        sortSeed[i] = randomNum;
      }
      randomSeed = randomSeed.sort();
      randomSeed = randomSeed.reverse();

      for(let j=0;j<this.slaverTargetCount;j++){
        let jj = randomSeed[j];
        for(let k=0;k<sortSeed.length;k++){
          if(jj == sortSeed[k]){
            targetArr[j] = this.slaverTableData[k];
            break;
          }
        }
      }

      let message1 = '';
      let message2 = '';
      for(let i=0;i<this.slaverTableData.length;i++){
        let obj = this.slaverTableData[i];
        message1 += '[' + obj.label + ']';
      }
      for(let i=0;i<targetArr.length;i++){
        let obj = targetArr[i];
        message2 += '[' + obj.label + ']';
      }

      this.$confirm('从'+message1+'这'+this.slaverTableData.length+'个备选人员随机选择'+message2+'这'+this.slaverTargetCount+'个人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '随机选择成功!'
        });

        this.projectSlaver = message2;


        setTimeout(() => {
          this.fullscreenLoading = true;
          this.$axios.post("http://localhost:8080/addSlaver.action",{
            leader:targetArr,
            key:this.projectId
          })
          .then(response=>{
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
                message: '恭喜你，设置检查人员成功',
                type: 'success'
            });
            // this.$router.push('/container/addBranch');
            this.fullscreenLoading = false;
            return;
          })
          .catch(error=>{
            this.$message({
                message: '设置检查人员失败',
                type: 'error'
            });
            this.fullscreenLoading = false;
            return;
          });
          
        }, 2000);

      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '请重新选设置检查人员!'
        });          
      });
      return;



    }
  },
  mounted:function(){
    let projectObj = JSON.parse(sessionStorage.getItem('worker'));

    this.projectName = projectObj.name;
    this.projectDesc = projectObj.des;
    this.projectDate = projectObj.date;
    this.showTransfer1();
    this.bankData = projectObj.bankData;
    this.projectId = projectObj.projectId;
    this.worker=projectObj.worker;
    this.options=JSON.parse(sessionStorage.getItem('options'))
  }
    
}
</script>

<style scoped>
.content {
  background-color: #f9fafc;
  /* border-right: 1px solid #c0ccda; */
}

.totalDiv{
  background-color: #FFF;
  padding: 15px;
  border-bottom: 1px solid #d3dce6;
}
.div-btn{
  margin-top: 10px;
  align-content: center;
}
/* .el-row{
  width: 89%;
  float:right;
} */

.tree-class{
  width: 529px;
  height: 303px;
  border: 1px solid hsl(20, 33%, 98%);
  scroll-behavior: auto;
  overflow: auto
}
</style>


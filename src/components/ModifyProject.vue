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
                <el-input v-model="projectTarget" :readonly="true" @mouseover.native="showTransfer1" @click.native="dialogTableVisible=true">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="组长" >
                <el-input v-model="projectLeader" :readonly="true" @mouseover.native="showTransfer2">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="主查" >
                <el-input v-model="projectMaster" :readonly="true" @mouseover.native="showTransfer3">
                </el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="100px">
              <el-form-item label="检查人员" >
                <el-input v-model="projectSlaver" :readonly="true" @mouseover.native="showTransfer4">
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
              <!-- <el-transfer
                filterable
                :filter-method="filterMethod"
                :titles="['资源库', '备选项']"
                filter-placeholder="请输入机构拼音"
                v-model="bankSelected"
                height="150"
                size="small"
                @change="bankHandleChange"
                :data="bankAll">
              </el-transfer> -->



              <el-dialog title="检查对象" :visible.sync="dialogTableVisible" @close="bankHandleChange">
                <el-tree
                  :data="bankData"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  >
                </el-tree>
              </el-dialog> 


              <el-table :data="bankTableData" height="400" size="small">
                <el-table-column prop="master" label="类别" width="80">
                </el-table-column>
                <el-table-column prop="slaver" label="行名" width="120">
                </el-table-column>
                <el-table-column prop="type" label="简称" width="120">
                </el-table-column>
                <el-table-column prop="id" label="编号" width="80">
                </el-table-column>
                <el-table-column prop="right"
                  fixed="right"
                  label="权重"
                  >
                  <template  slot-scope="scope">
                    <el-select v-model="scope.row.right" placeholder="请选择" size="small" @click.native="handleClick(scope.row)" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
              <div class="totalDiv" > 
                <small>数量：</small>{{bankTableData.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" v-model="bankTargetCount" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>
              </div>
              <div class="div-btn">
                <!-- <el-button type="success" @click="checkoutBank()">随机</el-button> -->
                <el-button type="success" @click="checkoutBank">随机</el-button>
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
                <el-table-column prop="section" label="处室" width="120">
                </el-table-column>
                <el-table-column prop="post" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长">
                </el-table-column>
              </el-table>
              <div class="totalDiv" > 
                <small>数量：</small>{{leaderSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutLeader()">确认</el-button>
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
                <small>数量：</small>{{masterSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>
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
                <small>数量：</small>{{slaverSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutSlaver()">确认</el-button>
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
    const bankData = _ => {
        const bankAll = [];
        const cities = ['中国工商银行', '招商银行', '中国农业银行', '中国建设银行', '中信银行', '中国银行', '华夏银行'];
        const pinyin = ['gongshang', 'zhaoshang', 'nongye', 'jianshe', 'zhongxin', 'zhongguo', 'huaxia'];
        cities.forEach((city, index) => {
          bankAll.push({
            label: city,
            key: pinyin[index],
            pinyin: pinyin[index],
            right:''
          });
        });
        return bankAll;
      };
    // const workData =_=>{
    //   const worker = [];
    //     const workers = ['肖军', '黄建', '玉珍', '王芳', '汪洋', '高阳', '秦虹'];
    //     const pinyin = ['xiaojun', 'huangjian', 'yuzhen', 'wangfang', 'wangyang', 'gaoyang', 'qinhong'];
    //     const specialty = ['zookper','dubbo','kafka','redis','mongodb','docker','maven'];
    //     const post = ['处长','科长','局长','科员','处长','部长','局长'];
    //     workers.forEach((worker, index) => {
    //       worker.push({
    //         label: worker,
    //         name:worker,
    //         post:post[index],
    //         key: pinyin[index],
    //         pinyin: pinyin[index],
    //         specialty:specialty[index],
    //         right:''
    //       });
    //     });
    //     return worker;
    // }
      
    return {
      options:store.state.options,
      worker:store.state.worker,
      projectName: '',
      projectDesc: '',
      projectDate:'',
      projectTarget:'',
      projectLeader:'',
      projectMaster:'',
      projectSlaver:'',
      input11:'',
      input12:'',
      bankAll: bankData(),
      // workerAll:workData(),
      bankSelected: [],
      leaderSelected: [],
      masterSelected: [],
      slaverSelected: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      bankTableData:[],
      leaderTableData:[],
      masterTableData:[],
      slaverTableData:[],
      // tableData: [{
      //     id: '100001',
      //     name: '张三',
      //     post: '科长',
      //     specialty: 'Java',
      //     right:''
      //   }, {
      //     id: '100002',
      //     name: '李四',
      //     post: '股长',
      //     specialty: 'zookeeper',
      //     right:''
      //   }
      //   ],
        value:'',
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        bankData: [{
          id: 100000,
          label: '国有',
          children: [{
            id: 100001,
            label: '中国工商银行',
            type:'分行'
          },{
            id: 100002,
            label: '农业银行',
            type:'法人'
          },{
            id: 100003,
            label: '中国银行',
            type:'分公司'
          },{
            id: 100004,
            label: '建设银行',
            type:'卡中心'
          },{
            id: 100005,
            label: '交通银行',
            type:'业务中心'
          }]
        },
        {
          id: 110000,
          label: '邮储',
          children: [{
            id: 110001,
            label: '邮储银行北京分行',
            type:'业务中心'
          },{
            id: 110002,
            label: '邮储银行天津分行',
            type:'法人'
          },{
            id: 110003,
            label: '邮储银行上海分行',
            type:'分公司'
          }]
        },{
          id: 120000,
          label: '政策性',
          children: [{
            id: 120001,
            label: '中国进出口银行',
            type:'分公司'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        bankTargetCount:0
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
      // alert("1111");
        
        let arr = this.$refs.tree.getCheckedKeys();
        this.bankTableData = [];
        for(let i=0;i<this.bankData.length;i++){
          let level1 = this.bankData[i];
          for(let j=0;j<level1.children.length;j++){
            let level2 = level1.children[j];
            if(level2 != undefined){
              for(let l=0;l<arr.length;l++){
                if(arr[l] == level2.id){
                    let data = {
                      master:level1.label,
                      slaver:level2.label,
                      type:level2.type,
                      id:level2.id,
                      right:''
                    }
                    this.bankTableData.push(data);
                    break;
                }
              }
            }
          }
        }

        this.showTransfer1();
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
      },
      showRender(){
      },
      handleClick(row) {
        console.log(row);
        console.log(row.id);
        console.log(row.name);
      },
      checkoutBank(){
        if(this.bankTableData.length == 0){
          this.$message({  
              message : '请选择机构！',  
              type : 'warning'  
          })  
          return; 
        }
        let source = [];
        let target = [];
        for(let i=0;i<this.bankTableData.length;i++){
          let obj = this.bankTableData[i];
          source += "["+obj.slaver+"]";
        }
//todo 从source随机选择对应数量的机构
        target = source;

        this.$confirm('从'+source+'这'+this.bankTableData.length+'个备选机构随机选择'+target+'这'+this.bankTargetCount+'个检查对象, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '随机选择成功!'
          });

          this.projectTarget = source;
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '请重新选择检查对象!'
          });          
        });





      },
      checkoutLeader(){
        if(this.leaderTableData.length == 0){
          this.$message({  
              message : '请选择组长！',  
              type : 'warning'  
          })  
          return; 
        }
        this.projectLeader = '';
        for(let i=0;i<this.leaderTableData.length;i++){
          let obj = this.leaderTableData[i];
          this.projectLeader += "["+obj.label+"]";
        }
      },
      checkoutMaster(){
        if(this.masterTableData.length == 0){
          this.$message({  
              message : '请选择主查人员！',  
              type : 'warning'  
          })  
          return; 
        }
        this.projectMaster = '';
        for(let i=0;i<this.masterTableData.length;i++){
          let obj = this.masterTableData[i];
          this.projectMaster += "["+obj.label+"]";
        }
      },
      checkoutSlaver(){
        if(this.slaverTableData.length == 0){
          this.$message({  
              message : '请选择检查人员！',  
              type : 'warning'  
          })  
          return; 
        }
        this.projectSlaver = '';
        for(let i=0;i<this.slaverTableData.length;i++){
          let obj = this.slaverTableData[i];
          this.projectSlaver += "["+obj.label+"]";
        }
      }
  },
  mounted:function(){
    this.projectName = this.$route.params.projectName;
    this.projectDesc = this.$route.params.projectDesc;
    this.projectDate = this.$route.params.projectDate;
    this.showTransfer1();
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
</style>


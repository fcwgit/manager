<template>
<div>
    <!-- Hello AwesomePos Demo. -->
    <el-row>
      <el-col :span='13' class="content">
        <el-tabs style="padding:5px"> 
          <el-tab-pane label="项目信息">
            <el-form label-width="120px" class="demo-ruleForm">
              <el-form-item label="检查项目名称" >
                <el-input v-model="projectName" :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="检查项目描述" >
                <!-- <el-input v-model="projectDesc" :disabled="true">
                </el-input> -->
                <el-input type="textarea" :rows="6" :disabled="true" v-model="projectDesc">
                </el-input>
              </el-form-item>
              <el-form-item label="检查年份" >
                <el-input v-model="projectDate" :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="检查对象" >
                <el-input v-model="projectTarget" :readonly="true" @click.native="dialogTableVisible=true">
                </el-input>
              </el-form-item>
              <el-form-item label="组长" >
                <el-input v-model="projectLeader" :readonly="true" @click.native="showTransfer2">
                </el-input>
              </el-form-item>
              <el-form-item label="主查" >
                <el-input v-model="projectMaster" :readonly="true" @click.native="showTransfer3">
                </el-input>
              </el-form-item>
              <el-form-item label="检查人员" >
                <el-input v-model="projectSlaver" :readonly="true" @click.native="showTransfer4">
                </el-input>
              </el-form-item>
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
      <el-col :span="11">
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
                  :data="data2"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  v-model="bankSelected"
                  >
                </el-tree>
              </el-dialog> 


              <el-table :data="bankTableData" height="400" size="small">
                <el-table-column prop="type" label="类别" width="80">
                </el-table-column>
                <el-table-column prop="master" label="行名" width="120">
                </el-table-column>
                <el-table-column prop="alias" label="简称" width="120">
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
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>
              </div>
              <div class="div-btn">
                <el-button type="success" @click="checkoutBank()">随机</el-button>
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
                :data="workerAll">
              </el-transfer>
              <el-table :data="leaderTableData" height="250" size="small">
                <el-table-column prop="pinyin" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="label" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长" width="120">
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
                <small>数量：</small>{{leaderSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>>
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
                :data="workerAll">
              </el-transfer>
              <el-table :data="masterTableData" height="250" size="small">
                <el-table-column prop="pinyin" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="label" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长" width="120">
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
                <small>数量：</small>{{masterSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>>
              </div>
              <div class="div-btn" center>
                <el-button type="success" @click="checkoutMaster()">确认</el-button>
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
                :data="workerAll">
              </el-transfer>
              <el-table :data="slaverTableData" height="250" size="small">
                <el-table-column prop="pinyin" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="label" label="职务" width="120">
                </el-table-column>
                <el-table-column prop="specialty" label="专长" width="120">
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
                <small>数量：</small>{{slaverSelected.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <small>数量：</small><input maxlength="3" style=”width:5px;” onkeyup="value=value.replace(/[^\d]/g,'')"/>>
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
    const workData =_=>{
      const workerAll = [];
        const workers = ['肖军', '黄建', '玉珍', '王芳', '汪洋', '高阳', '秦虹'];
        const pinyin = ['xiaojun', 'huangjian', 'yuzhen', 'wangfang', 'wangyang', 'gaoyang', 'qinhong'];
        const specialty = ['zookper','dubbo','kafka','redis','mongodb','docker'];
        workers.forEach((worker, index) => {
          workerAll.push({
            label: worker,
            key: pinyin[index],
            pinyin: pinyin[index],
            specialty:specialty[index],
            right:''
          });
        });
        return workerAll;
    }
      
    return {
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
      workerAll:workData(),
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
      tableData: [{
          id: '100001',
          name: '张三',
          post: '科长',
          specialty: 'Java',
          right:''
        }, {
          id: '100002',
          name: '李四',
          post: '股长',
          specialty: 'zookeeper',
          right:''
        }
        ],
        options: [{
          value: 1,
          label: '低级'
        }, {
          value: 2,
          label: '中级'
        }, {
          value: 3,
          label: '高级'
        }],
        value:'',
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        data2: [{
          id: 1,
          label: '国有',
          children: [{
            id: 4,
            label: '中国工商银行',
            children: [{
              id: 9,
              label: '北京分行',
              alias:'工行北京分行'
            }, {
              id: 10,
              label: '天津分行',
              alias:'工行天津分行'
            }, {
              id: 11,
              label: '山东分行',
              alias:'工行山东分行'
            }, {
              id: 12,
              label: '上海分行',
              alias:'工行上海分行'
            }, {
              id: 13,
              label: '河北分行',
              alias:'工行河北分行'
            }, {
              id: 14,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 15,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 16,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 17,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 18,
              label: '重庆分行',
              alias:'工行重庆分行'
            }]
          }]
        },
        {
          id: 2,
          label: '邮储',
          children: [{
            id: 4,
            label: '中国工商银行',
            children: [{
              id: 9,
              label: '北京分行',
              alias:'工行北京分行'
            }, {
              id: 10,
              label: '天津分行',
              alias:'工行天津分行'
            }, {
              id: 11,
              label: '山东分行',
              alias:'工行山东分行'
            }, {
              id: 12,
              label: '上海分行',
              alias:'工行上海分行'
            }, {
              id: 13,
              label: '河北分行',
              alias:'工行河北分行'
            }, {
              id: 14,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 15,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 16,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 17,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 18,
              label: '重庆分行',
              alias:'工行重庆分行'
            }]
          }]
        },{
          id: 3,
          label: '政策性',
          children: [{
            id: 4,
            label: '中国工商银行',
            children: [{
              id: 9,
              label: '北京分行',
              alias:'工行北京分行'
            }, {
              id: 10,
              label: '天津分行',
              alias:'工行天津分行'
            }, {
              id: 11,
              label: '山东分行',
              alias:'工行山东分行'
            }, {
              id: 12,
              label: '上海分行',
              alias:'工行上海分行'
            }, {
              id: 13,
              label: '河北分行',
              alias:'工行河北分行'
            }, {
              id: 14,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 15,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 16,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 17,
              label: '重庆分行',
              alias:'工行重庆分行'
            }, {
              id: 18,
              label: '重庆分行',
              alias:'工行重庆分行'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px'
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
    bankHandleChange(value, direction, movedKeys) {
        // this.bankTableData = [];
        // for(let i=0;i<value.length;i++){
        //     for(let j=0;j<this.bankAll.length;j++){
        //       let obj = this.bankAll[j];
        //       if(obj.pinyin == value[i]){
        //         this.bankTableData.push(obj);
        //         break;
        //       }
        //     }
        //   }
        this.showTransfer1();
        let arr = this.$refs.tree.getCheckedKeys();
        // console.log(arr);
        // console.log("==============");
        // console.log(this.bankSelected);
        this.bankTableData = [];
        for(let i=0;i<this.data2.length;i++){
          let level1 = this.data2[i];
          for(let j=0;j<level1.children.length;j++){
            let level2 = level1.children[j];

            if(level2.children.length==0){
              for(let l=0;l<arr.length;l++){
                if(arr[l] == level2.id){
                    let data = {
                      type:level1.label,
                      master:level2.label,
                      slaver:level2.label,
                      alias:level2.alias,
                      id:level2.id,
                      right:''
                    }
                    this.bankTableData.push(data);
                    break;
                }
              }
            }
            for(let k=0;k<level2.children.length;k++){
              let level3 = level2.children[k];
              console.log("id="+level3.id);
              for(let l=0;l<arr.length;l++){
                if(arr[l] == level3.id){

                  let data = {
                    type:level1.label,
                    master:level2.label,
                    slaver:level3.label,
                    alias:level3.alias,
                    id:level3.id,
                    right:''
                  }
                  this.bankTableData.push(data);
                  break;
                }
              }
            }
          }
        }
      },
      leaderHandleChange(value, direction, movedKeys) {
        this.leaderTableData = [];
        for(let i=0;i<value.length;i++){
            for(let j=0;j<this.workerAll.length;j++){
              let obj = this.workerAll[j];
              if(obj.pinyin == value[i]){
                this.leaderTableData.push(obj);
                break;
              }
            }
          }
      },
      masterHandleChange(value, direction, movedKeys) {
        this.masterTableData = [];
        for(let i=0;i<value.length;i++){
            for(let j=0;j<this.workerAll.length;j++){
              let obj = this.workerAll[j];
              if(obj.pinyin == value[i]){
                this.masterTableData.push(obj);
                break;
              }
            }
          }
      },
      slaverHandleChange(value, direction, movedKeys) {
        this.slaverTableData = [];
        for(let i=0;i<value.length;i++){
            for(let j=0;j<this.workerAll.length;j++){
              let obj = this.workerAll[j];
              if(obj.pinyin == value[i]){
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
        this.projectTarget = '';
        for(let i=0;i<this.bankTableData.length;i++){
          let obj = this.bankTableData[i];
          this.projectTarget += "["+obj.alias+"]";
        }
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


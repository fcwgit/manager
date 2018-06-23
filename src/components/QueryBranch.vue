<template>
  <div>
    <el-row>
      <el-col :span='6' style="border:1px solid #d3dce6">
        <el-tree
          :data="bankData"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all
          :props="defaultProps"
          @check-change="handleClick"
          >
        </el-tree>
      </el-col>
      <el-col :span='18'>
        <el-table :data="bankTableData" height="400" size="small">
          <el-table-column prop="time" label="添加日期" width="80" v-if="false">
          </el-table-column>
          <el-table-column prop="id" label="行名" width="120" v-if="false">
          </el-table-column>
          <el-table-column prop="label" label="名称" width="150">
          </el-table-column>
          <el-table-column prop="num" label="机构编号" width="120">
          </el-table-column>
          <el-table-column prop="master" label="一级类别" width="80">
          </el-table-column>
          <el-table-column prop="slaver" label="二级类别" width="80">
          </el-table-column>
          
          <el-table-column prop="state" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="author" label="添加者" width="80">
          </el-table-column>
          <el-table-column prop="right"
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button @click="detailClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="modifyClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style>

</style>


<script>
  export default {
    methods: {
      handleClick(data,checked, node) {
        // console.log("=======");
        // console.log(data);
        // console.log(checked);
        // console.log(node);
        // console.log("=======");
        // console.log(this.$refs.tree.getCheckedNodes(true));
        // console.log(this.$refs.tree.getCheckedKeys());
        this.bankTableData = this.$refs.tree.getCheckedNodes(true);
      //  console.log
      },
      detailClick(row) {
        console.log(row);
        // this.$router.push('/container/detailBranch');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/container/modifyBranch');
      }
    },
    data() {
      return {
        bankData: [],
        bankTableData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    mounted:function(){
      setTimeout(() => {
        this.$axios.post("http://localhost:8080/queryMasterSlaver.action")
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
              message: '查询对象列表成功',
              type: 'success'
          });
          this.bankData=response.data.body.bankData;
          return;
        })
        .catch(error=>{
          this.$message({
              message: '查询对象列表失败',
              type: 'error'
          });
          return;
        });
      }, 2000);
    }
  }
</script>
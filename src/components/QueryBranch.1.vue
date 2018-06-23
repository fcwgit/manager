<template>
  <div>
    <el-tabs style="padding:5px">
      <el-tab-pane label="检查对象">
        <div class="tree-class">
          <el-tree
            :data="bankData"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            
            >
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.tree-class{
  width: 500px;
  height: 200px;
  border: 1px solid #f34b08;
  scroll-behavior: auto;
  overflow: auto
}
</style>


<script>
  export default {
    methods: {
      detailClick(row) {
        console.log(row);
        this.$router.push('/container/detailBranch');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/container/modifyBranch');
      }
    },
    data() {
      return {
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
      }
    }
  }
</script>
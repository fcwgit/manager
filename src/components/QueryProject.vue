<template>
  <el-table
    :data="tableData3"
    style="width:80%"
    height="800">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="项目名称"
      width="300" style="text-overflow:ellipsis">
    </el-table-column>
    <!-- <el-table-column
      prop="province"
      label="项目描述"
      width="300">
    </el-table-column> -->
    <el-table-column
      prop="city"
      label="检查对象"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="组长"
      width="200">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="主查"
      width="200">
    </el-table-column>
    <el-table-column
      prop="worker"
      label="检查人员"
      width="200">
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
</template>

<script>
  export default {
    methods: {
      detailClick(row) {
        console.log(row);
        this.$router.push('/container/detailProject');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/container/modifyProject');
      }
    },
    data() {
      return {
        tableData3: [{
          date: '2018-05-03',
          name: '深化整治银行业市场乱象的检查',
          province: '深化整治银行业市场乱象的检查',
          city: '中国银行、农业银行',
          address: '张三',
          zip: 'zhangsan',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-02',
          name: '深化整治银行业运维系统的检查',
          province: '深化整治银行业运维系统的检查',
          city: '上海银行、青岛银行',
          address: 'lisi',
          zip: 'lisi',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-04',
          name: '关于商业银行账户清理的检查',
          province: '关于商业银行账户清理的检查',
          city: '浙商银行、齐鲁银行',
          address: 'zhaoliu',
          zip: '赵六',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-01',
          name: '关于商业银行消防安全清理的检查',
          province: '关于商业银行消防安全清理的检查',
          city: '渤海银行、晋商银行',
          address: 'wangwu',
          zip: '王五',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-08',
          name: '关于商业银行涉密信息清理的检查',
          province: '关于商业银行涉密信息清理的检查',
          city: '工商银行、交通银行',
          address: 'zhaoliu',
          zip: '赵六',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-06',
          name: '关于商业银行服务质量的检查',
          province: '关于商业银行服务质量的检查',
          city: '天津商行、农业银行',
          address: 'wangwu',
          zip: '王五',
          worker:'张三、李四、王五'
        }, {
          date: '2018-05-07',
          name: '关于商业银行资金安全的检查',
          province: '关于商业银行资金安全的检查',
          city: '中信银行、浦发银行',
          address: 'lisi',
          zip: '李四',
          worker:'张三、李四、王五'
        }]
      }
    }
  }
</script>
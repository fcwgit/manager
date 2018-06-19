<template>
  <el-table
    :data="tableData3"
    style="width:98%"
    height="800">
    <el-table-column
      prop="date"
      label="添加日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="机构名称"
      width="300" style="text-overflow:ellipsis">
    </el-table-column>
    <el-table-column
      prop="pinyin"
      label="机构拼音"
      width="100">
    </el-table-column>
    <el-table-column
      prop="id"
      label="机构编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="author"
      label="添加人"
      width="100">
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
        this.$router.push('/container/detailBranch');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/container/modifyBranch');
      }
    },
    data() {
      return {
        tableData3: [{
          date: '2018-05-03',
          name: '中国工商银行',
          pinyin: 'gongshang',
          id: '100000000001',
          author: '张三'
        }, {
          date: '2018-05-03',
          name: '招商银行',
          pinyin: 'zhaoshang',
          id: '100000000002',
          author: '李四'
        }, {
          date: '2018-05-03',
          name: '中国农业银行',
          pinyin: 'nongye',
          id: '100000000003',
          author: '王五'
        }, {
          date: '2018-05-03',
          name: '中国建设银行',
          pinyin: 'jianshe',
          id: '100000000004',
          author: '赵六'
        }, {
          date: '2018-05-03',
          name: '中信银行',
          pinyin: 'zhongxin',
          id: '100000000005',
          author: '孙七'
        }, {
          date: '2018-05-03',
          name: '中国银行',
          pinyin: 'zhongguo',
          id: '100000000006',
          author: '周八'
        }, {
          date: '2018-05-03',
          name: '华夏银行',
          pinyin: 'huaxia',
          id: '100000000007',
          author: '吴九'
        }]
      }
    }
  }
</script>
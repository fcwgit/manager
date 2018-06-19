<template>
<div>
      <el-table
        :data="tableData3"
        style="width:80%"
        >
        <el-table-column
          prop="date"
          label="添加日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="300" style="text-overflow:ellipsis">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="post"
          label="职务"
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
      }
    },
    data() {
      return {
        tableData3: [{
          date: '2018-05-03',
          name: '张三',
          mobile: '13425676567',
          post: '100000000001',
          author: '李四'
        }, {
          date: '2018-05-03',
          name: '李四',
          mobile: '13425676567',
          post: '100000000002',
          author: '张三'
        }, {
          date: '2018-05-03',
          name: '王五',
          mobile: '13876567890',
          post: '13425676543',
          author: '张三'
        }, {
          date: '2018-05-03',
          name: '赵六',
          mobile: '13987654543',
          post: '100000000004',
          author: '李四'
        }, {
          date: '2018-05-03',
          name: '孙七',
          mobile: '17787676543',
          post: '100000000005',
          author: '张三'
        }, {
          date: '2018-05-03',
          name: '周八',
          mobile: '15987658763',
          post: '100000000006',
          author: '李四'
        }, {
          date: '2018-05-03',
          name: '吴九',
          mobile: '13876548374',
          post: '100000000007',
          author: '张三'
        }]
      }
    }
  }
</script>
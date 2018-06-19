<template>

  <div style="width:89%;float:right">
    <div style="display:none" id="result">
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
        
      </el-table>
    </div>
    <div>
      <!-- <template slot-scope="scope"> -->
        <div style="width:100px;float:left">
          <el-button type="primary" size="small" ><a style="text-decoration:none;visited:none" href="http://download.bjrcb.com/mbs/bjrcb_1.1.1.apk" download>下载模板</a></el-button>
        </div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="fileHandleChange"
          :file-list="fileList3">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
  export default {
    components:{
      leftNav
    },
    methods: {
      detailClick(row) {
        console.log(row);
        this.$router.push('/detailUser');
      },
      modifyClick(row) {
        console.log(row);
        this.$router.push('/modifyUser');
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      fileHandleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
        document.getElementById("result").style.display="block";
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
        }],
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    }
  }
</script>
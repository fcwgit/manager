<template>
  <el-container style=" border: 1px solid #eee" id="home">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu 
        router 
        :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>检查项目管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/createProject" >新建检查项目</el-menu-item>
            <el-menu-item index="/container/queryProject">管理检查项目</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>检查机构库管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">管理检查机构库</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>检查人员管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">管理检查人员库</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-service"></i>系统用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="4-1">新建用户</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="4-2">修改用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px;">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item> -->
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      
      <el-main>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table> -->
        <router-view/>

      </el-main>
    </el-container>
   
  
  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    /* background:url('../assets/1111.jpg'); */
    color: #333;
    line-height: 60px;
    margin-right: 10px;
  }
  
  .el-aside {
    color: #333;
  }

  .el-main{
    padding:0px;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      // createProject(){
      //   // this.$router.push();
      //   // alert('232323');
      //   this.$router.push("/createProject");
      // },
      handleCommand(command) {
        this.$message('退出登录 ');
        this.$router.push("/");
      }
    },

    mounted(){
      let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if(h<950){
        h = 950;
      }
      document.getElementById("home").style.width = w + 'px';
      document.getElementById("home").style.height = h + 'px';
    }
  };
</script>
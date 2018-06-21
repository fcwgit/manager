<template>
  <el-container style=" border: 1px solid #eee" id="home">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu 
        router 
        :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>修改密码</template>
          <el-menu-item-group>
            <el-menu-item index="/container/createProject" >修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px;height=167px;">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item>-->
            <el-dropdown-item>修改密码</el-dropdown-item> 
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>chaoji</span>
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
  #header{
    height: 167px;
  }
  .el-header {
    background-color: #B3C0D1;
    background:url('../assets/header.png') ;
    background-size:100%;
    -moz-background-size:100%;
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
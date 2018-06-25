<template>
  <el-container style=" border: 1px solid #eee" id="home">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu 
        router 
        :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-document"></i>随机抽查事项清单</template>
          <el-menu-item-group>
            <el-menu-item index="/container/document" >随机抽查事项清单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-time"></i>检查项目管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/createProject" >新建检查项目</el-menu-item>
            <el-menu-item index="/container/queryProject">管理检查项目</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>检查机构库管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/queryBranch">管理检查机构库</el-menu-item>
            <el-menu-item index="/container/addBranch">新增检查机构</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>检查人员管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/queryUser">管理检查人员库</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-service"></i>系统用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/queryManager">管理系统用户</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
            <el-menu-item index="4-2">修改用户</el-menu-item>
          </el-menu-item-group> -->
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px;height=167px;">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item>-->
            <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item> 
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{managerAlias}}</span>
      </el-header>
      
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        

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
import store from '@/vuex/store';
  export default {
    data() {
      return {
        managerAlias:store.state.alias,
        managerName:store.state.name,
      }
    },
    methods:{
      // createProject(){
      //   // this.$router.push();
      //   // alert('232323');
      //   this.$router.push("/createProject");
      // },
      handleCommand(command) {
        
        if(command == 'logout'){
          this.$message('退出登录 ');
          this.$router.push("/");
        }

        if(command == 'modifyPassword'){
          alert(111);
        }
        
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

      store.commit('initAlias',sessionStorage.getItem('alias'));
      this.managerAlias=sessionStorage.getItem('alias');
      store.commit('initName',sessionStorage.getItem('name'));
      store.commit('initOptions',JSON.parse(sessionStorage.getItem('options')));
      // store.commit('initWorker',JSON.parse(sessionStorage.getItem('worker')));
      store.commit('initManagerType',JSON.parse(sessionStorage.getItem('managerType')));
      store.commit('initPageSize',sessionStorage.getItem('pageSize'));
      store.commit('initBranchMasterType',JSON.parse(sessionStorage.getItem('branchMasterType')));
      store.commit('initBranchSlaverType',JSON.parse(sessionStorage.getItem('branchSlaverType')));
      store.commit('setIsLogin',sessionStorage.getItem('isLogin'));
    }
  };
</script>
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
        <el-submenu index="3" v-if=role>
          <template slot="title"><i class="el-icon-menu"></i>检查机构库管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/queryBranch">管理检查机构库</el-menu-item>
            <el-menu-item index="/container/addBranch">新增检查机构</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-if=role>
          <template slot="title"><i class="el-icon-setting"></i>检查人员管理</template>
          <el-menu-item-group>
            <el-menu-item index="/container/queryUser">管理检查人员库</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if=role>
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
      <el-header class="header-image">
        <div style="float:left;height:60px;width:300px;">
          <h3 class="h3-left">北京银监局现场检查</h3>
          <h3 class="h3-right">“双随机一公开”程序</h3>
        </div>
        
        <el-dropdown @command="handleCommand" style="padding-top:20px">
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
  .h3-left{
    line-height:30px;
    margin:0px;
    text-align: left;
    font-family:Tahoma,Helvetica,Arial,'宋体',sans-serif;
  }
  .h3-right{
    line-height:30px;
    margin:0px;
    text-align: right;
    font-family:Tahoma,Helvetica,Arial,'宋体',sans-serif;

  }
  
  .header-image{
    text-align: right; 
    font-size: 16px;
    /* background-repeat:no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%; */
    /* height: 60px; */
    /* background-color: aqua; */
    background: -webkit-linear-gradient(#56ace8, #cae5f7); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#56ace8, #cae5f7); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#56ace8, #cae5f7); /* Firefox 3.6 - 15 */
    background: linear-gradient(#56ace8, #cae5f7); /* 标准的语法 */
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
        role:false
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
          this.$router.push("/container/initPassword");
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
      if(sessionStorage.getItem('role') == 'false'){
        this.role = false;
      }else{
        this.role = true;
      }
    }
  };
</script>
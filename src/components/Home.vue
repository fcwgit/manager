<template>
<div>
  
  <div>
    <ul style="list-style-type:none;list-style-type:decimal;text-align:left;margin-left:150px">
      <li>
        <router-link to="/container/document">随机抽查事项清单</router-link>
      </li>
      <li>
        <router-link to="/container/createProject">新建检查项目</router-link>
      </li>
      <li>
        <router-link to="/container/queryProject">管理检查项目</router-link>
      </li>
      <li v-if=role>
        <router-link to="/container/queryBranch">管理检查机构库</router-link>
      </li>
      <li v-if=role>
        <router-link to="/container/addBranch">新增检查机构</router-link>
      </li>
      <li v-if=role>
        <router-link to="/container/queryUser">管理检查人员库</router-link>
      </li>
      <li v-if=role>
        <router-link to="/container/queryManager">管理系统用户</router-link>
      </li>
    </ul>
  </div>
  
</div>
</template>

<script>
export default {
  name: 'Home',
 
  data () {
    return {
      role:false
    }
  },
  mounted(){
    console.log(sessionStorage.getItem('role') == 'false');
    if(sessionStorage.getItem('role') == 'false'){
        this.role = false;
      }else{
        this.role = true;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* li{
  list-style-type: none;
} */
div{
  text-align: center;
}  
span{
  text-align: left;
  font-size: 20px;
  display: inline-block;
  vertical-align: middle;
  width:80%;
  text-indent:2em;
} 

.content{ 
  margin: 0;
  width: 89%;
  height: 100%;
  overflow: hidden;

}

.listBox {  
      margin-top:20%;  
      margin-left:40%;
  } 
</style>

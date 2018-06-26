<template>
<div>
  
  <div>
    <ul style="list-style-type:none;text-align:left;margin-left:150px">
      <li>
        <router-link to="/container/document">1、随机抽查事项清单</router-link>
      </li>
      <li>
        <router-link to="/container/createProject">2、新建检查项目</router-link>
      </li>
      <li>
        <router-link to="/container/queryProject">3、管理检查项目</router-link>
      </li>
      <li>
        <router-link to="/container/queryBranch">4、管理检查机构库</router-link>
      </li>
      <li>
        <router-link to="/container/addBranch">5、新增检查机构</router-link>
      </li>
      <li>
        <router-link to="/container/queryUser">6、管理检查人员库</router-link>
      </li>
      <li>
        <router-link to="/container/queryManager">7、管理系统用户</router-link>
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

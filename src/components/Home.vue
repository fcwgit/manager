<template>
<div>
  
  <div>
    <ul style="list-style-type:none;text-align:left;margin-left:150px">
      <li>
        <router-link to="/createProject">1、事项清单</router-link>
      </li>
      <li>
        <router-link to="/createProject">2、检查对象库</router-link>
      </li>
      <li>
        <router-link to="/createProject">3、检查人员库</router-link>
      </li>
      <li>
        <router-link to="/createProject">4、检查项目</router-link>
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

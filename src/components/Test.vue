<template>
<div>
  <el-row style="text-align:center;">
    <el-input
      style="width:90%;margin-top:50px"
      class="input-class"
      type="textarea"
      :rows="12"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  </el-row>
  <el-row style="text-align:center">
    <el-button type="primary" icon="el-icon-edit" v-if=role></el-button>
  </el-row>
</div>
</template>

<style>

</style>

<script>
  export default {
    data() {
      return {
        role:false,
        textarea: '中国银监会系统在全国有四级组织机构，其中：银监会机关在北京市金融街，内设27个部门。除会机关外，银监会在31个省（自治区、直辖市）的省会城市以及大连、宁波、厦门、青岛、深圳等5个计划单列市设有36家银监局，在全国306个地区（地级市、自治州、盟）设有银监分局，在全国1730个县（县级市、自治县、旗、自治旗）设有监管办事处，基本覆盖了全国各层级行政区域，全系统参照公务员法管理。'
      }
    },
    mounted:function(){
      if(sessionStorage.getItem('role') == 'false'){
        this.role = false;
      }else{
        this.role = true;
      }
    },
    methods:{
      exportExcel(){
        var myurl="${context}/assetInLibrary/export";
        var form=$("<form>");
        form.attr("style","display:none");
        form.attr("method","post");
        form.attr("action",myurl);
        $("body").append(form);
    }
    }
  };
</script>


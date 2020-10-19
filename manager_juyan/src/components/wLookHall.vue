<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px; margin-bottom:50px">
                <span class="el-icon-info"></span><span>数据管理</span><span>/聚宴家数据</span>
         </div>
        </div>

         <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center">
            <el-input style="margin: 35px auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; paddind-top:20px; display:none">

            <el-button v-show="rootObj.insert"  style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增厅</el-button>
        </div>

        <!-- EXCEL表格下载-->
         <div style="position:relative;width:250px;overflow:hidden;float:right;margin-right:4.5%">
        </div>
        
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style="font-size:14px;margin-top:25px;">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>   
              <th style="text-align: center;">电话号码</th>  
         
              <th style="text-align: center;">创建时间</th> 
              <th style="text-align: center;">是否有效</th> 
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>
    
           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.phone }}</td>
                
                <td style="text-align: center;">{{item.dateTime }}</td>
                <td style="text-align: center;">
                        <div v-for="(items ,index) of radioList" :key="items.id" @click.stop="changeRadio(item.id,index)"> <el-radio :label="items.val" v-model="item.state"  >{{items.name}}</el-radio></div>
                </td>
                <td style="text-align: center;"><el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button></td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button v-show="rootObj.delete" class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
          <el-button v-show="rootObj.exportExcel" class="btn" type="danger" size="mini" style="width:155px; font-size:10px;  margin:5px; " @click="downExcel()">选中下载Excel表</el-button>

        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        title="请填写相关类容"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <span style="color:red">{{toastCheck}}</span>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="cityName "
                    v-on:blur="blurCount()"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加城市名</template>
        </el-input>
        

        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认添加</el-button>
        </el-dialog>  


         <!-- 分页器 -->
        <div class="page-box" v-show="list.length!=0||pageNum>10" style="margin-bottom: 30px;overflow: hidden;">
            <el-pagination
            style="margin-right: 100px;float:right;"
            class="page"
            background
            layout="prev, pager, next"
            :total="pageNum"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            >
          </el-pagination>
        </div>

        <!--没数据要显示的  -->
        <div v-show="list.length==0" class="noView" style="text-align: center;margin-top: 100px;font-size: 20px;color: rgb(233, 18, 10);">
            暂无数据
        </div>

    </div>
       

</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
import {postRequest} from '../utils/api';
export default {

     data() {
      return {
          
            cityName :"",
            currentPage:1,
            pageNum:10,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             list:[],
             radioList:[{val:0,id:"1",name:"待定"},{val:1,id:"2",name:"有效"},{val:2,id:"3",name:"无效"},],
             uData:{},
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
             toastCheck:"",
             clickAgain:true,
             upExcelurl:`${url.server+url.wadaExportWebAppDataExcel}?token=${getCookie("token")}`,
             rootObj:{}

      }
    },
      mounted(){
        let rootL = JSON.parse(this.$route.query.root);
        
        
        console.log("传过来的数据root",rootL)
        let rootObj={}
        let Rkeys =[]
        let Rvalues=[]
        for(let i=0;i< rootL.length;i++){
            Rkeys.push(Object.keys(rootL[i]))
            Rvalues.push(Object.values(rootL[i]))
        }
        
        
        for(let i=0;i< rootL.length;i++){
            rootObj[Rkeys[i]]=Rvalues[i][0]
        }

        console.log("root变形后的对象",rootObj)
        this.rootObj=rootObj
    },
     methods:{

        //  下载带数据的EXCEL表格
            downExcel(){
                
                let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){

                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                
                window.location.href =this.upExcelurl+`&id=${chooseStr}`
            },         
            

            changeRadio(id,index){
                // this.clickAgain=false;
                if(!this.clickAgain){
                    return
                  }
                console.log("打印的id值",id)
                console.log("打印的index值",index+"")
                    



                    // var iTime; 
                    // //写在事件内部
                    // clearTimeout(iTime);
                    // iTime = setTimeout(function () {
                    //     //需要执行的事件
                    // }, 100);
                     postRequest(url.wadaUpdateWebAppData, {
                        id: id,
                        state : index+"" , 
                    }).then(data=> {
                        console.log("是否有效打印的数据",data.data)
                        // this.clickAgain=false;
                        // let datas=data.data.data;
                        // this.list=datas.list
                        // let pageNums=datas.pages*10
                        //  let currentPages=datas.pageNum
                        //  this.pageNum=pageNums
                        //  this.currentPage=currentPages
                                                    
                });

            },
            // 添加按钮弹出框出现
            addTode(){
                this.showAd=true;
                this.dialogVisible=true;
                this.cityName = "";
                this.toastCheck=""

            },
            blurCount(){


           //判断用户名失去焦点时的用户名是否相同
                    postRequest(url.cityCheckCityName, {
                        cityName: this.cityName,
                        }).then(data=> {
                                console.log("打印的数据",data.data)
                                
                                this.toastCheck=data.data.data
                                if(data.data.status==200){
                                    this.toastCheck=""
                                }
                                if(data.data.status==500){
                                    this.toastCheck="城市名重复"
                                }
                                
                });
           },
            //提交确认添加一条数据
            submitAdd(){
                if(this.cityName==""){
                   this.$message({
                    message: '输入框不能为空',
                    type: 'success'
                    });
                    return
                }
                // 输入的重复，即有提示文字，有提示文字，即不为空，不为空，即不能提交
                if(this.toastCheck!=""){
                    return
                }
               
                this.dialogVisible=false;

                postRequest(url.cityInsertCity, {
                        pageNum: this.currentPage,
                        cityName : this.cityName , 
                    }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                        this.list=datas.list
                        let pageNums=datas.pages*10
                         let currentPages=datas.pageNum
                         this.pageNum=pageNums
                         this.currentPage=currentPages
                                                    
                });  
            },




            // 删除某一条
            removeTodo(index){
                // console.log("删除的index",this.list[index].id);
                // console.log("当前页",this.currentPage);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                             postRequest(url.wadaDeleteWebAppData, {
                                pageNum: this.currentPage,
                                id:this.list[index].id
                                }).then(data=> {
                                console.log("打印的数据",data.data.data)
                                let datas=data.data.data;
                                this.list=datas.list
                                let pageNums=datas.pages*10
                                let currentPages=datas.pageNum
                                this.pageNum=pageNums
                                this.currentPage=currentPages
                                                    
                            });

                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                
                 
            },
            // 选择删除及其全部删除
            deletChoose(){
                //  this.$alert('sorry，暂未开放批量删除');
                //  return
                let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                // console.log("删除的chooseArr",chooseStr);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                             postRequest(url.wadaDeleteWebAppData, {
                                pageNum: this.currentPage,
                                id: chooseStr
                                }).then(data=> {
                                console.log("打印的数据",data.data.data)
                                let datas=data.data.data;
                                this.list=datas.list
                                let pageNums=datas.pages*10
                                let currentPages=datas.pageNum
                                this.pageNum=pageNums
                                this.currentPage=currentPages
                                                    
                            });

                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                
                 
            },





            //切换分页
          handleCurrentChange:function(){
             
            postRequest(url.wadaFindAllWebAppData, {
                 pageNum:this.currentPage,
                            //    token:getCookie("token") 
                            }).then(data=> {
                                    console.log("打印的数据",data.data.data)
                                    let datas=data.data.data;
                                    this.list=datas.list
                                    let pageNums=datas.pages*10
                                    let currentPages=datas.pageNum
                                    this.pageNum=pageNums
                                    this.currentPage=currentPages
                                    
              });
         },
            
   //控制checkbox复选框
      handleCheckAllChange(val) {
            this.checkedCities = val ? this.list : [];
            this.isIndeterminate = false;
    //    console.log(this.checkedCities,"打印的checkedCities值")
       if(val==true){

       }
      },
      handleCheckedCitiesChange(value) {
        //   console.log(value,"打印的value值")
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
      },
     

            goSearch(){//搜索
                postRequest(url.wadaFindAllWebAppData, {
                   keyword: this.search,
                }).then(data=> {
                       console.log("打印的数据",data.data.data)
                                    let datas=data.data.data;
                                    this.list=datas.list
                                    let pageNums=datas.pages*10
                                    let currentPages=datas.pageNum
                                    this.pageNum=pageNums
                                    this.currentPage=currentPages
                        
                });       

            },      

     },
  
 

     created:function(){

        postRequest(url.wadaFindAllWebAppData, {
                //    token:getCookie("token") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         let currentPages=datas.pageNum
                         this.pageNum=pageNums
                         this.currentPage=currentPages
                        
        }
        
        );       
     },
     
}
</script>
    
<style scoped>


</style>


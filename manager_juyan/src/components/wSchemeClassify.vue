<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>宴会酒店</span><span>/酒店描述</span>
         </div>
        </div>

         <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center;margin-top:45px;">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">

            <el-button v-show="rootObj.insert" style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode('新增')">新增描述</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>   
              <th style="text-align: center;">作品分类</th>  
              <th style="text-align: center;">属于</th>  
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                
                <td style="text-align: center;">{{item.classifyName }}</td>
                <td style="text-align: center;">{{item.moduleName }}</td>
                <td style="text-align: center;">
                    <el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px ; display: none"  @click="changeTode(index,'修改')" class="btn" type="danger">修改</el-button>
                </td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button v-show="rootObj.delete" class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <span style="color:red">{{toastCheck}}</span>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="classifyName"
                    v-on:blur="blurCount1()"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加酒店描述</template>
        </el-input>

       
        

        <el-button v-show="this.popKind=='新增'" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认增加</el-button>
        <div style="display:none">
            <el-button v-show="this.popKind=='修改'" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitChange(changeIndex)" style="width:100%;">确认修改</el-button>
        </div>
        
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
          
            classifyName :"",
            currentPage:1,
            pageNum:10,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
             toastCheck:"",
             toastCheck2:"",
             dialogTitle:"",
             popKind:"", //判断当前是在哪个弹窗里  新增 或者 修改
             publicCity:"",//在修改的时候失去焦点判断是否是原来的值 (城市的名字)
             publicCitySort:"",//在修改的时候失去焦点判断是否是原来的值  (城市的等级)
             rootObj:{},
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



            // 添加按钮弹出框出现
            addTode(values){
                console.log("当前是哪个弹窗类型",values)
                this.popKind=values
                this.dialogTitle="添加相关内容"
                this.showAd=true;
                this.dialogVisible=true;
                this.classifyName = "";
                this.toastCheck=""



            },
            blurCount1(){


            
            

           //判断用户名失去焦点时的用户名是否相同
             
                    postRequest(url.cowaCheckCategroyOfWorksName, {
                        moduleName:"独立策划师",
                        classifyName : this.classifyName,
                        }).then(data=> {
                                console.log("校验打印的数据",data)
                                
                                this.toastCheck=data.data.data
                                if(data.data.status==200){
                                    this.toastCheck=""
                                }
                                if(data.data.status==500){
                                    this.toastCheck="添加分类重复"
                                }
                                
                });
           },

            //提交确认添加一条数据
            submitAdd(){
                if(this.classifyName==""){
                   this.$message({
                    message: '输入框不能为空',
                    type: 'success'
                    });
                    return
                }

               


                postRequest(url.cowaInsertCategroyOfWorks, {
                        pageNum: this.currentPage,
                        moduleName :"独立策划师",
                        classifyName : this.classifyName , 

                    }).then(data=> {
                        console.log("添加成功打印的数据",data.data.data)
                        let datas=data.data.data;
                        this.list=datas.list
                        let pageNums=datas.pages*10
                         let currentPages=datas.pageNum
                         this.pageNum=pageNums
                         this.currentPage=currentPages

                         this.dialogVisible=false;
                                                    
                });  
            },


             // 弹出修改按钮
            changeTode(index,values){
                console.log("当前是哪个弹窗类型",values)
                this.popKind=values
                this.dialogTitle="修改写相关信息"
                this.toastCheck=""
                this.toastCheck2=""
                this.dialogVisible=true;


                this.cityName=this.list[index].cityName;
               
                
                this.sortCity= this.list[index].sortCity;   

                this.changeIndex=index;     

                this.publicCity=this.list[index].cityName; //来记录修改弹窗出来的时候显示的值，用来与后面失去焦点值是否改变作对比
                this.publicCitySort=this.list[index].sortCity;

            },


            // 提交确认修改某条数据
            submitChange(index){
             
             console.log("答应当前的ID",this.list[index].id)
                 
             if(!this.cityName||!this.sortCity){
                    this.$message({
                            type: 'success',
                            message: '输入框不能为空'
                        });          
                       
                    return
             }  
              // 输入的重复，即有提示文字，有提示文字，即不为空，不为空，即不能提交
            if(this.toastCheck!=""){
                    return
            }
            if(this.toastCheck2!=""){
                    return
            }


                postRequest(url.cityUpdateCity, {
                        id:this.list[index].id,
                        pageNum: this.currentPage,
                        cityName : this.cityName , 
                        sortCity : this.sortCity,
                }).then(data=> {
                        console.log("修改成功的打印的数据",data)
                        let datas=data.data.data;
                        this.list=datas.list
                        let pageNums=datas.pages*10
                         let currentPages=datas.pageNum
                         this.pageNum=pageNums
                         this.currentPage=currentPages
                         
                        this.dialogVisible=false;
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
                            
                             postRequest(url.cowaDeleteCategroyOfWorks, {
                                pageNum: this.currentPage,
                                id:this.list[index].id,
                                moduleName :"独立策划师",
                                }).then(data=> {
                                console.log("打印的数据",data.data.data)
                                if(data.data.status=="500"){
                                    this.$message({
                                    message: data.data.msg,
                                    type: 'success'
                                    });
                                    return
                                }
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

                             postRequest(url.cowaDeleteCategroyOfWorks, {
                                pageNum: this.currentPage,
                                id: chooseStr,
                                moduleName :"独立策划师",
                                }).then(data=> {
                                console.log("打印的数据",data.data.data)
                                if(data.data.status=="500"){
                                    this.$message({
                                    message: data.data.msg,
                                    type: 'success'
                                    });
                                    return
                                }
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
             
            postRequest(url.HotelDescribeFindAllHotelDescribe, {
                 pageNum:this.currentPage,
                            //    token:getCookie("token") 
                            moduleName :"独立策划师",
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
                postRequest(url.cowaFindAllCategroyOfWorks, {
                   keyword: this.search,
                   moduleName :"独立策划师",
                }).then(data=> {
                         console.log("搜索打印的数据",data.data.data)
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

        postRequest(url.cowaFindAllCategroyOfWorks, {
                //    token:getCookie("token") 
                moduleName :"独立策划师",
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


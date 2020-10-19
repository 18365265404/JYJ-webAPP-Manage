<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>权限管理</span><span>/小权限</span>
         </div>
        </div>
         <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">

            <el-button v-show="rootObj.insert" style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode('新增')">新增小权限</el-button>
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
              <th style="text-align: center;">主菜单</th>  
              <th style="text-align: center;">子菜单</th>  
              <th style="text-align: center;">URL</th> 
              <th style="text-align: center;">小权限名称</th>  
              <th style="text-align: center;">小权限英文名称</th>  
              
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                
                <td style="text-align: center;">{{item.jurisdictionModuleName }}</td>
                <td style="text-align: center;">{{item.jurisdictionSubmoduleName }}</td>
                <td style="text-align: center;">{{item.jurisdictionUrl }}</td>
                <td style="text-align: center;">{{item.jurisdictionName }}</td>
                
                <td style="text-align: center;">{{item.jurisdictionEnglishName }}</td>
                <td style="text-align: center;">
                    <el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" v-show="rootObj.update" style="width:85px; font-size:10px;  margin:5px"  @click="changeTode(index,'修改')" class="btn" type="danger">修改</el-button>
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

        <span>请选择主菜单</span>
        <div style="width:100%; overflow: hidden; margin-bottom:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择主菜单</span>
                    <el-select @change="changeMenu()" v-model="jurisdictionModule" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.moduleName"
                    :value="item.id">
                    </el-option>
                    </el-select>
        </div> 

        <span>请选择子菜单</span>
        <div style="width:100%; overflow: hidden; margin-bottom:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择主菜单</span>
                    <el-select v-model="jurisdictionSubmo" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.submoduleName"
                    :value="item.id">
                    </el-option>
                    </el-select>
        </div> 

        <span style="color:red">{{toastCheck}}</span>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="jurisdictionUrl"
                    v-on:blur="blurCount1()"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加URL</template>
        </el-input>
        
        <span style="color:red">{{toastCheck2}}</span>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="jurisdictionName "
                    v-on:blur="blurCount2()"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加小权限</template>
        </el-input>


        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="jurisdictionEnglish "

                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加小权限英文名</template>
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
            jurisdictionModule:"",//主菜单
            jurisdictionSubmo:"", //子菜单
            jurisdictionUrl:"",   //url
            jurisdictionName:"",  //小权限
            jurisdictionEnglish:"", //英文名
            submoduleName :"",   
            submoduleEnglishName:"",
            mainMenu :"",
            subMenu:"",
            currentPage:1,
            pageNum:10,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             options1:[],
             options2:[],
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
             publicModule:"",//在修改的时候失去焦点判断是否是原来的值 (子菜单的名字)
             publicModuleE:"",//在修改的时候失去焦点判断是否是原来的值 (子菜单英文的名字)
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

            // 第一个select改变时触发的事件
            changeMenu(){
                console.log("select改变的参数",this.jurisdictionModule)
            // 添加时出现的select2（子菜单）
            postRequest(url.saSelSubmodule, {
                    moduleId:this.jurisdictionModule
                    }).then(data=> {
                            console.log("添加时出现的select",data.data.data)
                            let datas=data.data;
                            this.options2=data.data.data
                           
                            
                            
        });  

            },
            // 添加按钮弹出框出现
            addTode(values){
                console.log("当前是哪个弹窗类型",values)
                this.popKind=values
                this.dialogTitle="添加相关内容"
                this.showAd=true;
                this.dialogVisible=true;
                this.submoduleName = "";
                
                this.jurisdictionModule="",
                this.jurisdictionSubmo=""
                this.jurisdictionUrl="";
                this.jurisdictionName="";

                this.jurisdictionEnglish="",

                this.toastCheck="";
                this.toastCheck2=""


            },
            blurCount1(){
                return  //暂时不开放验证 url

            // //如果在修改的时候当前值没有进行修改，就不进行判断
            
            // if(this.popKind=="修改"){
            //     if(this.publicModule==this.submoduleName){
            //         this.toastCheck="";
            //         return
            //     }
            // }
            
            

           //判断用户名失去焦点时的用户名是否相同
                    if(this.jurisdictionUrl==""){
                        return
                    }
                    postRequest(url.jdaCheckJurisdiction, {
                    
                        jurisdictionUrl: this.jurisdictionUrl,
                        }).then(data=> {
                                console.log("校验URL的数据",data)
                                
                                this.toastCheck=data.data.data
                                if(data.status==200){
                                    this.toastCheck=""
                                    console.log(this.toastCheck,"1111111111111111111111111111111")
                                }
                                if(data.data.status==500){
                                    this.toastCheck="URL名重复"
                                }
                                
                });
           },

           blurCount2(){
//如果在修改的时候当前值没有进行修改，就不进行判断
            
            // if(this.popKind=="修改"){
            //     if(this.publicModuleE==this.submoduleEnglishName){
            //         this.toastCheck2="";
            //         return
            //     }
            // }
            return
            if(this.jurisdictionName==""){
                        return
                    }

           //判断用户名失去焦点时的用户名是否相同
             
                    postRequest(url.jdaCheckJurisdiction, {
                        
                        jurisdictionName: this.jurisdictionName,
                        }).then(data=> {
                                console.log("校验打印的数据",data)
                                
                                this.toastCheck2=data.data.data
                                if(data.status==200){
                                    this.toastCheck2=""
                                    console.log(this.toastCheck2,"1111111111111111111111111111111")
                                }
                                if(data.data.status==500){
                                    this.toastCheck2="子菜单英文名重复"
                                }
                                
                });
           },

            //提交确认添加一条数据
            submitAdd(){
                console.log("fgjsjkfjsdfjksdjfk",this.jurisdictionModule,this.jurisdictionSubmo,this.jurisdictionUrl,this.jurisdictionName,this.jurisdictionEnglish)
                if(this.jurisdictionModule=="" ||this.jurisdictionSubmo=="" || this.jurisdictionUrl==""|| this.jurisdictionName=="" || this.jurisdictionEnglish==""){
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
                 if(this.toastCheck2!=""){
                    return
                }

               


                postRequest(url.jdaInsertjurisdiction, {
                        pageNum: this.currentPage,
                        jurisdictionModuleId:this.jurisdictionModule,
                        jurisdictionSubmoduleId : this.jurisdictionSubmo,
                       
                        jurisdictionUrl:this.jurisdictionUrl,
                        jurisdictionName : this.jurisdictionName,
                        jurisdictionEnglishName:this.jurisdictionEnglish,
                        
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
                // console.log("当前是哪个弹窗类型",values)
                // this.popKind=values
                // this.dialogTitle="修改写相关信息"
                // this.toastCheck=""
                // this.toastCheck2=""
                // this.dialogVisible=true;

                // this.mainMenu=this.list[index].moduleId
                // this.subMenu=this.list[index].subMenuId
                // this.submoduleName=this.list[index].submoduleName;
                // this.submoduleEnglishName=this.list[index].submoduleEnglishName
                


                // this.changeIndex=index;     


                // this.publicModule=this.list[index].submoduleName; //来记录修改弹窗出来的时候显示的值，用来与后面失去焦点值是否改变作对比
                // this.publicModuleE=this.list[index].submoduleEnglishName; //来记录修改弹窗出来的时候显示的值，用来与后面失去焦点值是否改变作对比
                
            },


            // 提交确认修改某条数据
            submitChange(index){
             
            //  console.log("答应当前的ID",this.list[index].id)
                 
            //  if(!this.submoduleName||!this.mainMenu || !this.subMenu || !this.submoduleEnglishName){
            //         this.$message({
            //                 type: 'success',
            //                 message: '输入框不能为空'
            //             });          
                       
            //         return
            //  }  
            //   // 输入的重复，即有提示文字，有提示文字，即不为空，不为空，即不能提交
            // if(this.toastCheck!=""){
            //         return
            // }
            // if(this.toastCheck2!=""){
            //         return
            // }



            //     postRequest(url.saUpdateSubmodule, {
            //             id:this.list[index].id,
            //             pageNum: this.currentPage,
            //             submoduleName : this.submoduleName , 
            //             submoduleEnglishName:this.submoduleEnglishName,
            //             moduleId : this.mainMenu,
            //             submoduleId : this. subMenu
            //     }).then(data=> {
            //             console.log("修改成功的打印的数据",data)
            //             let datas=data.data.data;
            //             this.list=datas.list
            //             let pageNums=datas.pages*10
            //              let currentPages=datas.pageNum
            //              this.pageNum=pageNums
            //              this.currentPage=currentPages
                         
            //             this.dialogVisible=false;
            //   });
          
     
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
                            
                             postRequest(url.jdaDeletejurisdiction, {
                                pageNum: this.currentPage,
                                id:this.list[index].id
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

                             postRequest(url.jdaDeletejurisdiction, {
                                pageNum: this.currentPage,
                                id: chooseStr
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
             
            postRequest(url.jdaSel, {
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


         goSearch(){
              postRequest(url.jdaSel, {
                 keyword:this.search,
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
     

     },
  
 

     created:function(){

           // 添加时出现的select（主菜单）
        postRequest(url.maSelModule, {
                    //    token:getCookie("token") 
                    }).then(data=> {
                            console.log("添加时出现的select",data.data.data)
                            let datas=data.data;
                            this.options1=data.data.data
                           
                            
                            
        });  
        


        postRequest(url.jdaSel, {
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


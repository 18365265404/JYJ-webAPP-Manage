<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>网站管理</span><span>/企业动态</span>
         </div>
        </div>


        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">
 
            <el-button style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增企业动态</el-button>
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
              
              <th style="text-align: center;">动态标题</th> 
              <th style="text-align: center;">创建时间</th>  
		      <th style="text-align: center;"> 操作</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                
                 <td style="text-align: center;">{{item.dynamicsTitle }}</td>
                <td style="text-align: center;">{{item.createTime }}</td>
                <td style="text-align: center;">
                    <el-button size="mini" style="width:95px; font-size:10px;  margin:5px"  @click="showDetail(index)" class="btn" type="success">查看详情</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"  @click="changeTode1(index)" class="btn" type="danger">修改</el-button>
                    <el-button size="mini" style=""  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                </td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button class="btn" type="danger" style="width:85px; font-size:10px;  margin:5px; margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->


        <!-- 弹窗 -->
        <el-dialog
        title="请填写相关类容"
        :visible.sync="dialogVisible"
        width="90%"
        :close-on-click-modal="false"

        center>

        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="newsTitle "
                    style="margin-bottom:6px"

                    clearable>
                    <template slot="prepend">添加标题</template>
        </el-input>

        <div style="overflow: hidden;">
            <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            style="min-height:200px ;"
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
            </quill-editor>
        </div>


    

        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认添加</el-button>
        <el-button v-show="showChange" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitchange(changeIndex)" style="width:100%;">确认修改</el-button>
        </el-dialog>  

        <!-- 弹窗内容详情展示-->
        <el-dialog
        title="动态内容"
        
        :visible.sync="dialogVisible2"
       
        width="60%"
        
        center>
          <div style="with:100%; overflow:hidden">{{currentContent}}</div>  
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
import { quillEditor } from 'vue-quill-editor'
export default {

     data() {
      return {
          content:null,
          editorOption:{
         
                    placeholder: '编辑内容...'
          },
          currentContent:"",
            currentId:"",
            newsTitle :"",
            currentPage:1,
            pageNum:1000,//总页数
            showAd:"false",
            showChange:"false",
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             dialogVisible:false,
             dialogVisible2:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
      }
    },
     methods:{

        
          onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },


            //查看内容详情
            showDetail(index){
               this.dialogVisible2=true,
                this.currentContent=this.list[index].dynamicsContent
            },


            // 添加按钮弹出框出现
            addTode(){
                this.showAd=true;
                this.showChange=false;
                this.dialogVisible=true;
                this.newsTitle="";
                this.content="";
  

            },
            //提交确认添加一条数据
            submitAdd(){
                console.log(this.content,"123123123")
                // console.log("标题",this.newsTitle)
                // console.log("富文本点击提交类容",this.content)    
                if(!this.newsTitle||!this.content){
                    this.$alert('输入的内容不能为空');
                    return     
                }

                
                // return
           this.$ajax(
                  url.root()+url.tedsAdd(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")  , 
                        pagenum : this.currentPage,
                        dynamicsTitle :this.newsTitle,
                        dynamicsContent :this.content ,  
                                  
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                            case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10

                            this.dialogVisible=false;
                            break;
                    }
                   }, (response) => {
                   switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
                });   
            },


//修改一条数据
            changeTode1(index){
                this.showAd=false;
                this.showChange=true;
                this.dialogVisible=true;
                this.newsTitle= this.list[index].dynamicsTitle;
                this.content=this.list[index].dynamicsContent;
                this.currentId=this.list[index].id;
                
            
            },
 //提交修改的某条数据 
            submitchange(index){
                // console.log("标题",this.newsTitle)
                // console.log("富文本点击提交类容",this.content)    
                if(!this.newsTitle||!this.content){
                    this.$alert('输入的内容不能为空'); 
                    return    
                }

                
                // return
           this.$ajax(
                  url.root()+url.tedsUpd(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token"),   
                        pagenum : this.currentPage,
                        dynamicsTitle :this.newsTitle,
                        dynamicsContent :this.content ,
                        id: this.currentId
                                  
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                            case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10

                            this.dialogVisible=false;
                            break;
                    }
                   }, (response) => {
                    switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
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

                                    this.$ajax(
                                        url.root()+url.tedsDel(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                  token:getCookie("token") ,
                                               
                                                idStr:this.list[index].id

                                            }                      
                                        }).then((response) => {
                                        
                                            var data=response.data;
                                            var status=data.status;
                                            switch(status){
                                                case 400:
                                                    this.$alert(data.msg);
                                                    this.$router.push({ path: '/login' })
                                                    break
                                                    case 401:
                                                        this.$alert(data.msg);   
                                                        this.showLoad=false
                                                    break;
                                                    case 555:
                                                        this.$alert(data.msg);                              
                                                        this.showLoad=false
                                                    break;
                                                    case 500:
                                                        this.$alert('sorry，请求异常，请稍后重试');                              
                                                        this.showLoad=false
                                                    break;
                                                    case 200://请求成功
                                                    // console.log("请求成功的数据",data.data.records)
                                                    this.list=data.data.records
                                                    var pageNums=data.data.totalpage
                                                    var currentPages=data.data.pageNum
                                                
                                                
                                                    
                                                    this.pageNum=pageNums*10
                                                    this.currentPage=currentPages*10
                                                    break;
                                            }
                                        }, (response) => {
                                           switch(response.response.status){
                                                case 400:
                                                this.$message({
                                                        type: 'error',
                                                        message: "登录信息已过期，请重新登录"
                                                        });

                                                        this.$router.replace({ path: 'login' })
                                                    break
                                                default:
                                                    this.$message({
                                                        type: 'error',
                                                        message: "请求错误，请重试"
                                                        });
                                                break;    
                                            
                                        }
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
                if(this.checkedCities.length==0){
                        this.$alert('删除的内容不能为空');
                        return
                }
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

                                    this.$ajax(
                                        url.root()+url.tedsDel(),{
                                        //    '/static/data/list.json',{
                                            
                                            method: 'post',
                                            params: {
                                                  token:getCookie("token") ,
                                                pagenum: this.currentPage,
                                                idStr: chooseStr
                                                //  `${url.root()}${url.roleDeleteRole()}?id=${chooseArr}&pagenum=${this.currentPage}`,{

                                            }                      
                                        }).then((response) => {
                                        
                                            var data=response.data;
                                            var status=data.status;
                                            switch(status){
                                                case 400:
                                                    this.$alert(data.msg);
                                                    this.$router.push({ path: '/login' })
                                                    break
                                                    case 401:
                                                        this.$alert(data.msg);   
                                                        this.showLoad=false
                                                    break;
                                                    case 555:
                                                        this.$alert(data.msg);                              
                                                        this.showLoad=false
                                                    break;
                                                    case 500:
                                                        this.$alert('sorry，请求异常，请稍后重试');                              
                                                        this.showLoad=false
                                                    break;
                                                    case 200://请求成功
                                                    // console.log("请求成功的数据",data.data.records)
                                                    this.list=data.data.records
                                                    var pageNums=data.data.totalpage
                                                    var currentPages=data.data.pageNum
                                                
                                                
                                                    
                                                    this.pageNum=pageNums*10
                                                    this.currentPage=currentPages*10
                                                    break;
                                            }
                                        }, (response) => {
                                           switch(response.response.status){
                                                    case 400:
                                                    this.$message({
                                                            type: 'error',
                                                            message: "登录信息已过期，请重新登录"
                                                            });

                                                            this.$router.replace({ path: 'login' })
                                                        break
                                                    default:
                                                        this.$message({
                                                            type: 'error',
                                                            message: "请求错误，请重试"
                                                            });
                                                    break;    
                                                
                                            }
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
            this.$ajax(
                  url.root()+url.tedsSel(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                        token:getCookie("token") ,
                        pageNum: this.currentPage

                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                            case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                            //  console.log("请求成功的数据",data.data.records)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10
                            break;
                    }
                   }, (response) => {
                        switch(response.response.status){
                                    case 400:
                                    this.$message({
                                            type: 'error',
                                            message: "登录信息已过期，请重新登录"
                                            });

                                            this.$router.replace({ path: 'login' })
                                        break
                                    default:
                                        this.$message({
                                            type: 'error',
                                            message: "请求错误，请重试"
                                            });
                                    break;    
                                
                            }
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
            // return
         
     
            this.$ajax(
                  url.root()+url.tedsSel(),{
                //    '/static/data/list.json',{
                      
                    method: 'post',
                    params: {
                          token:getCookie("token")                        
                    }                      
                   }).then((response) => {
                   
                    var data=response.data;
                    var status=data.status;
                    switch(status){
                        case 400:
                            this.$alert(data.msg);
                            this.$router.push({ path: '/login' })
                            break
                            case 401:
                                 this.$alert(data.msg);   
                                 this.showLoad=false
                            break;
                            case 555:
                                this.$alert(data.msg);                              
                                this.showLoad=false
                            break;
                            case 500:
                                this.$alert('sorry，请求异常，请稍后重试');                              
                                this.showLoad=false
                            break;
                            case 200://请求成功
                             console.log("请求成功的数据",data.data.records)
                             this.list=data.data.records
                            var pageNums=data.data.totalpage
                            var currentPages=data.data.pageNum
                           
                           
                             
                            this.pageNum=pageNums*10
                            this.currentPage=currentPages*10
                            break;
                    }
                   }, (response) => {
                   switch(response.response.status){
                            case 400:
                            this.$message({
                                    type: 'error',
                                    message: "登录信息已过期，请重新登录"
                                    });

                                    this.$router.replace({ path: 'login' })
                                break
                            default:
                                 this.$message({
                                    type: 'error',
                                    message: "请求错误，请重试"
                                    });
                               break;    
                        
                    }
                });         
     },
     
}
</script>
    
<style scoped>


</style>


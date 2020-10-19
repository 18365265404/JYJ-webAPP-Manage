<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>客户端意愿调查</span><span>/问卷调查</span>
         </div>
        </div>

         <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center;margin-top:45px;">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style="font-size:14px;margin-top:45px;">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>   
              <th style="text-align: center;">城市</th>
              <th style="text-align: center;">门店</th>
              <th style="text-align: center;">宴会厅</th>
              <th style="text-align: center;">宴会时间</th>
              <th style="text-align: center;">满意度</th>
              <th style="text-align: center;">菜肴的满意度</th>
              <th style="text-align: center;">宴会厅服务满意度</th>
              <th style="text-align: center;">上帝意见反馈</th>
              <th style="text-align: center;">创建时间</th>
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>
            
           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.city }}</td>
                <td style="text-align: center;">{{item.store }}</td>
                <td style="text-align: center;">{{item.banquetHall }}</td>
                <td style="text-align: center;">{{item.dinnerTime }}</td>
                <td style="text-align: center;">{{item.satisfaction }}星</td>
                <td style="text-align: center;">{{item.cuisinesSatisfaction }}星</td>
                <td style="text-align: center;">{{item.serveSatisfaction }}星</td>
                <td style="text-align: center;">{{item.evaluationContent }}</td>
                <td style="text-align: center;">{{item.dateTime }}</td>
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
        <!-- 弹窗 
        <el-dialog
        title="请填写相关类容"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <span style="color:red">{{toastCheck}}</span>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    
                    v-model="dictionaryDifferenceName"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加类型名</template>
        </el-input>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    
                    v-model="dictionaryDifferenceEnglishName"
                    style="margin-bottom:6px"
                    clearable>
                    <template slot="prepend">添加类型名（英文）</template>
        </el-input>

    

        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认添加</el-button>
        </el-dialog>  -->

        
         
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
          
            dictionaryDifferenceName :"",
            dictionaryDifferenceEnglishName:"",
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
             rootObj:{},
             upExcelurl:`${url.server+url.RecommendExportRecommendExcel}?token=${getCookie("token")}`,  //
             
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
                return
                
               let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){

                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                
                window.location.href =this.upExcelurl+`&id=${chooseStr}`
            },   

            // 添加按钮弹出框出现
            addTode(){
                this.showAd=true;
                this.dialogVisible=true;
                this.dictionaryDifferenceName = "";
                this.dictionaryDifferenceEnglishName="";
                this.toastCheck=""
            },

                        blurCount(){
               
                var  blurId=""

           //判断用户名失去焦点时的用户名是否相同

         postRequest(url.dydeCheck, {
                        dictionaryDifferenceName: this.dictionaryDifferenceName,
                        dictionaryDifferenceEnglishName:this.dictionaryDifferenceEnglishName
                        }).then(data=> {
                                console.log("打印的数据",data.data)
                                
                                this.toastCheck=data.data.data
                                if(data.data.status==200){
                                    this.toastCheck=""
                                }
                                if(data.data.status==500){
                                    this.toastCheck="类型名重复"
                                }
                                
                });
           },
            //提交确认添加一条数据
            submitAdd(){
                console.log("dictionaryDifferenceEnglishName",this.dictionaryDifferenceEnglishName)
               if(this.dictionaryDifferenceName==""||this.dictionaryDifferenceEnglishName==""){
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

                postRequest(url.dydeAdd, {
                        name:getCookie("username"),
                        pageNum: this.currentPage,
                        dictionaryDifferenceName : this.dictionaryDifferenceName , 
                        dictionaryDifferenceEnglishName:this.dictionaryDifferenceEnglishName
                    }).then(data=> {
                        console.log("打印的数据",data.data.status)
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

                             postRequest(url.QuestionnairedeleteQuestionnaire, {
                                name:getCookie("username"),
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

                             postRequest(url.QuestionnairedeleteQuestionnaire, {
                                name:getCookie("username"),
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
            postRequest(url.QuestionnairefindAllQuestionnaire, {
                      pageNum:this.currentPage
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
         goSearch(){//搜索
                postRequest(url.QuestionnairefindAllQuestionnaire, {
                   keyword: this.search,
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                         let datas=data.data.data
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         this.pageNum=pageNums      
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

        postRequest(url.QuestionnairefindAllQuestionnaire, {
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


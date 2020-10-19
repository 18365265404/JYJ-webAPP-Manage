<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>宴会酒店</span><span>/消息推送</span>
         </div>
        </div>

         <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center;margin-top:45px;">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:15px;">

            <el-button  style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">发送消息</el-button>
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
              <th style="text-align: center;">推送内容</th>
              <th style="text-align: center;">推送人姓名</th>
              <th style="text-align: center;">被推送人姓名</th>
              <th style="text-align: center;">状态</th>
              <th style="text-align: center;">创建时间</th>

		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>
            
           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.pushContent }}</td>
                <td style="text-align: center;">{{item.pushPeople }}</td>
                <td style="text-align: center;">{{item.beingPushedPeople }}</td>
                <td style="text-align: center;">{{item.status=="true" ? "已接收" :"未接收"}}</td>
                <td style="text-align: center;">{{item.dateTime }}</td>

                <td style="text-align: center;"><el-button v-show="rootObj.delete" size="mini"  style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button></td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button v-show="rootObj.delete"  class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>

        </div>


        <!-- 弹窗  -->
        <el-dialog
        title="消息推送填写"
        :visible.sync="dialogVisible"
        width="40%"
        center>

    <div style="overflow:hidden">
        <div style="float:left;width:50%">
            
            <el-input
            type="textarea"
            :rows="14"
            placeholder="请输入推送消息"
            v-model="textarea">
            </el-input>
            
        </div>
        <div style="width:10%;float:left">
            <p style="font-size:20px; line-height:300px">=></p>
            
        </div>
   
        <div style="float:left;width:35%;">
            
            <el-table
            :header-cell-style="{background:'#cccccc'}"
            style="height:305px;overflow:auto"
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            >
            </el-table-column>
            <el-table-column
            label="推送人"
            >
            <template slot-scope="scope">{{ scope.row.nickname }}</template>
            </el-table-column>

            </el-table>
        </div>
        <el-button  class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%; margin-top:20px">确认推送</el-button>
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
            textarea:"",

            currentPage:1,
            pageNum:10,//总页数

             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数

             rootObj:{},
             upExcelurl:`${url.server+url.RecommendExportRecommendExcel}?token=${getCookie("token")}`,  //
             tableData3: [],
             multipleSelection: []
             
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

            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log("选择的checkbox",val)
            },

            // 添加按钮弹出框出现
            addTode(){ 

                  
                this.dialogVisible=true;

                postRequest(url.urSelClientUser, {
                        hotelName:"hotel", 

                    }).then(data=> {
                        console.log("打印的数据234234",data)
                        if(data.data.status=="500"){
                            this.$message({
                            message: data.data.msg,
                            type: 'success'
                            });
                            return
                        }
                        let datas=data.data;
                        this.tableData3=datas.data
              
                                                    
                });  

            },


            //提交确认添加一条数据
            submitAdd(){

                // 遍历选中的人员的id
                let checkpush=this.multipleSelection
                let idstr=""
                for(let i=0;i<checkpush.length;i++){
                    idstr+=checkpush[i].id+","
                }
                idstr = idstr.substr(0, idstr.length - 1);
                console.log("要提交的数据",111,idstr,2222,this.textarea,333,getCookie("userId"))

                if(idstr.length==0){
                     this.$message({
                    message: '请至少选择一个发送人',
                    type: 'success'
                    });
                    return
                 }  
               if(this.textarea==""){
                   this.$message({
                    message: '输入框不能为空',
                    type: 'success'
                    });
                    return
                }

                this.dialogVisible=false;

                postRequest(url.paInsertPush, {
                        
                        pageNum: this.currentPage,
                        pushContent:this.textarea,
                        weddingHotelUserId:idstr,
                        pushPeopleId:getCookie("userId"),
                        
                    }).then(data=> {
                        console.log("提交数据成功的数据",data)
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

                             postRequest(url.paDeletePush, {
                               
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
                            
                             postRequest(url.paDeletePush, {
                                
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
            postRequest(url.paFindAllPush, {
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
                postRequest(url.paFindAllPush, {
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

        postRequest(url.paFindAllPush, {
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


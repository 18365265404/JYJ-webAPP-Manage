<template>
    <div class="content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>系统管理</span><span>/普通会员信息</span>
         </div>
        </div>

     <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center;margin-bottom:70px">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px; display:none">
            <el-button style="float:right; margin-right:5%;margin-bottom:20px" type="primary"  @click="addTode()">新增用户</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" back cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center;"></caption>
            <thead style="background: #666666; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>  
		      <th style="text-align: center; " >用户名</th>
		      <th style="text-align: center; " >昵称</th>
              <th style="text-align: center; " >城市</th>

		      

              <th style="text-align: center;  width: 35%;">操作</th>

		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>

                <td style="text-align: center;">{{item.username}}</td>
                <td style="text-align: center;">{{item.nickname}}</td>
                <td style="text-align: center;">{{item.city}}</td>

                


                <td style="text-align: center;" >
                    <!-- <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" class="btn" type="primary" @click="permit(index)" >授权</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" @click="changeTode1(index)" class="btn" type="primary">修改</el-button> -->
                    <el-button size="mini"  v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'" @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini"  v-show="rootObj.resetPassword" style="width:85px; font-size:10px;  margin:5px" :disabled="item.username=='admin'"  @click="changePw(index)" class="btn" type="danger">重置密码</el-button>
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

        <!-- 弹窗 -->
        <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="40%"
        center>

        <!-- 修改基本信息 -->
        <div v-show="baseMessagePop">

        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="username"
                    v-show="showUsername"
                    style=""
                     v-on:blur="blurCount()"
                    clearable>
                    <template slot="prepend">用户名</template>
        </el-input>
        <div style="width:100%; overflow: hidden; margin-top:8px; height:16px; font-size:10px; color:red; text-align: center;">
            <p>{{toastCheck}}</p>
        </div>        
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="nickname"
                    style="margin-bottom:20px"
                    clearable>
                    <template slot="prepend">昵称</template>
        </el-input>

        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="email"
                    style="margin-bottom:20px"
                    clearable>
                    <template slot="prepend">邮箱</template>
        </el-input>

        <div style="width:100%; overflow: hidden; margin-top:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择角色</span>
                    <el-select v-model="rolename" @change="changRole()" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                    </el-select>
        </div>
        <el-button v-show="showCha" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitChange(changeIndex)" style="width:100%; margin-top:20px">确认修改</el-button>
        </div>
        <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%; margin-top:20px">确认添加</el-button>
        

        <div v-show="addPermitPop">
            
           
            <el-checkbox v-model="checkedAdd" @change="checkRoot('add',checkedAdd,changeIndex)">增加</el-checkbox>
            <el-checkbox v-model="checkedDetel" @change="checkRoot('detel',checkedDetel,changeIndex)">删除</el-checkbox>
            <el-checkbox v-model="checkedChange" @change="checkRoot('change',checkedChange,changeIndex)">修改</el-checkbox>
            <el-checkbox v-model="checkedFind" @change="checkRoot('find',checkedFind,changeIndex)">查找</el-checkbox>
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
            checkList:[],
             nickname:"",
             email:"",
             username:"",
             rolename:"",
             dialogTitle:"请填写相关类容",
             currentPage:1,
            pageNum:10,//总页数
            showCha:false,
            showAd:false,
            showPw:true,//显示输入密码
            showUsername:true,   
            baseMessagePop:true,  
            addPermitPop:false ,
            //弹窗权限增加
            checkedAdd:false,
            rootCheckd:false,
            checkedDetel:false,
            checkedChange:false,
            checkedFind:false,
            
            showAddNums:false,
             changeIndex:"",
             search:"",
             list:[],
             uData:{},
             permitListAll:[],
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数

              options1: [],//select

              apartmentV: '',
              roleV: '',
              apartmentId: '',
              roleId:"",
              toastCheck:"",
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
     
     chellksldsf(){
            // console.log("当前选中的状态")
         },
            
         //select框发生值变化事件
            CheckItem(item){
 
            item.state = !item.state;
            // console.log(item.state,"当前选中的状态")
            },

            changRole(){
                    this.roleId= this.rolename;
                    // console.log(this.roleId,"select框发生值变化事件")
            },
           blurCount(){
           //判断用户名失去焦点时的用户名是否相同
        //    console.log(this.username,"11111111111111111111111111111")
                    postRequest(url.urCheckUsername, {
                        username: this.username,
                        }).then(data=> {
                                console.log("打印的数据",data.data)
                                
                                this.toastCheck=data.data.data
                                if(data.data.data=="用户名合法~"){
                                    this.toastCheck=""
                                }
                                
                });
           },



           // 初始化密码
            changePw(index){

                postRequest(url.urResetClientPasswords, {
                    id:this.list[index].id ,
                    pageNum: this.currentPage,
                }).then(data=> {
                        console.log("初始化密码打印的数据",data.data.msg)
                        // let datas=data.data.data;
                        //  this.options1=datas.list
                        //  let pageNums=datas.pages*10
                        
                        //  this.pageNum=pageNums
                         this.$alert('初始化后的密码为:'+data.data.msg);
                         
                        
              });
            },
            //授权和产看权限
           permit(index){
               this.dialogTitle="请设置相关权限"
               this.dialogVisible=true;
               this.baseMessagePop=false
               this.addPermitPop=true 
               this.changeIndex=index; 
               this.showAd=false

            //所有的权限

            postRequest(url.jdaFindAlljurisdiction, {
                      
                }).then(data=> {
                        console.log("权限查询所有",data.data.data)
                        this.permitListAll=data.data.data;
                        
                        
              });



                //某个用户对应的权限


                postRequest(url.ujaFindAllUJD, {
                      userId: this.list[index].id,
                }).then(data=> {
                        console.log("查看对应的权限",data.data.data)
                        let choosepermit=data.data.data
                             for(let i=0;i<choosepermit.length;i++){
                                 let permitName=choosepermit[i].jurisdictionName
                                switch (permitName) {
                                    case "user:insert":
                                        this.checkedAdd=true;
                                        break;
                                     case "user:delete":
                                        this.checkedDetel=true;
                                        break;
                                     case "user:update":
                                        this.checkedChange=true;
                                        break;  
                                     case "user:select":
                                        this.checkedFind=true;
                                        break;      
                                    default:
                                        break;
                                }


                             }
   
              });


           },
// 添加权限
            checkRoot(values,blCheck,index){
                var curentId=""
                switch (values) {
                    case 'add':
                        curentId=this.permitListAll[0].id
                        break;
                    case 'detel':
                        curentId=this.permitListAll[1].id
                        break;
                    case 'change':
                        curentId=this.permitListAll[2].id
                        break;
                    case 'find':
                        curentId=this.permitListAll[3].id
                        break;            
                
                    default:
                        break;
                }
                let currentUrl=""
                if(!blCheck){
                    currentUrl=url.ujaDelete;
                }else{
                    currentUrl=url.ujaInsert;
                }

                postRequest(currentUrl, {
                      userId: this.list[index].id,
                      jurisdictionId:curentId
                }).then(data=> {
                        console.log("处理对应的权限",data.data.data)
                       
   
              });

            },



             // 弹出修改弹出按钮
            changeTode1(index){
                this.dialogTitle="请填写相关信息"
                this.toastCheck="",
                this.showUsername=false;
                this.showCha=true;
                this.showAd=false;
                this.dialogVisible=true;
                this.baseMessagePop=true;
                this.addPermitPop=false;
                this.nickname= this.list[index].nickname;
                this.email=this.list[index].email;
                this.username=this.list[index].username;
                this.rolename= this.list[index].roleName;   

                this.changeIndex=index;     
                this.showPw=false;
            
             // 添加时出现的select
             postRequest(url.roleFindAllRole, {
                //    token:getCookie("token") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.options1=datas.list
                         let pageNums=datas.pages*10
                        
                         this.pageNum=pageNums
                         
                        
              });
            },


            // 提交确认修改某条数据
            submitChange(index){
                 
             if(!this.nickname||!this.rolename){
                    // console.log("输入不能为空")
                    return
             }  
             if(this.toastCheck=="用户名已存在~"){
                    return
             }
             var currentRoleId=""   
             if(this.roleId){
                currentRoleId=this.roleId
             }else{
                 currentRoleId=this.list[index].roleId
             }
            //  console.log("6666666666666666666666",currentRoleId)
            this.dialogVisible=false;
                postRequest(url.urUpdateUser, {
                        nickname: this.nickname,
                        email:this.email,
                        roleId:currentRoleId,
                        id:this.list[index].id,
                        pagenum: this.currentPage,
                }).then(data=> {
                        console.log("修改后后数据",data.data.data)
                        let datas=data.data.data;
                         this.list=datas.list
                         let pageNums=datas.pages*10
                      
                         this.pageNum=pageNums
                         
                        
              });
          
     
            },
            // 增加用户按钮弹出框出现
            addTode(){
                this.dialogTitle="请填写相关信息"
                this.toastCheck="",
                this.showUsername=true
                this.showCha=false;
                this.showAd=true;
                this.showAddNums=true;
                this.dialogVisible=true;
                this.baseMessagePop=true;
                this.addPermitPop=false;

                this.nickname= "";
                this.email="";
                this.username="";
                this.rolename="";

            // 添加时出现的select

            postRequest(url.roleFindAllRole, {
                //    token:getCookie("token") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.options1=datas.list
                         let pageNums=datas.pages*10
                        
                         this.pageNum=pageNums
                        
                        
              });
             
            },
            //提交确认添加一条数据
            submitAdd(){
                console.log("nickname",this.nickname)
                 console.log("username",this.username)
                  console.log("roleId",this.roleId)
                  console.log("email",this.email)
                 
             if(!this.nickname||!this.rolename||!this.username){
                    // console.log("输入不能为空")
                    return
             }  
            if(this.toastCheck=="用户名已存在~"){
                    return
             }
                this.dialogVisible=false;

                    
                        
                postRequest(url.urInsertUser, {
                        nickname: this.nickname,
                        username: this.username,
                        email:this.email,
                        roleId:this.roleId,
                        identifying:"",
                        pagenum: this.currentPage,
                }).then(data=> {
                        console.log("增加一条后数据",data.data.data)
                        let datas=data.data.data;
                         this.list=datas.list
                         let pageNums=datas.pages*10
                        
                         this.pageNum=pageNums
                        
                        
              });


              
            },
/**
 * **********************************************************下面的都是查询************************************************************************
 * */  
         goSearch(){//搜索
                postRequest(url.urFindAllClientUser, {
                   keyword: this.search,
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         
                         this.pageNum=pageNums
                         
                        
                });       

            },
            // 删除某一条
            removeTodo(index){
                // console.log("删除的index",this.list[index].userId);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            postRequest(url.urDeleteClientUser, {
                                pageNum: this.currentPage, 
                                id:this.list[index].id
                                }).then(data=> {
                                        console.log("打印的数据",data.data.data)
                                        let datas=data.data.data;
                                        this.list=datas.list
                                        let pageNums=datas.pages*10
                                        
                                        this.pageNum=pageNums
                                        
                                        
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
                //  
                var chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                console.log("删除的chooseArr",chooseStr);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                            postRequest(url.urDeleteClientUser, {
                                pageNum: this.currentPage, 
                                id:chooseStr
                                }).then(data=> {
                                        console.log("多选删除打印的数据",data)
                                        let datas=data.data.data;
                                        this.list=datas.list
                                        let pageNums=datas.pages*10
                                        
                                        this.pageNum=pageNums
                                        
                                        
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
             console.log("页数",this.currentPage)
                postRequest(url.urFindAllClientUser, {
                                
                                 pageNum: this.currentPage, 
                                }).then(data=> {
                                        console.log("打印的数据",data.data.data)
                                        let datas=data.data.data;
                                        this.list=datas.list
                                        let pageNums=datas.pages*10
                                        let currentPages=datas.lastPage
                                        this.pageNum=pageNums
                                        
                                        
                        });
         },
         },
    created(){
        postRequest(url.urFindAllClientUser, {
                //    token:getCookie("token") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.list=datas.list
                         let pageNums=datas.pages*10
                       
                         this.pageNum=pageNums
                         
                        
        });
    }
}
</script>


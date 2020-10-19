<template>
    <div class="content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>系统管理</span><span>/后台用户管理</span>
         </div>
    </div>

     <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <!-- 新增用户 -->
        <div  class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">
            <el-button v-show="rootObj.delete" style="float:right; margin-right:5%;margin-bottom:20px" type="primary"  @click="addTode()">新增用户</el-button>
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
		      
		      <th style="text-align: center; " >昵称</th>
              <th style="text-align: center; " >角色名</th>
              <th style="text-align: center; " >邮箱</th>
		      <th style="text-align: center; " >用户名</th>

              <th style="text-align: center;  width: 35%;">操作</th>

		    </tr>
		  </thead>
                    
           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.nickname}}</td>
                <td style="text-align: center;">{{item.roleName}}</td>
                <td style="text-align: center;">{{item.email}}</td>
                <td style="text-align: center;">{{item.username}}</td>


                <!-- <td style="text-align: center;" >
                    <el-button size="mini" v-show="rootObj.root" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie"   class="btn" type="primary" @click="permit(index)" >授权</el-button>
                    <el-button size="mini" v-show="rootObj.update" style="width:85px; font-size:10px;  margin:5px"  :disabled="item.roleName==curentCookie" @click="changeTode1(index)" class="btn" type="primary">修改</el-button>
                    <el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" v-show="rootObj.resetPassword" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie"   @click="changePw(index)" class="btn" type="danger">重置密码</el-button>
                </td> -->
                <td style="text-align: center;" >
                    <el-button size="mini" v-show="rootObj.root" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie ||item.username=='admin'"   class="btn" type="primary" @click="permit(index)" >授权</el-button>
                    <el-button size="mini" v-show="rootObj.update" style="width:85px; font-size:10px;  margin:5px"  :disabled="item.roleName==curentCookie ||item.username=='admin'" @click="changeTode1(index)" class="btn" type="primary">修改</el-button>
                    <el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie ||item.username=='admin'"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" v-show="rootObj.resetPassword" style="width:85px; font-size:10px;  margin:5px" :disabled="item.roleName==curentCookie ||item.username=='admin'"   @click="changePw(index)" class="btn" type="danger">重置密码</el-button>
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
                    type="email"
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
        

        

       
        </el-dialog>  
                <!-- 弹窗 -->
        <el-dialog
        title="权限设置"
        :visible.sync="dialogVisible2"
        width="70%"
        center>
        <div style="overflow:hidden">
            <ul>
                <li style="margin-top:20px" v-for="(item1 ,index1) of permitList" :key="item1.id" >
                    <div>
                        <table style="width:100%">
                            
                        <thead style=" font-size:16px;background: #cccccc; color: white;">
                            <tr class="thead-tr" style="">
                                <th style="width:25%"> 
                                    <el-checkbox    @change="checkPermit1(index1,item1.status)" v-model="item1.status"><span style="font-size:16px">{{item1.name}}</span></el-checkbox>
                                </th>
                                <th style="font-size:16px;color:#999999">操作权限</th>  
                            </tr>
                        </thead>
                            
                        <tbody>
                            <tr style="border:1px solid #cccccc" v-for="(item2 ,index2) of item1.menus" :key="item2.id">
                                <td>
                                    <el-checkbox @change="checkPermit2(index1,index2,item2.status)" v-model="item2.status" ><span>{{item2.name}}</span></el-checkbox>
                                </td>
                                <td style="">
                                    <ul style="display:flex">
                                        <li v-for="(item3 ,index3) of item2.root" :key="item3.id" style="margin-right:20px">
                                            <el-checkbox @change="checkPermit3(index1,index2,index3,item3.status)" v-model="item3.status" ><span>{{item3.jurisdictionName}}</span></el-checkbox>
                                        </li>
                                    </ul>
                                    
                                </td>


                            </tr>
                            </tbody> 

                        </table>

                    </div>
                </li>
            </ul>
           
           <div style="overflow:hidden; float:right;margin-top:10px">
               <el-button @click="cancelPermit"  style="float:right">取消</el-button> <el-button type="primary" style="float:right;margin-right:20px" @click="submitPermit(changeIndex)">提交</el-button>
           </div>
            

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
            permitList:[
                {id:"1",
                name1:"系统管理",
                ifCheck:false,
                list1:[
                        {id:"1",
                        name2:"后台用户信息",
                        ifCheck:false,
                        list2:[
                                {id:"1",name3:"增加",ifCheck:false},
                                {id:"2",name3:"删除",ifCheck:true},
                                {id:"3",name3:"修改",ifCheck:false},
                                {id:"4",name3:"授权",ifCheck:true}

                              ]
                        },
                        {id:"2",
                        name2:"普通会员酒店",
                        ifCheck:false,
                        list2:[
                                {id:"1",name3:"增加",ifCheck:false},
                                {id:"2",name3:"删除",ifCheck:false},
                                {id:"3",name3:"修改",ifCheck:false}
                              ]
                        }                        
                     ]
                },
                
                 {id:"2",
                name1:"宴会酒店",
                ifCheck:false,
                list1:[
                        {id:"1",
                        name2:"宴会酒店",
                        ifCheck:false,
                        list2:[
                                {id:"1",name3:"增加",ifCheck:false},
                                {id:"2",name3:"删除",ifCheck:true},
                                {id:"3",name3:"修改",ifCheck:false},
                                {id:"4",name3:"授权",ifCheck:true}
                            
                              ]
                        },
                        {id:"2",
                        name2:"酒店分类",
                        ifCheck:false,
                        list2:[
                                {id:"1",name3:"增加",ifCheck:false},
                                {id:"2",name3:"删除",ifCheck:false},
                                {id:"3",name3:"修改",ifCheck:false}
                              ]
                        }                        
                     ]
                },
            ],
            curentCookie:"",
            multipleSelection: [], //多选框的选中的list
            /***  上线是权限*** */
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
             rootList:[],
             rootObj:{},
             uData:{},
             permitListAll:[],
             dialogVisible:false,
             dialogVisible2:false,
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


        //授权和查看权限
           permit(index){
               console.log("111111111111111111",this.list[index].id)
               this.dialogVisible2=true
            this.changeIndex=index;  
            // 所有的权限

            postRequest(url.urFindAllRootById, {
                    userId:this.list[index].id
                }).then(data=> {
                        console.log("权限查询所有66666",data.data.data.root)
                        // this.permitListAll=data.data.data;
                        this.permitList=data.data.data.root
                        
                        
              });


           },

           submitPermit(index){
               let checklist1=[]; //大菜单的选中的id
               let checklist2=[]; //二级菜单的选中的id
               let checklist3=[]; //小权限的选中的id
               let list1=this.permitList
                for(let i=0;i<list1.length;i++){
                    if(list1[i].status){
                        checklist1.push(list1[i].id)
                    }
                    let list2=list1[i].menus
                    for(let j=0;j<list2.length;j++){
                        if(list2[j].status){
                            checklist2.push(list2[j].id)
                        }     
                        let list3=list2[j].root
                        for(let k=0;k<list3.length;k++){
                            if(list3[k].status){
                                checklist3.push(list3[k].id)
                            }   
                        }
                    }

                }


                console.log("提交显示的id",11111111111111,checklist1,22222222222222222,checklist2,333333333333,checklist3)
                let idString3 = ""
                for(let i=0 ;i <checklist3.length;i++){
                        idString3+=checklist3[i]+","
                }
                idString3 = idString3.substr(0, idString3.length - 1);
                console.log("idString3%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",idString3)
                

                console.log("当前里面的为哦那个",idString3)
                //提交请求
               if(idString3==""){
                   this.$alert("至少选择一个权限");
                    return
               }
               
                postRequest(url.ujaInsert, {
                    userId:this.list[index].id,
                    jurisdictionId:idString3
                }).then(data=> {
                        console.log("提交权限查询所有111111111111111111111",data)
                       const h = this.$createElement;
                                      this.$notify({
                                            title: '修改状态',
                                            message: h('i', { style: 'color: teal'}, '提交成功~')
                                            });
                        this.dialogVisible2=false 
                        
              });





           },
        // 取消操作
         cancelPermit(){
            this.dialogVisible2=false 
         }  ,
        
        //点击一级菜单的checkbox
        checkPermit1(index,bl){ //checkBox 一个大模块全选，和全不选
            console.log(index,bl,this.permitList,"99999999999999999999999999999999999999999")
            if(bl){
                let permitList1=this.permitList[index].menus //抽取第一个list1
                for(let i=0;i<permitList1.length;i++){
                    permitList1[i].status=true
                    for(let j=0;j<permitList1[i].root.length;j++){
                            permitList1[i].root[j].status=true
                    }
                }

                
            }

            if(!bl){
                let permitList1=this.permitList[index].menus //抽取第一个list1
                for(let i=0;i<permitList1.length;i++){
                    permitList1[i].status=false
                    for(let j=0;j<permitList1[i].root.length;j++){
                            permitList1[i].root[j].status=false
                    }
                }
            
                
            }

            console.log("选中所有的checkbox",this.permitList)
        },

//点击二级菜单的checkbox
     checkPermit2(index1,index2,bl){ //checkBox 一个大模块全选，和全不选
            console.log(index1,index2,bl,this.permitList,"99999999999999999999999999999999999999999")
            if(bl){
                    this.permitList[index1].status=true
                    let permitList2=this.permitList[index1].menus[index2].root //抽取第二个list2
                    for(let i=0;i<permitList2.length;i++){
                            permitList2[i].status=true
                    }

            }

            if(!bl){
               let permitList2=this.permitList[index1].menus[index2].root //抽取第二个list2
                    for(let i=0;i<permitList2.length;i++){
                            permitList2[i].status=false
                    }
            }

            console.log("选中所有的checkbox",this.permitList)
        },

 //点击三级菜单的checkbox
    checkPermit3(index1,index2,index3,bl){
        if(bl){
            this.permitList[index1].status=true
            this.permitList[index1].menus[index2].status=true
        }
        console.log("选中所有的checkbox",this.permitList)
        
    },






 /***************上面是权限的弹窗*******************/       

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

                postRequest(url.urResetPasswords, {
                    id:this.list[index].id ,
                    pageNum: this.currentPage,
                }).then(data=> {
                        console.log("初始化密码打印的数据",data)
                        let datas=data.data.data;
                         this.options1=datas.list
                         let pageNums=datas.pages*10
                        
                         this.pageNum=pageNums
                         this.$alert('初始化后的密码为'+data.data.data);
                         
                        
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

            postRequest(url.roleFindAllRoelName, {
                   name:getCookie("roleName") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.options1=datas
                      
                        
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

            postRequest(url.roleFindAllRoelName, {
                   name:getCookie("roleName") 
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                         this.options1=datas
                      
                        
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

            if(!isEmial(this.email)){
                this.$message({
                            type: 'info',
                            message: '请输入正确的邮箱'
                        });  
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


              
            function isEmial(str) {
                    var myreg= /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    if (!myreg.test(str)) {
                            return false;
                    } else {
                            return true;
                    }
            }
            },
/**
 * **********************************************************下面的都是查询************************************************************************
 * */  
         goSearch(){//搜索
                postRequest(url.urFindAllUser, {
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
                console.log("删除的index66666666666666666666666666666666666",this.list[index].userId);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            postRequest(url.urDeleteUser, {
                                userId:this.list[index].id
                                }).then(data=> {
                                        console.log("打印的数据",data)
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

                            postRequest(url.urDeleteUser, {
                                userId:chooseStr
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
                postRequest(url.urFindAllUser, {
                                
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

        this.curentCookie=getCookie("roleName")
        console.log("8888888888888888888888888888",getCookie("roleName"))
        
        postRequest(url.urFindAllUser, {
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


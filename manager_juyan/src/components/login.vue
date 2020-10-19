<template>

         
    <div class="login ">
           <div class="pop">
               <el-form ref="form" :model="form">
            <div class="d-cha"><a class="cha" href="#" ></a></div>
            <div class="tite-name">登录</div>
            <div class="pop-content">
                <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="strName"
                    
                    @keyup.native.enter="loginEnter"
                    clearable>
                    <template slot="prepend">账号</template>
                </el-input>
                <el-input  class="pop-text ipt-style"
                    placeholder="请输入内容"
                    v-model="strPass"
                    type="password"
                   @keyup.native.enter="loginEnter"
                    clearable>
                    <template slot="prepend">密码</template>
                </el-input>
              
                 <!-- <el-form-item label="记住密码">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item> -->
                 <el-button class="pop-btn ipt-style" :plain="true"  type="danger" @click="login()">登录</el-button>
                 <div class="loading" v-show="showLoad">
                     <i class="el-icon-loading"></i><i class="load-text">登录中请稍后~~~~</i>
                 </div>
            </div>
            </el-form>
        </div>
    </div>            
     
</template>

<script>
import {postRequest} from '../utils/api';
import url from '../utils/url';
import {setCookie,getCookie,delCookie} from '../utils/utils';
import bus from '../utils/eventBus';
import sessionStorage from '../utils/sessionStorage'
export default {
    
    data(){
        return{
                form:{
                     delivery: true,
                },
                strName:"",
                strPass:"",
                isShow:false,
                showLoad:false,
        //                 list:[
        // {
        //  "status":true, 
        //  "id": "1",
        //  "name": "系统管理",
        //  "menus": [

        //           { "id": "01","status":true, "name": "后台用户信息","expres":"userMessage"},
        //           { "id": "02","status":true, "name": "普通会员信息","expres":"wUserMessage" },
        //           { "id": "03","status":true, "name": "酒店会员信息","expres":"wUserMessage2" },
        //           { "id": "04","status":true, "name": "角色信息","expres":"roleManage" }
        //          ]
        // },
 
        // {

        // "status":true, 
        // "id": "2", 
        // "name": "宴会酒店",
        // "menus": [
        //           { "id": "01","status":true, "name": "宴会酒店","expres":"wHotel"},
        //           { "id": "02","status":true, "name": "酒店描述","expres":"hotelDescribe"},

        //        ]
        // },
        //                 ]
            //     list:[
            //         { "isSubShow":["1"],
            //         "status":true, 
            //         "isA":false,
            //         "isB":true,
            //         "iconfont":"iconfont xitongguanli",
            //         "id": "1",  "name": "系统管理",
            //         "menus": [

            //                 { "id": "01","status":true, "name": "后台用户信息","expres":"userMessage","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"root":true}]},
            //                 { "id": "02","status":true, "name": "普通会员信息","expres":"wUserMessage","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
            //                 { "id": "03","status":true, "name": "酒店会员信息","expres":"wUserMessage2","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
                        
            //                 { "id": "04","status":true, "name": "角色信息","expres":"roleManage","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] }
            //                 ]
            //         },
        
            //         {
            //             "isSubShow":["2"],
            //             "status":true, 
            //             "isA":false,
            //             "isB":true,
            //             "iconfont":"iconfont tupianguanli",
            //             "id": "2",  "name": "宴会酒店",
            //             "menus": [
            //                     { "id": "01","status":true, "name": "宴会酒店","expres":"wHotel","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
            //                     { "id": "02","status":true, "name": "酒店描述","expres":"hotelDescribe","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},

            //                 ]
            //         },
            //         {
            //             "isSubShow":["3"],
            //             "status":true, 
            //             "isA":false,
            //             "isB":true,
            //             "iconfont":"iconfont tupianguanli",
            //             "id": "3",  "name": "独立策划师",//以前的婚礼策划
            //             "menus": [

            //                     { "id": "01","status":true, "name": "独立策划师","expres":"wScheme","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
            //                     { "id": "02","status":true, "name": "作品分类","expres":"wSchemeClassify","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
                                
            //                 ]
            //         },

            // // {
            // //     "isSubShow":["4"],
            // //     "status":true, 
            // //     "isA":false,
            // //     "isB":true,
            // //     "iconfont":"iconfont tupianguanli",
            // //     "id": "5",  "name": "四大金刚",
            // //     "menus": [

            // //               { "id": "01","status":true, "name": "司仪","expres":"wEmcee","iconTwo":"iconfont yonghuxinxi" },
            // //               { "id": "02","status":true, "name": "跟妆","expres":"wDresser","iconTwo":"iconfont yonghuxinxi" },
            // //               { "id": "03","status":true, "name": "摄影","expres":"wShoot","iconTwo":"iconfont yonghuxinxi" },
            // //               { "id": "04","status":true, "name": "摄像","expres":"wCamera","iconTwo":"iconfont yonghuxinxi" },
            // //            ]
            // // },

            //         {
            //             "isSubShow":["4"],
            //             "status":true, 
            //             "isA":false,
            //             "isB":true,
            //             "iconfont":"iconfont tupianguanli",
            //             "id": "4",  "name": "摄影旅拍",//以前的婚纱照
            //             "menus": [

            //                     { "id": "01","status":true, "name": "摄影旅拍","expres":"wPicture","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
            //                 ]
            //         },
            //         {
            //             "isSubShow":["5"],
            //             "status":true, 
            //             "isA":false,
            //             "isB":true,
            //             "iconfont":"iconfont tupianguanli",
            //             "id": "5",  "name": "婚礼用品",//以前的婚礼花艺
            //             "menus": [

            //                     { "id": "01","status":true, "name": "婚礼用品","expres":"wFlower","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
            //                     { "id": "02","status":true, "name": "作品分类","expres":"wFlowerClassify","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
                                
            //                 ]
            //         },
            
            

            // //  {
            // //     "isSubShow":["7"],
            // //     "status":true, 
            // //     "isA":false,
            // //     "isB":true,
            // //     "iconfont":"iconfont tupianguanli",
            // //     "id": "7",  "name": "婚礼礼服",
            // //     "menus": [

            // //               { "id": "01","status":true, "name": "婚礼礼服","expres":"wDress","iconTwo":"iconfont yonghuxinxi" },
            // //            ]
            // // },

            //         {
            //         "isSubShow":["6"],
            //         "status":true, 
            //         "isA":false,
            //         "isB":true,
            //         "iconfont":"iconfont tupianguanli",
            //         "id": "6",  "name": "banner管理",
            //         "menus": [
                            
            //                 { "id": "01","status":true, "name": "banner管理","expres":"wBanner","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
            //             ]
            //       },        
            //             {
            //                 "isSubShow":["7"],
            //                 "status":true, 
            //                 "isA":false,
            //                 "isB":true,
            //                 "iconfont":"iconfont tupianguanli",
            //                 "id": "7",  "name": "城市管理",
            //                 "menus": [

            //                         { "id": "01","status":true, "name": "市区管理","expres":"wCity","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true}] },
            //                         { "id": "02","status":true, "name": "县城（区）管理","expres":"wCity2","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
            //                     ]
            //             },
            //             {
            //                 "isSubShow":["8"],
            //                 "status":true, 
            //                 "isA":false,
            //                 "isB":true,
            //                 "iconfont":"iconfont tupianguanli",
            //                 "id": "8",  "name": "数据管理",
            //                 "menus": [

            //                         { "id": "01","status":true, "name": "小程序数据","expres":"weiXin","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true},{"exportExcel":true}] },
            //                         { "id": "02","status":true, "name": "聚宴家数据","expres":"wLookHall","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true},{"exportExcel":true}] },
            //                     ]
            //             },
            //             {
            //                 "isSubShow":["9"],
            //                 "status":true, 
            //                 "isA":false,
            //                 "isB":true,
            //                 "iconfont":"iconfont tupianguanli",
            //                 "id": "9",  "name": "类型管理",
            //                 "menus": [

            //                         { "id": "01","status":true, "name": "类型管理","expres":"wType","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
            //                         { "id": "02","status":true, "name": "风格管理","expres":"wStyle","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true}]},
                                    
            //                     ]
            //             },

            //             {
            //                 "isSubShow":["10"],
            //                 "status":true, 
            //                 "isA":false,
            //                 "isB":true,
            //                 "iconfont":"iconfont tupianguanli",
            //                 "id": "10",  "name": "客户端意愿调查",
            //                 "menus": [

            //                         { "id": "01","status":true, "name": "问卷调查","expres":"questionnaire","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"exportExcel":true}]},
            //                         { "id": "02","status":true, "name": "问卷调查2","expres":"questionnaire2","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"exportExcel":true}]},
            //                         { "id": "03","status":true, "name": "会员推荐","expres":"recommend","iconTwo":"iconfont yonghuxinxi","root":[{"delete":true},{"insert":true},{"exportExcel":true}] },
                                    
            //                     ]
            //             },
            //             {
            //                 "isSubShow":["11"],
            //                 "status":true, 
            //                 "isA":false,
            //                 "isB":true,
            //                 "iconfont":"iconfont tupianguanli",
            //                 "id": "11",  "name": "权限管理",
            //                 "menus": [
                                    
            //                         { "id": "01","status":true, "name": "主菜单","expres":"mainMenu","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"update":true}]},
            //                         { "id": "02","status":true, "name": "子菜单","expres":"submenu","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"update":true}]},
            //                         { "id": "03","status":true, "name": "小权限","expres":"rootMenu","iconTwo":"iconfont yonghuxinxi" ,"root":[{"delete":true},{"insert":true},{"update":true}]},
                                    
            //                     ]
            //             },

            //         ] 
            }
        },



    methods:{
        loginEnter() {

           // 登录前先清除所有的cookie和sessionstorage
                    
            sessionStorage.removeSessionStorage('footList')                 
                    delCookie('token');  
                    delCookie('userId'); 
                    delCookie('username'); 
                    delCookie('roleName'); 


            bus.$emit("footList",this.list)
                    if(this.strName==""||this.strPass==""){
                       this.$message({
                        showClose: true,
                        message: '字符不能为空'
                     });
                    
                    
            }else{

              this.showLoad=true;
               postRequest(url.urLogin, {
                    username: this.strName,
                    password: this.strPass
                }).then(data=> {
                        console.log("登录打印的数据",data)
                        this.showLoad=false;
                      
                       
                        if(data.data.msg=="OK"){
                             console.log(data.data.data,"1111111111")


                                    //   bus.$emit("footList",data.data.data.list)
                                    //   let listString=JSON.stringify(data.data.data.list)
                                    //   console.log("登录成功后答应的数据11111111111111111111",data.data.data)
                                    

                                    //   sessionStorage.putSessionStorage('footList',listString)
                                      setCookie('token',data.data.data.token,100000);  
                                      setCookie('userId',data.data.data.id,100000); 
                                      setCookie('username',data.data.data.username,100000); 
                                      setCookie('roleName',data.data.data.roleName,100000); 
                                      
                             this.$router.push({ path: '/home' })
                                const h = this.$createElement;
                                      this.$notify({
                                            title: '登录状态',
                                            message: h('i', { style: 'color: teal'}, '登录成功~')
                                            });
                                
                        }else{
                            this.$alert(data.data.msg);
                        }
                        
                    });         
                

            }
         },
        login:function(){
            // 登录前先清除所有的cookie和sessionstorage
            console.log("打印的登录用户数据,",this.strName,this.strPass,"999999999999999999999")
                    sessionStorage.removeSessionStorage('footList')                 
                    delCookie('token');  
                    delCookie('userId'); 
                    delCookie('username'); 
                    delCookie('roleName'); 

          


            if(this.strName==""||this.strPass==""){
                       this.$message({
                        showClose: true,
                        message: '字符不能为空'
                     });
                    
            }else{
                
               this.showLoad=true;
               postRequest(url.urLogin, {
                    username: this.strName,
                    password: this.strPass
                }).then(data=> {
                 
                 console.log("登陆成功数据",data)

                if(!data.data){
                        if(data.response.status==500 || data.response.status==401){
                            console.log("66666666666666666666666666",500)

                             postRequest(url.urLogin, {
                                username: this.strName,
                                password: this.strPass
                            }).then(data=> {


                                 if(data.data.msg=="OK"){
                             console.log(data.data.data,"1111111111")
                                    bus.$emit("footList",data.data.data.list)
                                    let listString=JSON.stringify(data.data.data.list)
                                    console.log("登录成功后答应的数据11111111111111111111",data.data.data)
                                    

                                      sessionStorage.putSessionStorage('footList',listString)
                                     
                                      setCookie('token',data.data.data.token,100000);  
                                      setCookie('userId',data.data.data.id,100000); 
                                      setCookie('username',data.data.data.username,100000); 
                                      setCookie('roleName',data.data.data.roleName,100000); 
                             this.$router.push({ path: '/home' })
                                const h = this.$createElement;
                                      this.$notify({
                                            title: '登录状态',
                                            message: h('i', { style: 'color: teal'}, '登录成功~')
                                            });
                                
                        }else{
                            this.$alert(data.data.msg);
                        }
                            })
                           
                        }

                        }


                        console.log("登录打印的数据",data)
                        this.showLoad=false;
                       
                       
                        if(data.data.msg=="OK"){
                             console.log(data.data.data,"1111111111")
                                    bus.$emit("footList",data.data.data.list)
                                    let listString=JSON.stringify(data.data.data.list)
                                    console.log("登录成功后答应的数据11111111111111111111",data.data.data)
                                    

                                      sessionStorage.putSessionStorage('footList',listString)
                                     
                                      setCookie('token',data.data.data.token,100000);  
                                      setCookie('userId',data.data.data.id,100000); 
                                      setCookie('username',data.data.data.username,100000); 
                                      setCookie('roleName',data.data.data.roleName,100000); 
                             this.$router.push({ path: '/home' })
                                const h = this.$createElement;
                                      this.$notify({
                                            title: '登录状态',
                                            message: h('i', { style: 'color: teal'}, '登录成功~')
                                            });
                                
                        }else{
                            this.$alert(data.data.msg);
                        }
                        
                    }); 
            
            }
            
        }
    },

    created:function(){


    }
}
</script>
<style scoped>


.load-text{
    font-size: 14px;
}
.loading{
    text-align: center;
    margin-top: 20px;
    font-size: 40px;
}
.login{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 45px;
    
    background: #9AA2AE;
}
.pop{
    background:white;
    width: 40%;
    height: 40%;
    
    margin: 0 auto;
    margin-top:15%;
   
}
.pop-content{
    padding-top: 5%;
    width: 80%;
    margin: 0 auto;
}
.ipt-style{
    margin-top: 3%;
}
.pop-btn{
    width: 100%;
}
.cha{
    float: right;
    width: 5%;;
    height: 2%;
    text-align: center;
    font-size: 20px;
   
}
.tite-name{
    margin-top: 3%;
    text-align: center;
    font-size: 16px;
}
.d-cha{
    overflow: hidden;
}


</style>


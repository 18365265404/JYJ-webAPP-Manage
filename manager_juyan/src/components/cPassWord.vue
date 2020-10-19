<template>
    
    <div class="cPassWord ">
           <div class="pop">
            <div class="d-cha"><a class="cha" href="#" ></a></div>
            <div class="tite-name">修改密码</div>
            <div class="pop-content">
                <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="oldPW"
                    type="password"
                    clearable>
                    <template slot="prepend">原密码</template>
                </el-input>
                <el-input  class="pop-text ipt-style"
                    placeholder="请输入内容"
                    v-model="newPW"
                    type="password"
                    clearable>
                    <template slot="prepend">新密码</template>
                </el-input>
                <el-input class="pop-text ipt-style"
                    placeholder="请输入内容"
                    v-model="newPWagin"
                    type="password"
                    clearable>
                    <template slot="prepend">确认新密码</template>
                </el-input>
                 
                 <el-button class="pop-btn ipt-style" :plain="true"  type="danger" @click="changePW()">确认修改</el-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cPassWord{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 50px;
    
    background: black;
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
<script>
import url from '../utils/url';
import {postRequest} from '../utils/api';
import {getCookie,delCookie} from '../utils/utils';
export default {
    data(){
        return{
            oldPW:"",
            newPW:"",
            newPWagin:"",
            list:[]
        }
    },
    methods:{
        changePW:function(){
           
           console.log("老密码",this.oldPW)
           console.log("新密码",this.newPW)
           console.log("id",getCookie("userId"))
            if(this.oldPW==""||this.newPW==""||this.newPWagin==""){
                     this.$message({
                        showClose: true,
                        message: '请您填写正确信息'
                     });
            }else if(this.newPW!=this.newPWagin){
                        this.$message({
                        showClose: true,
                        message: '密码不一致，请重新输入'
                     });
            }else if(this.oldPW==this.newPW||this.oldPW==this.newPWagin){
                        this.$message({
                        showClose: true,
                        message: '新密码不能与旧密码相同'
                     });
            }else{
                // 请求数据

            postRequest(url.urUpdateUserPassword, {
                    id:getCookie("userId"),
                    password: this.oldPW,
                    newPassword: this.newPW, 
                }).then(data=> {
                    console.log("修改密码成功打印的数据66666666666666666",data)
                
                         postRequest(url.urLoginOut, {

                            }).then(data=> {
                        console.log("退出的打印的数据",data)

                            delCookie("token")
                            delCookie("username")
                            delCookie("userId")
                            this.$router.push({ path: '/login' });

                            
                           const h = this.$createElement;
                               this.$notify({
                               title: '',
                               message: h('i', { style: 'color: teal'}, '修改密码成功，请重新登录')
                           });           
                     });
                                    
             });
            // this.$ajax(
            //       url.root()+url.userUpdatePasswordByUser(),{
            //     //    '/static/data/list.json',{
                      
            //         method: 'post',
            //         params: {
            //             id:getCookie("userId"),
            //             token:getCookie("token"),
            //             password: this.oldPW,
            //             newPassword: this.newPW,                      
            //         }                      
            //        }).then((response) => {
                   
            //         var data=response.data;
            //         var status=data.status;
            //         switch(status){
            //             case 400:
            //                 this.$alert(data.msg);
            //                 this.$router.push({ path: '/login' })
            //                 break
            //                 case 401:
            //                      this.$alert(data.msg);   
            //                      this.showLoad=false
            //                 break;
            //                 case 555:
            //                     this.$alert(data.msg);                              
            //                     this.showLoad=false
            //                 break;
            //                 case 500:
            //                     this.$alert('sorry，请求异常，请稍后重试');                              
            //                     this.showLoad=false
            //                 break;
            //                 case 200://请求成功
            //                 //  console.log("请求成功的数据",data.data)

            //                       this.$ajax(
            //                             url.root()+url.lnLoginOut(),{
            //                                 method:"post",
            //                                 params: {
            //                                 token:getCookie("token"),
            //                                 }
            //                             } ).then((response) => {
            //                                     delCookie("token")
            //                                     delCookie("username")
            //                                     delCookie("userId")
            //                                     this.$router.push({ path: '/login' });

                            
            //                                 const h = this.$createElement;
            //                                             this.$notify({
            //                                                     title: '',
            //                                                     message: h('i', { style: 'color: teal'}, '修改密码成功，请重新登录')
            //                                                 });
                                        
            //                             }, (response) => {
            //                             console.log('error');
                        
            //                             });


            //                                         break;
            //                                 }
            //                             }, (response) => {
            //                                 switch(response.response.status){
            //                                     case 400:
            //                                     this.$message({
            //                                             type: 'error',
            //                                             message: "登录信息已过期，请重新登录"
            //                                             });

            //                                             this.$router.replace({ path: 'login' })
            //                                         break
            //                                     default:
            //                                         this.$message({
            //                                             type: 'error',
            //                                             message: "请求错误，请重试"
            //                                             });
            //                                     break;    
                                            
            //                             }
            //                             }); 


            }
            
        }
    }
}
</script>

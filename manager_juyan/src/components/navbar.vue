<template>
    <header class="headers">
        <div class="name-vaerson">聚宴家管理系统1.0</div>
        <div class="user-name" v-show="userNameS"><span>用户：</span> <span @click="userName">{{userData.username}}  </span></div>  
        <ul class="person" v-show="personStatus">
          <li @click="changePW()" >修改密码</li>
          <!-- <router-link tag="li" @click="changePW()" to="/cPassWord">修改密码</router-link> -->
          <li @click="logout()">退出</li>
        </ul>

      </header>
</template>


<script>
import url from '../utils/url';
import {postRequest} from '../utils/api';
import {getCookie,delCookie} from '../utils/utils';
export default {
  data(){
    return{
      userData:{
            username:"",
            
      },
      personStatus:false,
      userNameS:false,
    }
  },
   created:function(){
        console.log("每次都刷新的create")
        var username=getCookie("username");
        this.userData.username=username
        let  path = window.location.href
       let newPath = path.split('/#/')[1];
        if(newPath=="login"){
            this.userNameS=false
        }else{
            if(username){
          this.userNameS=true
        }
        }
        
        
  },

  methods:{
    userName:function(){
      this.personStatus=!this.personStatus
    },
    logout:function(){
               postRequest(url.urLoginOut, {
                    
                }).then(data=> {
                        console.log("打印的数据",data)
                        delCookie('token')
                        delCookie('userId')
                        delCookie('username')
                         this.$router.push({ path: '/login' });
                         this.personStatus=false;
                         this.userNameS=false;
                         this.userData.name="请登录";
                         const h = this.$createElement;
                                this.$notify({
                                        title: '',
                                        message: h('i', { style: 'color: teal'}, '退出成功')
                                    });
                        
                    });

 
    },
    changePW:function(){
      this.personStatus=false;
     this.$router.push({ path: '/cPassWord' });
    }
  },

    watch:{
    // data的数据名(){数据变化，函数就会调用}
    $route:function(newValue,oldValue){
      let path = newValue.path;


      if(path!="/login"){
     
        console.log("发生变化了",path)
       var username=getCookie("username");
          if(username){
              this.userData.username=username;
              this.userNameS=true
          }else{
            this.userNameS=false;

          }
      }else{
          this.userNameS=false;
      }


    }
  },

}
</script>


<style scoped>
.headers{

  height: 5%;
  width: 100%;
  overflow: hidden;
  background: rgb(20, 17, 17);
}
.person{
  border: 1px solid #cccccc;
  position: absolute;
  background: white;
  right: 2%;
  height: 100px;
  top: 50px;
  z-index: 200;
  text-align: center;
  display: block;
  cursor: pointer;
}
.person li{
  line-height: 50px;
  cursor: pointer;
}
.person li:nth-child(1){
  border-bottom: 1px solid #cccccccc;
}

.name-vaerson{
  float: left;
  margin-left: 10px;
  line-height: 50px;
  color: white;
}
.user-name{
  cursor: pointer;
  color: white;
  float: right;
  line-height: 50px;
  margin-right: 2%;
}
.person li:hover {
    cursor: pointer;
    background: #cccccc;
}
</style>
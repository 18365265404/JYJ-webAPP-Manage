<template>
  <div class="foot-btn" >
   <div class="navigation-left">
     
      <el-menu   class="title-list" :unique-opened="true"  :default-openeds="openeds">

        <el-submenu  v-show="item.status"  :index="item.id" @click="showToggle(item,index)" v-for="(item,index) of list" :key="item.index">
          <template slot="title" class="one-menue-title" style="width:200px">
            <i :class="item.iconfont" style="font-size:18px;line-height:18px;"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group class="two-page-box" style="width:200px;overflow: hidden" >  
               <el-menu-item id="two-menue-li" style="overflow: hidden;" v-show="item.status" :index="item.id" v-for="item of item.menus" :key="item.id" >
                                                                   <!-- <router-link :to="'/detail/'+item.id+'?dataName='+dataName"> -->
                 <router-link active-class="home1" class="name-text" tag="span" :to="`/${item.expres}/?root=${JSON.stringify(item.root)}`" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i :class="item.iconTwo">&nbsp;&nbsp;</i>{{item.name}}</router-link>
               </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
        
       
      </el-menu>
  </div>
  </div>
</template>

<script>
import {getCookie} from '../utils/utils';
import bus from '../utils/eventBus';
import sessionStorage from '../utils/sessionStorage'

export default {
    data(){
      return{
        //  isCollapse: true,
        router:true,
        openeds:["0"]//默认打开的
        ,
        list:[]

      };
    },
     methods: {

          showToggle:function(item){ 
            
          },





    },
    mounted(){
        let that=this
        bus.$on("footList",function(msg){
          console.log("传过来的list显示",msg)
          that.list=msg
        })
    },
    created(){


     let footList= sessionStorage.getSessionStorage("footList")
     if(!footList){
              console.log("9999999999999999999999999999999999999999999999999999999999999999999",footList)
          return
      }
     var lists =JSON.parse(footList)
     console.log("111111111111111111111",lists)
     this.list=lists
      // this.list= getCookie("footList")
      if(getCookie("username")){
            
      }
      //用来管理浏览器刷新，保存路由状态
       var  path = window.location.href
       var newPath = path.split('/#/')[1];

  
      if(newPath=="userMessage"||newPath=="wUserMessage"||newPath=="roleManage"){
        
        this.openeds=["1"]
      }
      if(newPath=="wHotel"){
      
        this.openeds=["2"]
      }
      if(newPath=="wScheme"){
      
        this.openeds=["3"]
      }
      if(newPath=="wPicture"){
      
        this.openeds=["4"]
      }
      if(newPath=="wFlower"){
      
        this.openeds=["5"]
      }
      if(newPath=="wBanner"){
      
        this.openeds=["6"]
      }
      if(newPath=="wCity" || newPath=="wCity2"){
      
        this.openeds=["7"]
      }
      if(newPath=="weiXin" || newPath=="wLookHall"){
      
        this.openeds=["8"]
      }
      if(newPath=="wType" || newPath=="wStyle"){
      
        this.openeds=["9"]
      }
      if(newPath=="questionnaire" || newPath=="recommend"){
      
        this.openeds=["10"]
      }
    
      // // 不同用户显示不同类容
      // var username=getCookie("username");
      // if(username=="系统管理员"){
      //       this.list[0].status=true;

      //   }else{
      //         this.list[0].status=false;
      //   }
    },

      watch:{
    // data的数据名(){数据变化，函数就会调用}
    $route:function(newValue,oldValue){
      let path = newValue.path;
            var username=getCookie("username");
          
      // if(!/login|cPassWord/.test(path) && username!=null){

      //   if(username=="系统管理员"){
      //       this.list[0].status=true;

      //   }else{
      //         this.list[0].status=false;
      //   }
      //     console.log("进入这页面了")
      // }

    }
  },

  };
  


</script>

<style scoped>
.one-menue-title{
  width: 40px;
  background: red
}
.name-text{
  color: #333;
  background: white;
  width:100%;
  overflow: hidden;
 
  
  
}
.name-text:hover{
  background: #ECF5FF;
}
.home1{

  color: #66B1FF;
  background: #ECF5FF
}
.home1 i{
  color: #66B1FF;
}
.foot-btn{
    float: left;
    
    
    width: 200px;
    
  overflow-y: scroll;
   overflow: hidden;

}

.navigation-left{
  position: fixed;
  width:200px; 
  height: 95%;
  border-right: 1px  solid #cccccc;
  overflow-x: hidden;;
  overflow-y: scroll;
}
.two-page-box{
  margin-top: -13px;
  
 
}
/* #two-menue-li{

  overflow: hidden;
   padding-right: 0;
  padding-left: 0;
} */
.title-list{
  
  border-right: none;
  margin-right: 2px;
  
}
.name-text{
  position: absolute;
  left: 0;
 
  display: block;
 
  
  
  
}

</style>

<template>
  <div id="app">
      <loading v-show="bLoading"></loading>   
        <navbar></navbar>


    <footbar v-show="bFoot" ></footbar>
        <router-view></router-view>

   
  </div>
</template>

<script>

import navbar from './components/navbar'
import footbar from './components/footbar'
import { mapGetters} from 'vuex';


export default {
  name: 'App',
    data(){
    return{
      
    }
  },
  components:{
    navbar,footbar
  },
    computed:mapGetters([
    'bFoot',"bLoading"
  ]),

//    watch:{
//     // data的数据名(){数据变化，函数就会调用}
//     $route:function(newValue,oldValue){
//       let path = newValue.path;


//       if(/login|cPassWord/.test(path)){
//         this.$store.dispatch('HIDE_FOOT');
//       }
// /*********************当处于登录在线状态的时候，不能返回跳入login页*************************** */
//       if(/login/.test(path)){

//         var username=getCookie("username");
       
//           if(username){
//             // this.$router.push({ path: '/home' })
//         }
//       }
//       if(!/login/.test(path)){
//         this.$store.dispatch('SHOW_FOOT');
       

        

   
//       }


//     }
//   },
  
}
</script>




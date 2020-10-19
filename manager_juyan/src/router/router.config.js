import home from '../components/home.vue';
import login from '../components/login.vue';
import error from '../components/error.vue';


import cPassWord from '../components/cPassWord.vue';
import userMessage from '../components/userMessage.vue';
import wUserMessage from '../components/wUserMessage.vue';

import EditNew from '../components/EditNew.vue';
import roleManage from '../components/roleManage.vue';
import wHotel from '../components/wHotel.vue';

import wFlower from '../components/wFlower.vue';

import wPicture from '../components/wPicture.vue';
import wEmcee from '../components/wEmcee.vue';
import wDresser from '../components/wDresser.vue';
import wShoot from '../components/wShoot.vue';
import wCamera from '../components/wCamera.vue';
import wScheme from '../components/wScheme.vue';
import wDress from '../components/wDress.vue';
import wBanner from '../components/wBanner.vue';
import wCity from '../components/wCity.vue';
import wCity2 from '../components/wCity2.vue';
import weiXin from '../components/weiXin.vue';
import wLookHall from '../components/wLookHall.vue';
import wType from '../components/wType.vue';
import wStyle from '../components/wStyle.vue';
import questionnaire from '../components/questionnaire.vue';
import questionnaire2 from '../components/questionnaire2.vue';
import questionnaire3 from '../components/questionnaire3.vue';

import recommend from '../components/recommend.vue';

import wUserMessage2 from '../components/wUserMessage2.vue';

import hotelDescribe from '../components/hotelDescribe.vue';
import wSchemeClassify from '../components/wSchemeClassify.vue';
import wFlowerClassify from '../components/wFlowerClassify.vue';
import submenu from '../components/submenu.vue';
import mainMenu from '../components/mainMenu.vue';
import rootMenu from '../components/rootMenu.vue';
import HotelPush from '../components/HotelPush.vue';
import pcForm from '../components/pcForm.vue';











let routes=[
  {path:'/home',component:home},
  {path:'/login',component:login},
  {path:'/cPassWord',component:cPassWord},  
  {path:'/EditNew',component:EditNew},
  {path:'/userMessage',component:userMessage},
  {path:'/wUserMessage',component:wUserMessage},
  
  {path:'/roleManage',component:roleManage},
  {path:'/wHotel',component:wHotel},
 
  {path:'/wFlower',component:wFlower},
  {path:'/wPicture',component:wPicture},
  {path:'/wEmcee',component:wEmcee},
  {path:'/wDresser',component:wDresser},
  {path:'/wShoot',component:wShoot},
  {path:'/wCamera',component:wCamera},
  {path:'/wScheme',component:wScheme},
  {path:'/wDress',component:wDress},
  {path:'/wBanner',component:wBanner},
  {path:'/wCity',component:wCity},
  {path:'/wCity2',component:wCity2},
  {path:'/weiXin',component:weiXin},
  {path:'/wLookHall',component:wLookHall},
  {path:'/wType',component:wType},
  {path:'/wStyle',component:wStyle},
  {path:'/questionnaire',component:questionnaire},
  {path:'/questionnaire2',component:questionnaire2},
  {path:'/questionnaire3',component:questionnaire3},
  {path:'/recommend',component:recommend},
  {path:'/wUserMessage2',component:wUserMessage2},
  {path:'/hotelDescribe',component:hotelDescribe},

  {path:'/wSchemeClassify',component:wSchemeClassify},
  {path:'/wFlowerClassify',component:wFlowerClassify},
  {path:'/submenu',component:submenu},
  {path:'/mainMenu',component:mainMenu},
  {path:'/rootMenu',component:rootMenu},
  {path:'/HotelPush',component:HotelPush},
  {path:'/pcForm',component:pcForm},
  
  
  
  
  
  
  
  
  
  
  {path:'/',redirect: '/login'},
  {path:'*',component:error}
]



// export default routes;
export default {routes}
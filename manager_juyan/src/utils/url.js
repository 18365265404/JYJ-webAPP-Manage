// 接口汇总
//服务器地址

// const server = 'http://192.168.1.98:8099/'; //本地崇阳地址
// const server = 'http://106.15.187.138:8085/'; //测试尚文忠地址
const server = 'http://47.100.237.163:8085/'; //正式地址   //

/** 添用户管理**/
const urLogin = 'ur/login';
const urLoginOut = 'ur/loginOut';
const urFindAllUser = 'ur/findAllUser';
const urCheckUsername = 'ur/CheckUsername';
const urInsertUser = 'ur/insertUser';
const urUpdateUser = 'ur/updateUser';
const urDeleteUser = 'ur/deleteUser';
const urResetPasswords = 'ur/resetPasswords';
const urUpdateUserPassword = 'ur/updateUserPassword';
const jdaFindAlljurisdiction = 'jda/findAlljurisdiction';//所有权限
const ujaFindAllUJD  = 'uja/findAllUJD';//查看对应的权限
// const ujaInsert  = 'uja/insert';//增加权限
const ujaDelete  = 'uja/delete';//删除权限


const reservedInformationSelectReservedInformationList  = 'reservedInformation/selectReservedInformationList';//客服端app提交的数据

const urFindAllRootById  = 'ur/findAllRootById';//展示所有权限

const ujaInsert  = 'uja/insert';//添加修改所有权限

//消息推送
const urSelClientUser  = 'ur/selClientUser';//查询所酒店会员，未分页
const paInsertPush  = 'pa/insertPush';//增加
const paFindAllPush  = 'pa/findAllPush';//查询所有
const paDeletePush  = 'pa/deletePush';//删除




/** 客户端用户信息**/
const urFindAllClientUser= 'ur/findAllClientUser';//查询所有
const urDeleteClientUser= 'ur/deleteClientUser';//删除
const urResetClientPasswords= 'ur/resetClientPasswords';//重置密码




/** 角色管理**/
const roleFindAllRole= 'role/findAllRole';
const roleInsertRole = 'role/insertRole';
const roleDeleteRole = 'role/deleteRole';
const roleCheckRoleName = 'role/CheckRoleName';//角色验证
const roleFindAllRoelName= 'role/findAllRoelName';
/***婚宴酒店*****/ 

const whaFindAllWeddingHotel = 'wha/findAllWeddingHotel';//查询所有
const whaInsertWeddingHotel = 'wha/insertWeddingHotel';//增加一个酒店 和添加哥
const whaDeleteWeddingHotel = 'wha/deleteWeddingHotel';//删除一个酒店
const whaUpdateWeddingHotel = 'wha/updateWeddingHotel';//修改一个酒店
const peAdd = 'pe/add';//详情上传图片
const peFindAllPictureById  = 'pe/findAllPictureById';//详情查询所有
const peDeletePicture  = 'pe/deletePicture';//详情删除

const whaCheckheadline = 'wha/checkheadline';//验证title是否重复


const whaInsertWeddingHotelMenu = 'wha/insertWeddingHotelMenu';//菜单增加 后 改酒店简介
const whaFindWeddingHotelById = 'wha/findWeddingHotelById';//菜单详情
const whaDeleteWeddingHotelMenu = 'wha/deleteWeddingHotelMenu';//菜单详情


/***添加酒店描述*****/ 

const HotelDescribeFindAllHotelDescribe = 'HotelDescribe/findAllHotelDescribe';//查询所有
const HotelDescribeInsertHotelDescribe = 'HotelDescribe/insertHotelDescribe';//增加
const HotelDescribeDeleteHotelDescribe = 'HotelDescribe/deleteHotelDescribe';//删除
const HotelDescribeCheckHotelDescribeName = 'HotelDescribe/CheckHotelDescribeName';//校验
const HotelDescribeSelHotelDescribe = 'HotelDescribe/selHotelDescribe';//查询所有 未分页的 ，供酒店去选择描述







/***婚礼花艺：*****/

const waInsertWedding = 'wa/insertWedding';//增加
const waDeleteWedding = 'wa/deleteWedding';//删除
const waUpdateWedding = 'wa/updateWedding';//修改
const waFindAllWedding = 'wa/findAllWedding';//查询所有
const waCheckheadline= 'wa/Checkheadline';//校验添加的标题

/***婚纱照：*****/

const wpcInsertWeddingPictures = 'wpc/insertWeddingPictures';//增加
const wpcDeleteWeddingPictures = 'wpc/deleteWeddingPictures';//删除
const wpcUpdateWeddingPictures = 'wpc/updateWeddingPictures';//修改
const wpcFindAllWeddingPictures = 'wpc/findAllWeddingPictures';//查询所有
const wpcCheckWeddingPictures= 'wpc/CheckWeddingPictures';//校验添加的标题


/***司仪*****/

const eaInsertEmcee = 'ea/insertEmcee';//增加
const eaDeleteEmcee = 'ea/deleteEmcee';//删除
const eaUpdateEmcee = 'ea/updateEmcee';//修改
const eaFindAllEmcee = 'ea/findAllEmcee';//查询所有
const eaCheckEmceeName= 'ea/CheckEmceeName';//校验添加的标题

/***化妆*****/

const maInsertMakeup = 'ma/insertMakeup';//增加
const maDeleteMakeup = 'ma/deleteMakeup';//删除
const maUpdateMakeup = 'ma/updateMakeup';//修改
const maFindAllMakeup  = 'ma/findAllMakeup';//查询所有
const maCheckMakeupName= 'ma/CheckMakeupName';//校验添加的标题

/***摄影*****/

const caInsertCamera  = 'ca/insertCamera';//增加
const caDeleteCamera = 'ca/deleteCamera';//删除
const caUpdateCamera = 'ca/updateCamera';//修改
const caFindAllCamera  = 'ca/findAllCamera';//查询所有
const caCheckCameraName= 'ca/CheckCameraName';//校验添加的标题

/****摄像****/

const pgaInsertPhotography  = 'pga/insertPhotography';//增加
const pgaDeletePhotography  = 'pga/deletePhotography';//删除
const pgaUpdatePhotography  = 'pga/updatePhotography';//修改
const pgaFindAllPhotography  = 'pga/findAllPhotography';//查询所有
const pgaCheckPhotographyName= 'pga/CheckPhotographyName';//校验添加的标题

/****婚礼策划****/

const seAdd= 'se/add';//增加
const seDel= 'se/del';//删除
const seUpd  = 'se/upd';//修改
const seSel  = 'se/sel';//查询所有
const seCheckSchemeHeadline= 'se/CheckSchemeHeadline';//校验添加的标题

/****礼服****/

const fdaInsertFullDress= 'fda/insertFullDress';//增加
const fdaDeleteFullDress= 'fda/deleteFullDress';//删除
const fdaUpdateFullDress  = 'fda/updateFullDress';//修改
const fdaFindAllFullDress  = 'fda/findAllFullDress';//查询所有
const fdaCheckFullDressName  = 'fda/CheckFullDressName';//校验添加的标题


/****礼服****/

const abaInsertAppBanner= 'aba/insertAppBanner';//增加
const abaDeleteAppBanner= 'aba/deleteAppBanner';//删除
const cityDeleteCity  = 'city/deleteCity';//修改

/****城市****/

const cityFindAllCity= 'city/findAllCity';//查询所有城市
const cityInsertCity = 'city/insertCity';//增加
const abaFindAllAppBanner  = 'aba/findAllAppBanner';//修改banner
const cityCheckCityName  = 'city/CheckCityName';//校验添加的城市
const cityUpdateCity = 'city/updateCity';//修改城市

const citySelCity = 'city/selCity';//查询所有城市





/****县城****/
const countiesInsertCounties  = 'counties/insertCounties';//添加
const countiesFindAllCounties  = 'counties/findAllCounties';//查询所有
const countiesCheckName  = 'counties/checkName';//验证

const countiesDeleteCounties  = 'counties/deleteCounties';//验证
const countiesFindAllCountiesBycityName= 'counties/findAllCountiesBycityName';//查询所有城市（县区）







/****微信小程序****/
const wtDeleteWechat= 'wt/deleteWechat';//删除
const wtFindAllWechat= 'wt/findAllWechat';//查询
const wtUpdateWechat= 'wt/updateWechat';//是否有效

// 预约看厅数据

const wadaFindAllWebAppData= 'wada/findAllWebAppData';//查询所有
const wadaDeleteWebAppData= 'wada/deleteWebAppData';//删除

const wadaUpdateWebAppData= 'wada/updateWebAppData';//是否有效

// 类型添加
const dydeAdd  = 'dyde/add';//添加
const dydeSel  = 'dyde/sel';//查询所有
const dydeDel  = 'dyde/del';//删除
const dydeCheck = 'dyde/check';//校验添加是否重复
const dydeFindAll  = 'dyde/findAll';//查询所有类型

// 添加风格
const dsAdd  = 'ds/add';//添加
const dsSel  = 'ds/sel';//查询所有
const dsDel  = 'ds/del';//删除
const dsCheck  = 'ds/check';//验证
const dsFindAllDictionaries  = 'ds/findAllDictionaries';// //查询所有风格（不分页）


//问卷调查
const QuestionnairefindAllQuestionnaire='Questionnaire/findAllQuestionnaire';//查询所有问卷调查信息
const QuestionnairedeleteQuestionnaire='Questionnaire/deleteQuestionnaire'//删除一个或者多喝问卷调查信息

//问卷调查2
const QuestionnaireFindAllInteraction='Questionnaire/findAllInteraction';//查询所有问卷调查信息
const QuestionnaireDeleteInteraction='Questionnaire/deleteInteraction'//删除一个或者多喝问卷调查信息
const QuestionnaireExportInteractionExcel='Questionnaire/exportInteractionExcel'//导出excel问卷调查信息
//问卷调查3
const bfqaFindAllBFQ='bfqa/findAllBFQ';//查询所有问卷调查信息
const bfqaDeleteBFQ='bfqa/deleteBFQ'//删除一个或者多喝问卷调查信息
const bfqaExportBFQ='bfqa/exportBFQ'//导出excel问卷调查信息



//会员推荐调研
const RecommendfindAllRecommend='Recommend/findAllRecommend';//查询所有会员推荐调研信息
const RecommenddeleteRecommend='Recommend/deleteRecommend';//删除会员推荐调研

//Excel表格的导入导出

const wtExpertWechatExcel ='wt/expertWechatExcel';//微信的导出所有人员的表格
const wadaExportWebAppDataExcel ='wada/exportWebAppDataExcel';//聚宴家详情里表单提交的导出所有人员的表格
const RecommendExportRecommendExcel ='Recommend/exportRecommendExcel';//聚宴家会员推荐表单提交的导出所有人员的表格


// 综合作品分类

const cowaInsertCategroyOfWorks ='cowa/insertCategroyOfWorks';//增加
const cowaDeleteCategroyOfWorks ='cowa/deleteCategroyOfWorks';//删除
const cowaFindAllCategroyOfWorks ='cowa/findAllCategroyOfWorks';//查询所有
const cowaCheckCategroyOfWorksName ='cowa/CheckCategroyOfWorksName';//校验添加的条是否重复

const cowaSelCategroyOfWorks ='cowa/selCategroyOfWorks';//未分页的


// 权限管理-主菜单

const maInsertModule ='ma/insertModule';//增加
const maDeleteModule ='ma/deleteModule';//删除   
const maUpdateModule ='ma/updateModule';//修改
const maFindAllModule ='ma/findAllModule';//查询所有
const maCheckModuleName ='ma/CheckModuleName';//校验添加的条是否重复

const maSelModule ='ma/selModule';//未分页的

// 权限管理-子菜单

const saInsertSubmodule ='sa/insertSubmodule';//增加
const saDeleteSubmodule ='sa/deleteSubmodule';//删除   
const saUpdateSubmodule ='sa/updateSubmodule';//修改
const saFindAllSubmodule ='sa/findAllSubmodule';//查询所有
const saCheckSubmoduleName ='sa/CheckSubmoduleName';//校验添加的条是否重复

const saSelSubmodule ='sa/selSubmodule';//未分页的


// 权限管理-小权限

const jdaInsertjurisdiction ='jda/insertjurisdiction';//增加
const jdaDeletejurisdiction ='jda/deletejurisdiction';//删除   
// const saUpdateSubmodule ='sa/updateSubmodule';//修改
const jdaSel ='jda/sel';//查询所有
const jdaCheckJurisdiction ='jda/CheckJurisdiction';//校验添加的条是否重复

// const saSelSubmodule ='sa/selSubmodule';//未分页的

export default{

    reservedInformationSelectReservedInformationList:reservedInformationSelectReservedInformationList,
    server:server,

    urLogin: urLogin,
    urLoginOut: urLoginOut,
    urFindAllUser: urFindAllUser,
    urCheckUsername: urCheckUsername,
    urInsertUser: urInsertUser,
    urUpdateUser: urUpdateUser,
    urDeleteUser: urDeleteUser,
    urResetPasswords: urResetPasswords,
    urUpdateUserPassword: urUpdateUserPassword,
    jdaFindAlljurisdiction: jdaFindAlljurisdiction,
    ujaFindAllUJD:ujaFindAllUJD,
 
    ujaDelete:ujaDelete,

    urFindAllRootById:urFindAllRootById,
    ujaInsert:ujaInsert,
    


    
    urFindAllClientUser: urFindAllClientUser,
    urDeleteClientUser: urDeleteClientUser,
    urResetClientPasswords: urResetClientPasswords,

    
    roleFindAllRole: roleFindAllRole,
    roleInsertRole: roleInsertRole,
    roleDeleteRole: roleDeleteRole,
    roleCheckRoleName: roleCheckRoleName,
    roleFindAllRoelName:roleFindAllRoelName,
    

    whaInsertWeddingHotel:whaInsertWeddingHotel,
    whaFindAllWeddingHotel:whaFindAllWeddingHotel,
    whaDeleteWeddingHotel:whaDeleteWeddingHotel,
    whaUpdateWeddingHotel:whaUpdateWeddingHotel,
    peAdd:peAdd,
    peFindAllPictureById:peFindAllPictureById,
    peDeletePicture:peDeletePicture,
    whaFindWeddingHotelById:whaFindWeddingHotelById,
    whaInsertWeddingHotelMenu:whaInsertWeddingHotelMenu,
    whaDeleteWeddingHotelMenu:whaDeleteWeddingHotelMenu,
    
    
    whaCheckheadline:whaCheckheadline,


    waInsertWedding:waInsertWedding,
    waDeleteWedding:waDeleteWedding,
    waUpdateWedding:waUpdateWedding,
    waFindAllWedding:waFindAllWedding,
    waCheckheadline:waCheckheadline,

    wpcInsertWeddingPictures:wpcInsertWeddingPictures,
    wpcDeleteWeddingPictures:wpcDeleteWeddingPictures,
    wpcUpdateWeddingPictures:wpcUpdateWeddingPictures,
    wpcFindAllWeddingPictures:wpcFindAllWeddingPictures,
    wpcCheckWeddingPictures:wpcCheckWeddingPictures,
    
    
    eaInsertEmcee:eaInsertEmcee,
    eaDeleteEmcee:eaDeleteEmcee,
    eaUpdateEmcee:eaUpdateEmcee,
    eaFindAllEmcee:eaFindAllEmcee,
    eaCheckEmceeName:eaCheckEmceeName,
    
    maInsertMakeup:maInsertMakeup,
    maDeleteMakeup:maDeleteMakeup,
    maUpdateMakeup:maUpdateMakeup,
    maFindAllMakeup:maFindAllMakeup,
    maCheckMakeupName:maCheckMakeupName,

    caInsertCamera:caInsertCamera,
    caDeleteCamera:caDeleteCamera,
    caUpdateCamera:caUpdateCamera,
    caFindAllCamera:caFindAllCamera,
    caCheckCameraName:caCheckCameraName,
    
    pgaInsertPhotography:pgaInsertPhotography,
    pgaDeletePhotography:pgaDeletePhotography,
    pgaUpdatePhotography:pgaUpdatePhotography,
    pgaFindAllPhotography:pgaFindAllPhotography,
    pgaCheckPhotographyName:pgaCheckPhotographyName,

    seAdd:seAdd,
    seDel:seDel,
    seUpd:seUpd,
    seSel:seSel,
    seCheckSchemeHeadline:seCheckSchemeHeadline,
    
    fdaInsertFullDress:fdaInsertFullDress,
    fdaDeleteFullDress:fdaDeleteFullDress,
    fdaUpdateFullDress:fdaUpdateFullDress,
    fdaFindAllFullDress:fdaFindAllFullDress,
    fdaCheckFullDressName:fdaCheckFullDressName,
    
    abaInsertAppBanner:abaInsertAppBanner,
    abaDeleteAppBanner:abaDeleteAppBanner,
    abaFindAllAppBanner:abaFindAllAppBanner,
    
    cityFindAllCity:cityFindAllCity,
    cityInsertCity:cityInsertCity,
    cityDeleteCity:cityDeleteCity,
    cityCheckCityName:cityCheckCityName,

    countiesInsertCounties:countiesInsertCounties,
    countiesFindAllCounties:countiesFindAllCounties,
    countiesCheckName:countiesCheckName,
    countiesDeleteCounties:countiesDeleteCounties,
    countiesFindAllCountiesBycityName:countiesFindAllCountiesBycityName,

    

    wtDeleteWechat:wtDeleteWechat,
    wtFindAllWechat:wtFindAllWechat,
    wadaUpdateWebAppData:wadaUpdateWebAppData,
    wtUpdateWechat:wtUpdateWechat,

    wadaFindAllWebAppData:wadaFindAllWebAppData,
    wadaDeleteWebAppData:wadaDeleteWebAppData,

    dydeAdd:dydeAdd,
    dydeSel:dydeSel,
    dydeDel:dydeDel,
    dydeCheck:dydeCheck,
    dydeFindAll:dydeFindAll,//

    dsAdd:dsAdd,
    dsSel:dsSel,
    dsDel:dsDel,
    dsCheck:dsCheck,
    dsFindAllDictionaries:dsFindAllDictionaries,

    QuestionnairefindAllQuestionnaire:QuestionnairefindAllQuestionnaire,
    QuestionnairedeleteQuestionnaire:QuestionnairedeleteQuestionnaire,

    QuestionnaireFindAllInteraction:QuestionnaireFindAllInteraction,
    QuestionnaireDeleteInteraction:QuestionnaireDeleteInteraction,
    QuestionnaireExportInteractionExcel:QuestionnaireExportInteractionExcel,

    RecommendfindAllRecommend:RecommendfindAllRecommend,
    RecommenddeleteRecommend:RecommenddeleteRecommend,


    cityUpdateCity:cityUpdateCity,
    citySelCity:citySelCity,
    
    wtExpertWechatExcel : wtExpertWechatExcel,
    wadaExportWebAppDataExcel:wadaExportWebAppDataExcel,
    RecommendExportRecommendExcel:RecommendExportRecommendExcel,
    

    HotelDescribeFindAllHotelDescribe:HotelDescribeFindAllHotelDescribe,
    HotelDescribeInsertHotelDescribe : HotelDescribeInsertHotelDescribe,
    HotelDescribeDeleteHotelDescribe : HotelDescribeDeleteHotelDescribe,
    HotelDescribeCheckHotelDescribeName : HotelDescribeCheckHotelDescribeName,

    HotelDescribeSelHotelDescribe : HotelDescribeSelHotelDescribe,

    cowaInsertCategroyOfWorks: cowaInsertCategroyOfWorks,

    cowaDeleteCategroyOfWorks: cowaDeleteCategroyOfWorks,

    cowaFindAllCategroyOfWorks :cowaFindAllCategroyOfWorks,

    cowaCheckCategroyOfWorksName:cowaCheckCategroyOfWorksName,

    cowaSelCategroyOfWorks:cowaSelCategroyOfWorks,

    maInsertModule:maInsertModule,
    maDeleteModule:maDeleteModule,
    maUpdateModule:maUpdateModule,
    maFindAllModule:maFindAllModule,
    maCheckModuleName:maCheckModuleName,
    maSelModule:maSelModule,
    
    saInsertSubmodule:saInsertSubmodule,
    saDeleteSubmodule:saDeleteSubmodule,
    saUpdateSubmodule:saUpdateSubmodule,
    saFindAllSubmodule:saFindAllSubmodule,
    saCheckSubmoduleName:saCheckSubmoduleName,
    saSelSubmodule:saSelSubmodule,

    jdaInsertjurisdiction:jdaInsertjurisdiction,
    jdaDeletejurisdiction:jdaDeletejurisdiction,
    jdaSel:jdaSel,
    jdaCheckJurisdiction:jdaCheckJurisdiction,
    urSelClientUser:urSelClientUser,
    paInsertPush:paInsertPush,
    paFindAllPush:paFindAllPush,
    paDeletePush:paDeletePush,


    bfqaFindAllBFQ:bfqaFindAllBFQ,
    bfqaDeleteBFQ:bfqaDeleteBFQ,
    bfqaExportBFQ:bfqaExportBFQ,
}

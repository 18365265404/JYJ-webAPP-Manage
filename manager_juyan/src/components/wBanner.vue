

<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>bannner管理</span><span>/bannner管理</span>
         </div>
        </div>
         <!-- 搜索栏 -->
         <div class="top-search" style="text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
            <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
        </el-input>
        </div>

        <!-- 新增用户 -->
        <div class="button-add" style="over background:red; overflow: hidden; margin-top:20px;">
            <p style="float:left ; margin-left:5%" >友情提示：banner图的尺寸必须为1920*600px</p>
            <el-button v-show="rootObj.delete" style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增banner</el-button>
        </div>
        <!-- 要显示的列表 -->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div class="table" style=" font-size:14px">

            <table border="1" cellspacing="0" cellpadding="0" style="width:90%; margin:0 auto">
             <caption style="text-align: center; font-size:20px" ></caption>
            <thead style="background: black; color: white;">
		    <tr class="thead-tr">
              <th style="text-align: center; width: 5%; "> </th>
              <th style="text-align: center; width: 5%; ">序号</th>   
              <th style="text-align: center;">图片展示</th>  
              <th style="text-align: center;">城市</th>  
		      <th style="text-align: center; width:100px" >&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center; height:200px; "><img :src="qiliuPath+item.appPictures" style="height:90%"/></td>
                <td style="text-align: center; height:200px; ">{{item.city}}</td>
                <td style="text-align: center;"><el-button size="mini" v-show="rootObj.delete" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button></td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button v-show="rootObj.delete" class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        title="请添加图片"
        :visible.sync="dialogVisible"
        width="460px"
        center>
        <p>添加城市</p>
        <div style="width:100%; overflow: hidden; margin-bottom:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择城市</span>
                    <el-select v-model="cityName" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.cityName"
                    :value="item.cityName">
                    </el-option>
                    </el-select>
        </div> 
        <p>图片：</p>
        <el-upload
                    ref="upload"
                    :data="pppss"
                    class="avatar-uploader"
                    :action="upPictureUrl"
                    :show-file-list="true"
                    :file-list="upfileList"
                    :auto-upload="false"
                    list-type="picture"
                    :limit="1"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="padding-bottom:20px">
                    
                    <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
               
                    </el-upload>

    

             <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="success" @click="submitUpload(changeIndex)" style="width:100%; margin-bottom:20px">确认添加</el-button>
    

    

        <!-- <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="danger" @click="submitAdd()" style="width:100%;">确认添加</el-button> -->
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
           pppss:{
            city :'',

        },
          search:"",
            qiliuPath:"",
            imgUrls:"",
            imageUrl: '',
            upPictureUrl:"",
            roleName :"",
            currentPage:1,
            pageNum:1000,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             options2:"",
             list:[],
             uData:{},
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
             cityName:"",
             upfileList:[],
             rootObj:{}
             
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


            
            
        handleAvatarSuccess(res, file) {
            alert()
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(res,"1111111111111111111111111111111111111111111111");
                    switch (res.status) {

                            case 200:
                            this.list=res.data.list 
                            this.$message({
                                    
                                    type: 'success',
                                    message: "上传成功"
                                    });
                            break;         
                           
                    
                    }    
                 this.dialogVisible=false   
                 
    

            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                // this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt1M;
            },                    
            // 添加按钮弹出框出现
            addTode(){
                this.showAd=true;
                this.dialogVisible=true;
                this.upPictureUrl=url.server+url.abaInsertAppBanner+"?token="+getCookie("token");
                 this.cityName="";
                  if(this.$refs.upload){
                     this.$refs.upload.clearFiles();
                }

            },


        //增加 提交一条数据
            submitUpload(index){

                 console.log("图片的值",this.$refs.upload._data.uploadFiles.length)
                 


                if(!this.cityName){

                     const h = this.$createElement;
                          this.$notify({
                            title: '输入框',
                            message: h('i', { style: 'color: teal'}, '请填写完信息~')
                            });
                    return 
                }

                if(this.$refs.upload._data.uploadFiles.length==0){
                        const h = this.$createElement;
                            this.$notify({
                                title: '图片状态',
                                message: h('i', { style: 'color: teal'}, '请选择图片~')
                                });
                        return      
                    }


                this.pppss.city=this.cityName


                
                
                this.$refs.upload.submit();
               
                this.dialogVisible=false;

 
            },


            // 删除某一条
            removeTodo(index){
                console.log("删除的index",this.list[index].id);
                console.log("当前页",this.list[index].websitePictures );
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            
                            postRequest(url.abaDeleteAppBanner, {
                                id :this.list[index].id,
                               pageNum: this.currentPage, 
                                }).then(data=> {
                                        console.log("删除打印的数据",data.data.data)
                                        let datas=data.data.data
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

                let chooseStrId="";
                let chooseStrPictures="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStrId.push(this.checkedCities[i].taskId);
                     chooseStrId+=this.checkedCities[i].id+","
                     chooseStrPictures+=this.checkedCities[i].websitePictures+","
                }
                 chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);

                 chooseStrPictures = chooseStrPictures.substr(0, chooseStrPictures.length - 1);
                console.log("删除的chooseStrId",chooseStrId);
                console.log("删除的当前chooseStrPictures",chooseStrPictures,);
                   
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                            postRequest(url.abaDeleteAppBanner, {
                                id :chooseStrId,
                                 pageNum: this.currentPage, 
                                }).then(data=> {
                                        console.log("删除打印的数据",data.data.data)
                                        let datas=data.data.data
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


            goSearch(){//搜索
                postRequest(url.abaFindAllAppBanner, {
                   keyword: this.search,
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                         let datas=data.data.data.findAll
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         this.pageNum=pageNums
                         
                        
                });       

            },  
            //切换分页
          handleCurrentChange:function(){
            postRequest(url.abaFindAllAppBanner, {
                                
                pageNum: this.currentPage, 
                   }).then(data=> {
                    console.log("打印的数据",data.data.data)
                        let datas=data.data.data.findAll
                         
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         console.log("总页数",pageNums)
                         this.pageNum=pageNums                
                   });
         },
            

     

     },
  
 

     created:function(){


  // 添加时出现的select
                postRequest(url.citySelCity, {
                    //    token:getCookie("token") 
                    }).then(data=> {
                            console.log("修改打印的数据222",data.data.data)
                            let datas=data.data;
                            this.options2=data.data.data
                           
                            
                            
                });   
         
            postRequest(url.abaFindAllAppBanner, {
                    //    token:getCookie("token") 
                    }).then(data=> {

                        this.imgUrls=url.server+url.abaInsertAppBanner+"?token="+getCookie("token");
                        console.log(this.imgUrls)
                        console.log("查询所有打印的数据",data.data.data)
                         let datas=data.data.data.findAll
                         this.qiliuPath=data.data.data.qiniu//获取七牛的头
                         this.list=datas.list
                         let pageNums=datas.pages*10
                         console.log("总页数",pageNums)
                         this.pageNum=pageNums
                            
                            
            });     
     },
     
}
</script>
    
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


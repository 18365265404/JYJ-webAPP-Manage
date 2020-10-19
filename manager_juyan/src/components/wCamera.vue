<template>
    <div class="person1 content">
        
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style="background: #66B1ff; padding-left: 2%;line-height: 50px;">
                <span class="el-icon-info"></span><span>四大金刚</span><span>/摄像</span>
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

            <el-button style="float:right; margin-right:5%; margin-bottom:20px" type="primary" @click="addTode()">新增摄像</el-button>
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
              <th style="text-align: center;">标题</th>  
              <th style="text-align: center;">内容</th>  
              <th style="text-align: center;">详情</th> 
              <th style="text-align: center;">图片</th> 
              
		      <th style="text-align: center;">&nbsp;</th>
		    </tr>
		  </thead>

           <tbody>
            <tr class="tbody-tr" v-for="(item ,index) of list" :key="item.id">
                <td style="text-align: center;"><el-checkbox :label="item" ><span></span></el-checkbox></td>
                <td style="text-align: center;">{{index+1}}</td>
                <td style="text-align: center;">{{item.photographyName }}</td>
                <td style="text-align: center;">{{item.photographyIntroduce }}</td>
                <td style="text-align: center;">
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"  @click="showDetail(index)" class="btn" type="danger">查看详情</el-button>
                </td>
                <td style="text-align: center;">
                   
                    <img  style="width:50px; height:20px"  :src='qiniuUrl+item.pictureKey' alt="">
                </td>
                <td style="text-align: center;">
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"  @click="removeTodo(index)" class="btn" type="danger">删除</el-button>
                    <el-button size="mini" style="width:85px; font-size:10px;  margin:5px"  @click="changeTode(index)" class="btn" type="danger">修改</el-button>
                </td>
            </tr>
            </tbody> 
            
            </table>
        </div>
        
        </el-checkbox-group>

        <div v-show="list.length!=0" class="chooseAll" style="width:90%; box-sizing: border-box; margin:0 auto; margin-bottom:2%; border:1px solid black; border-top:none">
          <el-checkbox style="margin-left:1.5%;"  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button class="btn" type="danger" size="mini" style="width:85px; font-size:10px;  margin:5px;margin-left:10px;" @click="deletChoose()">选中删除</el-button>
        </div>

        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <!-- 弹窗 -->
        <el-dialog
        :title="dilogTitle"
        :visible.sync="dialogVisible"
        width="50%"
        center>
        <p>标题 <span style="color:red;font-size:10px">{{toastCheck}}</span></p>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="title"
                    v-on:blur="blurCount()"
                    style="margin-bottom:6px"
                    clearable>
                    
        </el-input>

        <p>价格</p>
        <el-input class="pop-text ipt-style"
                    placeholder='例："1000元"'
                    v-model="textContent1"
                 
                    style="margin-bottom:6px"
                    clearable>
                    
        </el-input>
        <p>星级</p>
        <el-input class="pop-text ipt-style"
                    placeholder='例："5"'
                    v-model="textContent2"
                    maxlength="1"
                    min="1"
                    max="5"
                    style="margin-bottom:6px"
                    clearable>
                    
        </el-input>
        <p>所在城市 </p>
        <div style="width:100%; overflow: hidden; margin-bottom:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择城市</span>
                    <el-select v-model="textContent3" clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.cityName"
                    :value="item.cityName">
                    </el-option>
                    </el-select>
        </div> 
        <p>作品分类</p>
        <div style="width:100%; overflow: hidden; margin-bottom:8px;">
                    <span style="border:1px solid #cccccc; float:left; height:38px; width:17%; line-height: 38px;text-align: center">选择分类</span>
                    <el-select v-model="textContent4"  clearable placeholder="请选择" style="float:left;width:82%;">
                    <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.dictionaryName">
                    </el-option>
                    </el-select>
        </div>
        <p>摄像介绍</p>
        <el-input class="pop-text ipt-style"
                    placeholder='例："暂无"'
                    v-model="textContent5"
                   
                    style="margin-bottom:6px"
                    clearable>
                    
        </el-input>
         <!-- <p>城市</p>
        <el-input class="pop-text ipt-style"
                    placeholder="请输入"
                    v-model="textContent6"
                   
                    style="margin-bottom:6px"
                    clearable>
                    
        </el-input> -->


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

    

             <el-button v-show="showAd" class="pop-btn ipt-style" :plain="true"  type="success" @click="submitUpload(changeIndex)" style="width:100%; margin-bottom:20px">{{submitName}}</el-button>
        </el-dialog>  

        <!-- 详情弹窗 -->
        <el-dialog
        title="上传图片详情"
        :visible.sync="dialogVisibleDetail"
        width="900px"
        center>

        <div style="padding-bottom:50px; border-bottom:1px solid #333333">
            <el-upload
                :data="upDetailPamas"
                class="upload-demo"
                ref="uploadDetail"
                :action="uploadDetailUrl"
                list-type="picture"
                :on-success="updateDetailSuccess"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadDetail">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
        </div>
                <el-table
                    :data="detailList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="pictureKey"
                    label="图片"
                    width="600px">
                    <template slot-scope="scope">
                        <div style="height:150px;width:300px;">
                                 <img style="width:200px;margin:20px 30px" :src='qiniuUrl+scope.row.pictureKey' alt="">
                        </div>
                       
                        
                    </template>
                    </el-table-column>
                     <el-table-column
                    prop="pictureKey"
                    label="操作"
                    width="200px">
                    <template slot-scope="scope">
                       <el-button
                        @click.native.prevent="deleteRow(scope.$index, detailList)"
                        type="text"
                        size="small">
                        移除
                        </el-button>
                    </template>
                    </el-table-column>
 
                </el-table>
            
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
            photographyName :'',
            photographyIntroduce:'',
            
            id:"",
            pageNum:"",
            pictureKey:""
        },
        upDetailPamas:{
            associationTableId:""
        },
        options1: [],//select
        options2:[],
        fileList: [],
        upfileList:[],
        uploadDetailUrl:"",
        dilogTitle:"",
        submitName:"",
        toastCheck:"",
        imgfile:"",
          title:"",
          upPictureUrl:"",
          imageUrl: '',
          textContent1:"",
          textContent2:"",
          textContent3:"",
          textContent4:"",
          textContent5:"",
        //   textContent6:"",

            qiniuUrl:"",
            roleName :"",
            currentPage:1,
            pageNum:10,//总页数
            showAd:"false",
             changeIndex:"",
             search:"",
             list:[],
             detailList:[],
             uData:{},
             dialogVisibleDetail:false,
             dialogVisible:false,
             checkAll: false,//显示全选
             checkedCities: [],
             isIndeterminate: false,//选其中几个
             addNum:1,//选择添加的条数
      }
    },
     methods:{


 /****************************查看详情********************************************************/ 
            showDetail(index){
                 console.log("上传图片详情的url",url.server+url.peAdd+"?token="+getCookie("token"))
                
                this.uploadDetailUrl=url.server+url.peAdd+"?token="+getCookie("token");
                this.dialogVisibleDetail=true
                if(this.$refs.uploadDetail){
                     this.$refs.uploadDetail.clearFiles();
                }
                this.upDetailPamas.associationTableId=this.list[index].id

            postRequest(url.peFindAllPictureById, {
                                 id:this.list[index].id
                                }).then(data=> {
                                        console.log("详情列表打印的数据",data.data.data)
                                       let datas=data.data.data
                                        this.detailList=datas
                                    //     let pageNums=datas.pages*10
                                    //     this.pageNum=pageNums
                                        
                                        
                        });
                

            },
             submitUploadDetail() {
                this.$refs.uploadDetail.submit();
            },
            updateDetailSuccess(res, file) {
                    
                console.log(res,"1111111111111111111111111111111111111111111111");
                    switch (res.status) {

                            case 200:
                            let datas=res.data
                            this.detailList=datas
                            this.$message({
                                    
                                    type: 'success',
                                    message: "提交成功"
                                    });
                            break;         
                           
                    
                    }


            },

            deleteRow(index, list) {
                console.log("234234234234234",this.detailList[index].associationTableId)
                postRequest(url.peDeletePicture, {
                                 
                                pictureKey: this.detailList[index].pictureKey,
                                associationTableId: this.detailList[index].associationTableId
                                }).then(data=> {
                                       console.log("详情删除打印的数据",data.data.data)
                                       let datas=data.data.data
                                        this.detailList=datas
                                        
                                                    
                            });
                
            },

 /****************************查看详情over********************************************************/             
             handleAvatarSuccess(res, file) {
                    
                console.log(res,"1111111111111111111111111111111111111111111111");
                    switch (res.status) {

                            case 200:
                            let datas=res.data.list
                            this.list=datas
                            let pageNums=res.data.pages*10

                            this.pageNum=pageNums
                            this.$message({
                                    
                                    type: 'success',
                                    message: "提交成功"
                                    });
                            break;         
                           
                    
                    }

   
                },
                beforeAvatarUpload(file) {
                    // this.imageUrl = URL.createObjectURL(file.raw);
                    console.log(file,"22222222222222222");
                    console.log(file,"要显示的图片文件")
                    this.imgfile=file
                    console.log( "开始")
                //    let fd = new FormData()
                //    fd.append('file', file)
                //    fd.append('weddingHeadline', this.title)
                //    fd.append('weddingIntroduce', this.textContent)

                   return true
                },


             blurCount(){
                  var  blurId=""
                 if(this.submitName=="确认修改"){
                     console.log("失去焦点的id",this.list[this.changeIndex].id)
                       
                        blurId=this.list[this.changeIndex].id
                 }
           //判断用户名失去焦点时的用户名是否相同
        //    console.log(this.username,"11111111111111111111111111111")
                    postRequest(url.pgaCheckPhotographyName, {
                        photographyName: this.title,
                        id:blurId
                        }).then(data=> {
                                console.log("打印的数据",data.data)
                                
                                this.toastCheck=data.data.data
                                if(data.data.status==200){
                                    this.toastCheck=""
                                }
                                if(data.data.status==500){
                                    this.toastCheck="标题重复"
                                }
                                
                });
           },
            //修改弹窗出现
             changeTode(index){
                 this.toastCheck=""
                 this.dilogTitle="信息修改"
                 this.submitName="确认修改"
                 this.changeIndex=index;     
                 console.log("答应的url",url.server+url.pgaUpdatePhotography+"?token="+getCookie("token"))
                 this.upPictureUrl=url.server+url.pgaUpdatePhotography+"?token="+getCookie("token");
                 console.log(this.list[index].photographyName)
                 console.log(this.list[index].photographyIntroduce)
                this.showAd=true;
                this.dialogVisible=true;
                this.title = this.list[index].photographyName;
                let contentAll = this.list[index].photographyIntroduce.split('`');
                this.textContent1=contentAll[0];
                this.textContent2=contentAll[1];
                this.textContent3=contentAll[2];
                this.textContent4=contentAll[3];
                this.textContent5=contentAll[4];
                // this.textContent6=contentAll[5];
                
                // this.upfileList.push({name: '666.jpg', url: `${this.qiniuUrl}${this.list[index].pictureKey}`}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'})
                if(this.$refs.upload){
                     this.$refs.upload.clearFiles();
                }
            
           
            },

            // 增加按钮弹出框出现
            addTode(){
                this.toastCheck=""
                this.dilogTitle="信息增加"
                this.submitName="确认增加"
                 console.log("答应的url",url.server+url.pgaInsertPhotography+"?token="+getCookie("token"))
                 this.upPictureUrl=url.server+url.pgaInsertPhotography+"?token="+getCookie("token");
                this.showAd=true;
                this.dialogVisible=true;
                this.title = "";
                this.textContent1="";
                this.textContent2="";
                this.textContent3="";
                this.textContent4="";
                this.textContent5="";
                // this.textContent6="";
                if(this.$refs.upload){
                     this.$refs.upload.clearFiles();
                }
                
            },
            //增加+修改 提交一条数据
            submitUpload(index){
                console.log("判断是否存在index",index)
                
                 if(this.toastCheck=="标题重复"){
                    return
             }
                 console.log("图片的值",this.$refs.upload._data.uploadFiles.length)
                 
            //如果是修改模块，不进行验证上传的图片是否为空     
                if(this.submitName=="确认修改"){

                    }else{
                    //如果是增加模块，进行验证上传的图片是否为空  
                    if(this.$refs.upload._data.uploadFiles.length==0){
                        const h = this.$createElement;
                            this.$notify({
                                title: '图片状态',
                                message: h('i', { style: 'color: teal'}, '请选择图片~')
                                });
                        return      
                    }
                    }

                // if(!this.title || !this.textContent1 || !this.textContent2 || !this.textContent3 || !this.textContent4 || !this.textContent5 || !this.textContent6){
                if(!this.title || !this.textContent1 || !this.textContent2 || !this.textContent3 || !this.textContent4 || !this.textContent5 ){
                     const h = this.$createElement;
                          this.$notify({
                            title: '输入框',
                            message: h('i', { style: 'color: teal'}, '请填写完信息~')
                            });
                    console.log("this.title",this.title)
                    console.log("this.textContentAll",this.textContent1+this.textContent2+this.textContent3+this.textContent4+this.textContent5)
                   
                    return 
                }
                this.pppss.photographyName=this.title
                // this.pppss.photographyIntroduce=this.textContent1+"`"+this.textContent2+"`"+this.textContent3+"`"+this.textContent4+"`"+this.textContent5+"`"+this.textContent6
                this.pppss.photographyIntroduce=this.textContent1+"`"+this.textContent2+"`"+this.textContent3+"`"+this.textContent4+"`"+this.textContent5 
                this.pppss.pageNum=this.currentPage

                // 如果是修改就携带参数 id 和 pictureKey，

                if(this.submitName=="确认修改"){
                    this.pppss.id= this.list[index].id
                    this.pppss.pictureKey= this.list[index].pictureKey

                    postRequest(url.pgaUpdatePhotography, {
                                id:this.list[index].id,
                                photographyName:this.title,
                                photographyIntroduce:this.pppss.photographyIntroduce,
                                pictureKey: this.list[index].pictureKey,
                                pageNum: this.currentPage,
                                
                                }).then(data=> {
                                       console.log("没上传图片的修改打印的数据",data.data.data)
                                       let datas=data.data.data
                                        this.list=datas.list
                                        let pageNums=datas.pages*10
                                        this.pageNum=pageNums
                                                    
                            });
                    
                }
                
                
                this.$refs.upload.submit();
               
                this.dialogVisible=false;

 
            },




            // 删除某一条
            removeTodo(index){
                console.log("删除的index",this.list[index].id);
                // console.log("当前页",this.currentPage);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                             postRequest(url.pgaDeletePhotography, {
                              pageNum: this.currentPage, 
                                PhotographyId:this.list[index].id
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
                //  this.$alert('sorry，暂未开放批量删除');
                //  return
                let chooseStr="";
                for(let i=0;i<this.checkedCities.length;i++){
                    // chooseStr.push(this.checkedCities[i].taskId);
                     chooseStr+=this.checkedCities[i].id+","
                }
                 chooseStr = chooseStr.substr(0, chooseStr.length - 1);
                // console.log("删除的chooseArr",chooseStr);
                // console.log("删除的当前currentPage",this.currentPage,);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                             postRequest(url.pgaDeletePhotography, {
                                 
                                pageNum: this.currentPage, 
                               
                                PhotographyId : chooseStr
                                }).then(data=> {
                                       console.log("打印的数据",data.data.data)
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
                postRequest(url.pgaFindAllPhotography, {
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
            postRequest(url.pgaFindAllPhotography, {
                         pageNum: this.currentPage, 
                                }).then(data=> {
                                        console.log("打印的数据",data.data.data)
                                       let datas=data.data.data.findAll
                                        this.list=datas.list
                                        let pageNums=datas.pages*10
                                        this.pageNum=pageNums
                                        
                                        
                        });
         },
            

     

     },
  
 

     created:function(){

                     // 添加时出现的select
                postRequest(url.dsFindAllDictionaries, {
                    //    token:getCookie("token") 
                    type:"C-SX"
                    }).then(data=> {
                            console.log("修改打印的数据111111111111",data.data.data)
                            let datas=data.data;
                            this.options1=data.data.data
                            let pageNums=datas.pages*10
                            
                            this.pageNum=pageNums
                            
                            
                });  

                 // 添加时出现的select
                postRequest(url.cityFindAllCity, {
                    //    token:getCookie("token") 
                    }).then(data=> {
                            console.log("修改打印的数据222",data.data.data)
                            let datas=data.data;
                            this.options2=data.data.data.list
                            let pageNums=datas.pages*10
                            
                            this.pageNum=pageNums
                            
                            
                });   

        postRequest(url.pgaFindAllPhotography, {
                //    token:getCookie("token") 
                }).then(data=> {
                        console.log("查询所有打印的数据",data.data.data)
                        
                        let datas=data.data.data.findAll
                         this.qiniuUrl=data.data.data.qiniu//获取七牛的头
                        
                        
                         this.list=datas.list
                         let pageNums=datas.pages*10
                           console.log("总页数",pageNums)
                         
                         this.pageNum=pageNums
                         
                        
                        
        }
        
        );       
     },
     
}
</script>
    
<style scoped>

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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


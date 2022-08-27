<template>
    <div class="data">
      <div class="nav justify-content-between" v-if="these_type === 'doc'">
      <div
        class="d-flex justify-content-between align-items-center"
      >
        <template v-for="item in typeList">
          <div
            :key="item.type"
            class="cursor-point"
            @click="handlerTypeClick(item.type)"
          >
            <div class="mt-15 this_type" v-if="this_type === item.type">{{ item.name }}</div>
            <div class="mt-15 type" v-else>{{ item.name }}</div>
          </div>
        </template>
        <div class="doc cursor-point" @click="change2()">文档</div>
        <div class="small_line3" v-if="these_type === 'doc'"></div>
        <div class="video cursor-point" @click="change3()">视频</div>
        <div class="small_line4" v-if="these_type === 'video'"></div>
      </div>
    </div>
    <div class="nav2 d-flex" v-else>
      <div class="sele">精选</div>
       <div class="doc2 cursor-point" @click="change2()">文档</div>
        <div class="small_line1" v-if="these_type === 'doc'"></div>
        <div class="video2 cursor-point" @click="change3()">视频</div>
         <div class="small_line2" v-if="these_type === 'video'"></div>
    </div>
    <div class="content" v-if="these_type === 'doc'">
       <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box2"
        >
        <div @click="pushInfo(item.id)"><img class="data_img cursor-point"  :src="item.photoPath"></div>
        <div class="name cursor-point" @click="pushInfo(item.id)">{{item.name}}</div>
        <div class="details d-flex">
          <div class="page">页面：{{item.pageNum}}页</div>
          <div class="postman">上传用户：{{item.publisherName}}</div>
          <div class="time">上传时间：{{item.uploadDate}}</div>
          <button class="butoon pcur" @click="download(item.id)">下载文件</button>
        <div class="downNum">下载量：{{item.downloads}}次</div>
        </div>
    
         <div class="line" v-if="index != length-1"></div>
         
       </div>
        <el-pagination
            background
            layout="prev, pager, next, total"
            :total="total"
          @current-change="changePage"
          class="fenye"
          >
          </el-pagination>
    </div>
    <div class="content" v-else>
      <div
            v-for="(item,index) in videoList"
            :key="index"
            class="box"
        >
        <div @click="pushInfo3(item.videoId)"><img class="video_img cursor-point"  :src="item.videoPhoto"></div>
        <div class="name2 cursor-point" @click="pushInfo3(item.videoId)">{{item.videoName}}</div>
        <div class="details d-flex">
          <div class="postman2">上传用户：{{item.userName}}</div>
          <div class="time2">上传时间：{{item.uploadTime}}</div>
                <button class="butoon2 pcur" @click="download1(item.videoId)">下载视频</button>
        <div class="downNum2">下载量：{{item.download}}次</div>
        </div>
         <div class="line" v-if="index != length-1"></div>
       </div>
        <el-pagination
            background
            layout="prev, pager, next, total"
            :total="total2"
          @current-change="changePage2"
          class="fenye2"
          >
          </el-pagination>
    </div>
    </div>
</template>

<script>
import { getdocument,video,download,videodownload} from "../api/api"
    export default {
      inject: ['reload'],
        data(){
            return{
              these_type:'doc',
             this_type:'selected',
             kind:0,
             total :0,
             dataInfoListLoading:true,
             pageNum:1,
             pageSize:10,
             length:0,
                typeList:[
                    {
                    name: "精选",
                    type: "selected",
                    },
                    {
                    name: "期末历年卷",
                    type: "volume",
                    },
                    {
                    name: "等级考试",
                    type: "exam",
                    },
                    {
                    name: "资料证书",
                    type: "certificate",
                    },
                    {
                    name: "论文模板",
                    type: "ThesisTemplate",
                    },
                ],
              dataList:[],
              videoList:[],
              total2:0,
              url1:"",
            }
        },
       created(){
         let Requestdata = {
           kind:0,
           pageSize:4,
           pageNum:1,
         };
        getdocument(Requestdata).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                         this.total = parseInt(response.total);
                        this.dataInfoListLoading = false;
                        this.length = response.data.length;
                           console.log(response.data.length);
                    })
                   let Requestdata2 = {
                    pageSize:4,
                    pageNum:1,
                  };
                video(Requestdata2).then((response)=>{
                        console.log('我是video返回的数据',response);
                        this.videoList = response.data;
                         this.total2 = parseInt(response.total);
                        this.length = response.data.length;
                           console.log(response.data.length);
                    })

       },
       methods:{
           download(id){
      let dataRequest = {
        id:id
      }
         download(dataRequest).then((res) => {
          console.log('下载',res.data)
          this.url2=res.data.downloadUrl
           console.log('url', this.url2,res.data.documentName)
           const a = document.createElement('a')
            a.href = this.url2
             a.click()
            this.reload()
      });
    //      const a = document.createElement('a')
    //        this.url = window.localStorage.getItem("dataurl")
    // // a.href = 'https://rollup.oss-cn-hangzhou.aliyuncs.com//document/1556247935983431681.doc'
    //     a.href = this.url2
    // // a.download = 'my.pdf' 
    // a.click()
    },
      download1(id){
       const a = document.createElement('a')
            a.href = process.env.VUE_APP_BASE_URL+'/video/download/'+id
             a.click()
    },
         pushInfo3(id){
               this.$router.push(
                {
                  name:'VideoDetails',
                  params: {
                    videoID: id
                  }
                  }
                )
         },
         change2(){
           this.these_type= 'doc'
         },
         change3(){
           this.these_type= 'video'
         },
         	changePage(e){
          let requestData5 = {
            pageNum: e,
            pageSize:4,
            kind:0,
          };
            getdocument(requestData5).then((response) => {
            this.dataList = response.data;
            this.dataInfoListLoading = false;
          });
       },
       	changePage2(e){
          let requestData5 = {
            pageNum: e,
            pageSize:4,
          };
            video(requestData5).then((response) => {
            this.videoList = response.data;
            this.dataInfoListLoading = false;
          });
       },
           pushInfo(id) {
            // 跳转的时候带上id
          // this.$router.push({path:'/shop/info'})
              this.$router.push(
                {
                  name:'Details',
                  params: {
                    dataID: id
                  }
                  }
                )
          },
          handlerTypeClick(type){
            console.log('type', type)
            if(type === 'selected')
            this.kind = 0
            if(type === 'volume')
            this.kind = 1
            if(type === 'exam')
            this.kind = 2
            if(type === 'certificate')
            this.kind = 3
            if(type === 'ThesisTemplate')
            this.kind = 4
             let Requestdata = {
           kind:this.kind,
           pageSize:4,
           pageNum:1,
         };
        getdocument(Requestdata).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                         this.total = parseInt(response.total);
                        this.dataInfoListLoading = false;
                        this.length = response.data.length;
                           console.log(response.data.length);
                           this.this_type = type
                    })
          }
       }
    }
</script>

<style lang="scss" scoped>
.downNum{
  	height: 12px;
	font-family: Inter-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 12px;
	letter-spacing: 0px;
	color: #b6b6b6;
   position: relative;
  top: -39px;
  left: 9px;
}
.downNum2{
  	height: 12px;
	font-family: Inter-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 12px;
	letter-spacing: 0px;
	color: #b6b6b6;
   position: relative;
  top: -14px;
  left: 9px;

}
.butoon{
  width: 96px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
  color: #FFF;
  border: none;
  outline: none;
  position: relative;
  top: -88px;
  left: 90px;
}
.butoon2{
  width: 96px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
  color: #FFF;
  border: none;
  outline: none;
  position: relative;
  top: -64px;
  left: 90px;
}
.nav{
  	height: 64px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.3);
	border-radius: 4px 4px 0px 0px;
}
.fenye2{
  margin-top: 32px;
}
.small_line2{
  	width: 32px;
	height: 3px;
	background-color: #3656c6;
 position: absolute;
 top: 331px;
 left: 1023px;
}
.small_line3{
	width: 32px;
	height: 3px;
	background-color: #3656c6;
 position: absolute;
 top: 331px;
 left: 933px;
}
.postman2{
  margin-left: 31px;
}
.doc2{
	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
  margin-top: 25px;
  margin-left: 700px;
}
.video2{
  	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
  margin-top: 25px;
  margin-left: 25px;
}
.sele{
  margin-left: 24px;
	font-family: Inter-SemiBold;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #222222;
  font-weight:bold;
  margin-top: 24px;
}
.nav2{
  	height: 64px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.3);
	border-radius: 4px 4px 0px 0px;
  width: 100%;
}
.details{
  position: relative;
  top: -32px;
  left:111px;
}
.details >div{
    margin-right: 32px;
}
.name{
  position: relative;
  top: -125px;
  left: 115px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
}
.name2{
  position: relative;
  top: -90px;
  left: 145px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
  font-weight: bold;
}
.fenye{
  margin-top: 62px;
}
.line{
    width: 740px;
	height: 1px;
	background-image: linear-gradient(
		#364cc6, 
		#364cc6), 
	linear-gradient(
		#dbdde0, 
		#dbdde0);
	background-blend-mode: normal, 
		normal;
}
.doc{
  margin-left: 100px;
  width: 28px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
}
.video{
  margin-left: 32px;
    width: 28px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
}
.data{
	background-color: #ffffff;
}
.type{
  	background-color: #f6f6f6;
	  border-radius: 8px;
    margin-left: 28px;
    width:96px;
    height: 32px;
    font-size: 16px;
    align-items: center;
    color: #7f8497;
    border-radius: 8px;
    text-align: center;
    line-height: 32px;
}
.this_type{
    margin-left: 28px;
    width:96px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    background-color: #3656c6;
	border-radius: 8px;
    color: #ffffff;
    align-items: center;
    border-radius: 8px;
    text-align: center;
}
.type:hover{
    background-color: #3656c6;
	border-radius: 8px;
    color: #ffffff;
}
.data_img{
  width: 87px;
	height: 123px;
}
.video_img{
  width: 112px;
	height: 84px;
	background-color: #ffeeee;
	border: solid 1px #364cc6;
}
.box{
  margin-top: 64px;
  height: 123px;
  margin-left: 32px;
}
.box2{
   margin-top: 51px;
  height: 151px;
  margin-left: 32px;
}
</style>
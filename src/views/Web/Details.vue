<template>
  <div class="box">
    <div class="nav">
    <HeaderHandler/>
    </div>
    <div class="content1">
     <div class="details_nav">
     <div class="first d-flex">
       <div class="name">{{dataInfo.name}}</div>
      <button class="download" @click="download(dataInfo.id)">下载文件</button>
     </div>
      <div class="con d-flex">
      <div class="pageNum">页数：{{dataInfo.pageNum}}页</div>
      <div class="publisher">上传用户：{{dataInfo.userName}}</div>
      <div class="publish_time">上传时间：{{dataInfo.uploadDate}}</div>
        <div class="downNum">下载量：{{dataInfo.downloads}}</div>
      </div>
    </div>
    <div class="pdf11">
     <pdf
            :page="currentPage"
            @progress="loadedRatio = $event"
            @loaded="loadPdfHandler"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            ref="wrapper"
            :src="src"
            style="width:75%;"
          >
          </pdf>
          <div class="bottom d-flex">
          <button class="banit" @click="show()">举报</button>
          <div class="pagetions" v-if="pageCount">
            <div>
              <i class="el-icon-d-arrow-left" @click="changePdfPage(0)" />
            </div>
            <span> {{currentPage}}/{{pageCount}}</span>
            <div>
            <i class="el-icon-d-arrow-right" @click="changePdfPage(1)" />
            </div>
          </div>
          <div class="storeit d-flex">
          <div class="storeit-img" v-if="dataInfo.isCollected === true" @click="unstore()"><img src="../../assets/icon_Star(1).png" alt=""></div>
          <div class="storeit-img" v-if="dataInfo.isCollected === false" @click="store()"><img src="../../assets/icon_Star.png" alt=""></div>
          <div class="storeit-wenzi">收藏</div>
          </div>
          <button class="download1" @click="download(dataInfo.id)">下载文件</button>
          </div>    
    </div>
    <div class="hot">
     <Data_Hot/>
     </div>
      <div class="jubao1" v-if="isShow === true">
     <div class="cancle" @click="cancleChoose()"><img class="cancle-img cursor-point" src="../../assets/icon_quit.png" alt=""></div>
     <div class="jubao-wenzi cursor-point">举报</div>
     <div class="reason">选择举报理由</div>
     <div
            v-for="(item,index) in fixedList"
            :key="index"
            class="box112 d-flex"
        >
        <div v-if="item.lable===con"><img class="reason-img cursor-point" @click="choose(item.lable)" src="../../assets/icon_radiobtn_on.png" alt=""></div>
        <div v-else><img class="reason-img cursor-point" @click="choose(item.lable)"  src="../../assets/icon_radiobtn_off.png" alt=""></div>
        <div class="reason-content cursor-point" @click="choose(item.lable)">{{item.lable}}</div>
      </div>
      <button class="jubao-button cursor-point" @click="jubao()">举报</button>
    </div>
    </div>
   
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { getdocumentDetails,preview ,report,storeAnswer,unCollect,download} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
import     Data_Hot from '../../components/Data_Hot.vue'
export default {
  name: "ContentDetails",
  inject: ['reload'],
  components: {
    HeaderHandler,
    Data_Hot,
  },
  data() {
    return {
      isShow:false,
       com:false,
       con:"",
       fixedList:[
          {lable:"辱骂、人身攻击等不友善行为"},
          {lable:"淫秽色情等不良信息"},
          {lable:"垃圾广告"},
          {lable:"骚扰行为"},
          {lable:"涉嫌侵权"},
        ],
      dataInfo: [],
      shopID: "",
      postId:'',
      dataID:'',
      userId:'',
      loadedRatio: 0,
      currentPage: 1, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      src:'',
      url2:"",
      url:""
    };
  },
  components: {
    pdf,
    HeaderHandler,
    Data_Hot
  },
  mounted() {
    const id = this.$route.params.dataID;
    if (id) {
      window.localStorage.setItem("dataID", id);
    }
    let dataID = window.localStorage.getItem("dataID");
    if (dataID !== "undefined") {
      this.dataID = dataID;
      console.log(this.dataID);
    }
    this.getShopInfo()
    let dataRequest = {
      id : this.dataID
    }
    this.src = process.env.VUE_APP_BASE_URL+'/doc/preview/'+this.dataID
      //  preview(dataRequest).then((res) => {
      //     console.log(res)
      // });

  },
  methods: {
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
       store(){
        this.userId = window.localStorage.getItem("userid")
         this.dataID = window.localStorage.getItem("dataID")
        let dataRequest = {
            userId:this.userId ,
            targetId:this.dataID,
            sort:3,
        }
          storeAnswer(dataRequest).then((res) => {
          console.log('收藏',res)
          this.reload();
      });
    },
    unstore(){
        this.userId = window.localStorage.getItem("userid")
         this.dataID = window.localStorage.getItem("dataID")
        let dataRequest = {
            userId:this.userId ,
            targetId:this.dataID,
            sort:3,
        }
          unCollect(dataRequest).then((res) => {
          console.log('取消收藏',res)
          this.reload();
      });
    },
        jubao(){
      this.con = window.localStorage.getItem("jubaocontent")
      let dataRequest = {
        userId:this.fromId,
        targetId:this.ccId,
        sort:4,
        reason:this.con,
      }
       report(dataRequest).then((res) => {
          console.log('举报本评论',res)
          alert(res.msg)
      });
    },
    show(){
      this.isShow = true
    },
    choose(con){
      window.localStorage.setItem("jubaocontent",con)
      this.con = con
    },
    cancleChoose(){
      this.isShow = false
    },
    changePdfPage(val) {
      if(val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if(val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf加载时
    loadPdfHandler() {
      this.currentPage = 1; // 加载的时候先加载第一页
      this.loading = false;
    },
    getShopInfo() {
      this.dataID = window.localStorage.getItem("dataID");
      this.userId = window.localStorage.getItem("userid")
      console.log('1',this.userId)
      console.log('docId', this.dataID)
      let dataRequest={
        userId:this.userId,
        docId:this.dataID,
      }
      getdocumentDetails(dataRequest).then((res) => {
          console.log(res)
        this.dataInfo = res.data;
      });
    },
    downLoad(){

    },
  },
};
</script>

<style lang="scss" scoped>
.jubao-button{
  	width: 330px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
  margin-left: 15px;
      border: none;
  cursor: pointer;
  color: #ffffff;
  margin-top: 15px;
}
.reason-img{
  margin-right: 8px;
}
.reason-content{
  font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
}
.box112{
  margin-left: 15px;
  margin-top: 18px;
}
.reason{
  font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: rgba(86, 96, 112, 0.6);
  margin-left: 24px;
  margin-top: 8px;
}
.jubao-wenzi{
	font-family: Inter-SemiBold;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #54595e;
  margin-left: 24px;
}
.cancle-img{
   margin-left: 7px;
 margin-top: 7px;

}
.cancle{
  	width: 24px;
	height: 24px;
	background-color: #e5e5e5;
	border-radius: 29px;
  margin-top: 3px;
  margin-left: 333px;
}
.jubao1{
  background-color: #fff;
  position: relative;
  top: -550px;
  left: 467px;
  width: 500px;
}
.storeit-img{
  margin-left: 60px;
  margin-top: 18px;
}
.storeit-wenzi{
   margin-left: 12px;
  margin-top: 21px;

}
.download1{
  width: 96px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
  margin-top: 18px;
  margin-left: 220px;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.banit{
	height: 30px;
	background-image: linear-gradient(
		#ecedee, 
		#ecedee), 
	linear-gradient(
		#ecedee, 
		#ecedee);
	background-blend-mode: normal, 
		normal;
	border-radius: 8px;
  margin-left: 24px;
  margin-right: 24px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}
.bottom{
    width: 75%;
    background-color: #fff;
}
.pdf11{
  width: 53%;
    margin-top: 1.7%;
    margin-left: 20%;
}
.store{
  background-color: #fff;
}
.con{
  width: 100%;
  margin-top: 20px;
  margin-left: 32px;
}
.con>div{
   margin-right: 14px;
}
.download{
  width: 96px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
  margin-top: 23px;
  margin-left: 260px;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.name{
  margin-top: 28px;
  margin-left: 32px;
	height: 16px;
	font-family: Inter-SemiBold;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #000000;
}
.hot{
  position: absolute;
  top: 146px;
  left: 1065px;
      background-color: rgba(255,255,255);
}
.box{
    width: 100%;
    height: 100%;
}
.content1{
  background-color: rgba(250,250,250);
  padding-top: 20px;
}
.details_nav{
   background-color: rgba(255,255,255);
   	height: 110px;
    width: 40%;
    margin-top: 2.7%;
    margin-left: 20%;
}
.pagetions{
  display: flex;
  align-items: center;
  background-color: #fff;
  >div{
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      font-size: 12px;
    }
  }
  >span {
    display: block;
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>
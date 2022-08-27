<template>
    <div class="wrap-box">
      <div class="nav"><HeaderHandler/></div>
      <div class="content">
       <!-- <div class="video-box">
        
    </div> -->
      </div>
      <div class="small_nav">
        <div class="nav1 d-flex">
        <div class="title">{{dataInfo.videoName}}</div>
        <div class="store d-flex">
        <img class="store_img pcur" src="../../assets/icon_Star.png" alt="" v-if="dataInfo.isCollected === false" @click="store()">
        <img class="store_img pcur" src="../../assets/icon_Star(1).png" alt="" v-if="dataInfo.isCollected === true" @click="unstore()">
        <div class="store_wenzi">收藏</div>
        </div>
        </div>
        <div class="nav2 d-flex">
        <div class="upName">上传用户：{{dataInfo.userName}}</div>
        <div class="upTime">上传时间：{{dataInfo.uploadTime}}</div>
        </div>
        <button class="butoon2 pcur" @click="download1(dataInfo.videoId)">下载视频</button>
        <div class="downNum2">下载量：{{dataInfo.download}}次</div>
      </div>
    </div>
</template>
<script>
import { videoDetails,storeAnswer,unCollect,} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
    export default {
        inject: ['reload'],
          components: {
            HeaderHandler,
        },
        data(){
            return{
                videoID:"",
                src:"",
                dataInfo:[],
            }
        },
        mounted(){
             const id = this.$route.params.videoID;
            if (id) {
            window.localStorage.setItem("videoID", id);
            }
            let videoID = window.localStorage.getItem("videoID");
            if (videoID !== "videoID") {
            this.videoID = videoID;
            console.log(this.videoID);
             this.src = process.env.VUE_APP_BASE_URL+'/video/view/'+this.videoID
             console.log(this.src);
            }
             this.userId = window.localStorage.getItem("userid")
            let dataRequest = {
                id:this.videoID,
                userId:this.userId
            }
             videoDetails(dataRequest).then((res) => {
                console.log('视频详情',res)
                this.dataInfo = res.data;
            });
        },
        methods:{
             download1(id){
                    const a = document.createElement('a')
                    a.href = process.env.VUE_APP_BASE_URL+'/video/download/'+id
                    a.click()
            },
                store(){
                this.userId = window.localStorage.getItem("userid")
                this.videoID = window.localStorage.getItem("videoID")
                let dataRequest = {
                    userId:this.userId ,
                    targetId:this.videoID,
                    sort:4,
                }
                storeAnswer(dataRequest).then((res) => {
                console.log('收藏',res)
                this.reload();
            });
            },
            unstore(){
                this.userId = window.localStorage.getItem("userid")
                this.videoID = window.localStorage.getItem("videoID")
                let dataRequest = {
                    userId:this.userId ,
                    targetId:this.videoID,
                    sort:4,
                }
                unCollect(dataRequest).then((res) => {
                console.log('取消收藏',res)
                this.reload();
            });
            },
        }
    }
</script>

<style lang="scss" scoped>
.video-box {
    margin: 24px auto;
    background-color: gray;
    width: 869px;
    height: 488px;
}

.video-info-box {
    margin: 0px auto;
    width: 869px;
    height: 130px;
    background-color: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(209, 211, 218, 0.22);
    border-radius: 4px;
}

.video_title {
    margin: 0;
    position: relative;
    width: 308px;
    height: 16px;
    font-family: Inter-SemiBold;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 16px;
    letter-spacing: 0px;
    color: #000000;
    top: 32px;
    left: 32px;
    overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}

.video-collect-box {
    width: 60px;
    height: 24px;
    position: relative;
    top: 32px;
    left: 372px;
}
.store_img{
    margin-left: 38px;
}
.store_wenzi{
    	line-height: 14px;
	color: #84878d;
    margin-left: 8px;
    margin-top: 5px;
}
.upName{
    color: #b6b6b6;
    font-size: 14px;
}
.upTime{
    color: #b6b6b6;
    font-size: 14px;
    margin-left: 38px;
}
.title{
    font-size: 16px;
    font-weight: bold;
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
  top: -41px;
  left: 656px;
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
  top: -52px;
  left: 638px;
}
.nav1,.nav2{
    margin-left: 4%;
}
.nav1{
    padding-top: 3%;
}
.nav2{
     margin-top: 1.8%;
}
.small_nav{
    width: 45%;
    height: 13%;
    margin-left: 27%;
    margin-top: 2%;
    background-color: #fff;
}
.nav{
    background-color: #fff;
}
.wrap-box{
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;
}
.content{
    width: 45%;
    height: 50%;
    background-color: #fff;
    margin-left: 27%;
    margin-top: 2%;
}
</style>
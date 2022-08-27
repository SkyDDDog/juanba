<template>
    <div class="box">
    <div>
    <HeaderHandler/>
    </div>
    <div>
    <Search/>
    </div>
    <div class="content-detail">
    <div class="content-detail2">
   <div class="nav2 justify-content-between">
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
            <div class="line2" v-if="this_type === item.type"></div>
          </div>
        </template>
        </div>
      </div>
        <div class="specify" v-if="this_type === 'tiezi'">
      <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box"
        >
        <div class="content-title cursor-point" @click="pushInfo(item.postId)">{{item.title}}</div>
        <div class="con cursor-point"  @click="pushInfo(item.postId)">{{item.bestAnswer}}</div>
        <div class="detail d-flex">
        <div class="like_img" @click="like(item.bestAnswerId)"  v-if="item.bestAnswerIsLiked === false"><img src="../../assets/icon_Like(1).png" alt=""></div>
        <div class="like_img" @click="like(item.bestAnswerId)" v-if="item.bestAnswerIsLiked === true"><img src="../../assets/icon_Like.png" alt=""></div>
        <div class="like">{{item.likes}}个赞</div>
        <div class="commend_img"><img src="../../assets/icon_comment.png" alt=""></div>
        <div class="comment">{{item.discussNum}}个评论</div>
        <div class="store_img" v-if="item.isCollected === false" @click="store(item.postId)"><img src="../../assets/icon_Star.png" alt=""></div>
        <div class="store_img" v-if="item.isCollected === true" @click="unstore(item.postId)"><img src="../../assets/icon_Star(1).png" alt=""></div>
        <div class="store" @click="strore()">收藏</div>
        </div>
        <div class="line" v-if="index != length-1"></div>
      </div>
    </div>
    <div class="content-data" v-if="this_type === 'doc'">
       <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box2"
        >
        <div @click="pushInfo2(item.id)"><img class="data_img cursor-point"  :src="item.photoPath"></div>
        <div class="name cursor-point" @click="pushInfo(item.id)">{{item.name}}</div>
        <div class="details d-flex">
          <div class="page">页面：{{item.pageNum}}页</div>
          <div class="postman">上传用户：{{item.publisherName}}</div>
          <div class="time">上传时间：{{item.uploadDate}}</div>
        </div>
         <div class="line7" v-if="index != length-1"></div>
       </div>
    </div>
    <div class="content-video" v-if="this_type === 'video'">
     <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box3"
        >
        <div @click="pushInfo3(item.videoId)"><img class="video_img cursor-point"  :src="item.videoPhoto"></div>
        <div class="name2 cursor-point" @click="pushInfo3(item.videoId)">{{item.videoName}}</div>
        <div class="details d-flex">
          <div class="postman2">上传用户：{{item.userName}}</div>
          <div class="time2">上传时间：{{item.uploadTime}}</div>
                <button class="butoon2 pcur" @click="download1(item.videoId)">下载视频</button>
        <div class="downNum2">下载量：{{item.download}}次</div>
        </div>
         <div class="line3" v-if="index != length-1"></div>
       </div>
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
    </div>
    </div>
</template>

<script>
import { search,unCollect,storeAnswer,LikeAnswer,videoDetails} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
import Search from '../../components/Search.vue'
export default {
    inject: ['reload'],
    name: "SearchResult",
    components: {
        HeaderHandler,
        Search
    }, 
    data(){
        return{
            name:"",
            dataList:[],
              length:"",
           typeList:[
                    {
                    name: "帖子",
                    type: "tiezi",
                    },
                    {
                    name: "文档",
                    type: "doc",
                    },
                    {
                    name: "视频",
                    type: "video",
                    },
                ],
                this_type:'tiezi',
                userId:"",
                total:0,
        }
    },
    mounted() {
        this.name = window.localStorage.getItem("searchcontent")
         this.userId = window.localStorage.getItem("userid")
         console.log('1',   this.userId)
        let dataRequest = {
                pageNum:1,
                pageSize:6,
                sort:1,
                content:this.name,
                userId:this.userId,
              }
        search(dataRequest).then((response) => {
            console.log('我是search返回数据',response);
            this.dataList = response.data;
             this.length = response.data.length;
             this.total = parseInt(response.total);
                 if(response.total == '0')
                        // window.alert(response.msg)
                        window.alert('未在帖子区搜到符合关键词的结果,换个类别或关键词试试')
        });
    },
    methods:{
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
        pushInfo2(id) {
              this.$router.push(
                {
                  name:'Details',
                  params: {
                    dataID: id
                  }
                  }
                )
          },
        pushInfo(id)
            {
                this.$router.push(
                    {
                    name:'ContentDetails',
                    params: {
                        postId: id
                    }
                    }
                    )
            },
                 like(id){
         this.userId = window.localStorage.getItem("userid")
        let dataRequest = {
            userId:this.userId ,
            answerId:id,
        }
          LikeAnswer(dataRequest).then((res) => {
          console.log('点赞',res)
          this.reload();
      });
    },
               store(id){
        this.userId = window.localStorage.getItem("userid")
        let dataRequest = {
            userId:this.userId ,
            targetId:id,
            sort:1,
        }
          storeAnswer(dataRequest).then((res) => {
          console.log('收藏',res)
          this.reload();
      });
    },
    unstore(id){
        this.userId = window.localStorage.getItem("userid")
        let dataRequest = {
            userId:this.userId ,
            targetId:id,
            sort:1,
        }
          unCollect(dataRequest).then((res) => {
          console.log('取消收藏',res)
          this.reload();
      });
    },
         handlerTypeClick(type){
              this.userId = window.localStorage.getItem("userid");
              this.name = window.localStorage.getItem("searchcontent")
                if(type === 'tiezi')
                {
                
                    let requestdata1 = {
                      userId:this.userId,
                        pageNum:1,
                        pageSize:6,
                        sort:1,
                        content:this.name,
                    };
                    search(requestdata1).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                        this.this_type = 'tiezi',
                        this.total = parseInt(response.total);
                        if(response.total == '0')
                        // window.alert(response.msg)
                        window.alert('未在帖子区搜到符合关键词的结果,换个类别或关键词试试')
                    })
                }
                 if(type === 'doc')
                {
                   let requestdata1 = {
                      userId:this.userId,
                          pageNum:1,
                        pageSize:6,
                        sort:2,
                          content:this.name,
                    };
                    search(requestdata1).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                        this.this_type = 'doc',
                        this.total = parseInt(response.total);
                         if(response.total == '0')
                        // window.alert(response.msg)
                        window.alert('未在文档区搜到符合关键词的结果,换个类别或关键词试试')
                    })
                }
                if(type === 'video')
                {
                      let requestdata1 = {
                      userId:this.userId,
                          pageNum:1,
                        pageSize:6,
                        sort:3,
                          content:this.name,
                    };
                    search(requestdata1).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                        this.this_type = 'video',
                        this.total = parseInt(response.total);
                         if(response.total == '0')
                        // window.alert(response.msg)
                        window.alert('未在视频区搜到符合关键词的结果,换个类别或关键词试试')
                    })
                }
            },
                 changePage(e){
                  this.userId = window.localStorage.getItem("userid")
                let requestData5 = {
                pageNum: e,
                pageSize: 6,
                sort:1,
                userId:this.userId,
                };
               getPost(requestData5).then((response) => {
                this.dataList = response.data;
                this.dataInfoListLoading = false;
                this.total = parseInt(response.total);
            });
            },
    }
}
</script>

<style lang="scss" scoped>
.box3{
  margin-top: 64px;
  height: 123px;
  margin-left: 32px;

}
.video_img{
  width: 112px;
	height: 84px;
	background-color: #ffeeee;
	border: solid 1px #364cc6;
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
.postman2{
  margin-left: 31px;
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
.line7{
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
.data_img{
  width: 87px;
	height: 123px;
}
.box2{
  margin-top: 64px;
  height: 123px;
  margin-left: 32px;
}
.line2{
    width: 32px;
	height: 3px;
	background-color: #3656c6;
    margin-left: 58px;
}
.type{
    margin-left: 28px;
    width:96px;
    height: 32px;
    font-size: 14px;
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
    font-size: 14px;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    line-height: 32px;
     margin-left: 28px;
        color: #000000;
}
.nav2{
    height: 64px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.3);
	border-radius: 4px;
}
.content-detail{
    width: 100%;
    background-color: #FAFAFA;
}
.content-detail2{
    width: 50%;
    margin-left: 25%;
    background-color: #fff;
}

.like{
    margin-left: 7px;
	height: 24px;
	font-size: 14px;
	line-height: 24px;
    color: #84878d;
}
.commend_img{
    margin-left: 54px;
    width: 24px;
    height: 24px;
}
.comment{
    margin-left: 7px;
	height: 24px;
	font-size: 14px;
	line-height: 24px;
	color: #84878d;
}
.store_img{
     margin-left: 24px;
}
.store{
    margin-left: 7px;
	height: 24px;
	font-size: 14px;
	line-height: 24px;
	color: #84878d;
}
.box{
    height: 134px;
    margin-top: 24px;
    margin-left: 32px;
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
    margin-top: 24px;
}
.nav3{
    height: 64px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.3);
	border-radius: 4px;
}
.content{
	background-color: #ffffff;
}
.con{
    margin-top: 12px;
    margin-bottom: 12px;
    width: 732px;
	height: 46px;
	font-size: 14px;
	color: #000000;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 23px;/* 需要注意的是 如果是两行省略 需要添加比如
 line-height或者其他属性老保证这两行文字站位高度为盒子高度的一半 */
}
.fenye{
    margin-top: 38px;
}
</style>
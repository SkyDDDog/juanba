<template>
  <div class="wrap-box">
    <div class="nav">
    <HeaderHandler/>
    </div>
    <div class="content">
    <div class="details_nav d-flex">
          <div class="title">{{dataInfo.title}}</div>
          <div class="dissussionNum">{{dataInfo.discussNum}}条讨论/</div>
          <div class="storeNum">{{dataInfo.collectNum}}条收藏</div>
          <div><img class="store-img" v-if="dataInfo.isCollected === false" @click="Store(dataInfo.postId)" src="../../assets/icon_Star.png" alt=""></div>
          <div><img class="store-img" v-if="dataInfo.isCollected === true" @click="unCollects(dataInfo.postId)" src="../../assets/icon_Star(1).png" alt=""></div>
          <div class="store cursor-point">收藏</div>
          <button class="reply cursor-point">回复</button>
          <div class="line"></div>
    </div>
    <div class="content-describe">
      <div class="con d-flex">
      <div class="userphoto cursor-point">
      <img :src="dataInfo.userHead" alt="">
      </div>
      <div class="username">{{dataInfo.userName}}</div>
      <div class="content1">贴主</div>
      <div class="time">{{dataInfo.date}}</div>
      <div class="jubao cursor-point" @click="show()">举报本帖</div>
      </div>
       <div class="title2">
       {{dataInfo.title}}
      </div>
    </div>
    <div class="comment">
    <div
            v-for="(item,index) in dataInfoList"
            :key="index"
            class="box "
        >
        <div class="nav d-flex">
           <div class="userphoto2">
          <img :src="item.userhead" alt="">
          </div>
          <div class="username2">
          {{item.username}}
          </div>
          <div class="time2">
          {{item.date}}
          </div>
        </div>
        <div class="sign pcur" @click="jumpMessage(item)">
        发起私信
        </div>
        <div class="content11"   @click="push(item.commentId)">
        {{item.content}}
        </div>
          <div class="small-bar d-flex">
           <img class="like11-img cursor-point" @click="like(item.commentId)" v-if="item.isLiked === false" src="../../assets/icon_Like(1).png" alt="">
           <img class="like11-img cursor-point" v-if="item.isLiked === true" src="../../assets/icon_Like.png" alt="">
            <div class="like11">{{item.likes}}个赞</div>
            <img class="diss-img cursor-point" src="../../assets/icon_comment.png" alt="">
            <div class="diss cursor-point">{{item.commentNum}}条评论</div>
             <img class="store3-img cursor-point" v-if="item.isCollected === false" @click="store(item.commentId)" src="../../assets/icon_Star.png" alt="">
             <img class="store3-img cursor-point" v-if="item.isCollected === true" @click="unstore(item.commentId)" src="../../assets/icon_Star(1).png" alt="">
             <div class="store3">收藏</div>
          </div>
        <div class="line"></div>
    </div>  
    </div>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
	    @current-change="changePage"
       :page-size=3
      class="fenye"
    >
    </el-pagination>
    <div class="commentContent">
    <div class="top d-flex">
     <div><img  class="userHead" :src="userHead" alt=""></div>
    <input
        class="commented"
        type="text"
        placeholder="说点什么，参与讨论..."
        @blur="getcommented"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='说点什么，参与讨论...'"
      />
    </div>
    <div class="line"></div>
    <div class="bottom d-flex">
    <img src="" alt="">
    <div class="con11">上传图片</div>
    <button class="confirm" @click="replyIt()">回复</button>
    </div>
    </div>
    </div>
    <div class="jubao1" v-if="isShow === true">
     <div class="cancle" @click="cancleChoose()"><img class="cancle-img cursor-point" src="../../assets/icon_quit.png" alt=""></div>
     <div class="jubao-wenzi">举报</div>
     <div class="reason">选择举报理由</div>
     <div
            v-for="(item,index) in fixedList"
            :key="index"
            class="box11 d-flex"
        >
        <div v-if="item.lable===con"><img class="reason-img cursor-point" @click="choose(item.lable)" src="../../assets/icon_radiobtn_on.png" alt=""></div>
        <div v-else><img class="reason-img cursor-point" @click="choose(item.lable)"  src="../../assets/icon_radiobtn_off.png" alt=""></div>
        <div class="reason-content cursor-point" @click="choose(item.lable)">{{item.lable}}</div>
      </div>
      <button class="jubao-button cursor-point" @click="jubao()">举报</button>
    </div>
    <div class="hot">
    <Hot/>
    </div>
    </div>
</template>

<script>
import { getInfo ,getAnswer,answerComment,LikeAnswer,storeAnswer,unCollect,getMessage,report,commentT} from "../../api/api";
import     Hot from '../../components/Hot.vue'
import HeaderHandler from '../../components/HeaderHandler.vue'
export default {
  name: "ContentDetails",
  inject: ['reload'],
  components: {
    HeaderHandler,
    Hot
  },
  data() {
    return {
      dataInfo: [],
      shopID: "",
      postId:'',
      myId:"",
      dataInfoList:[],
      total:1,
      commentList:[],
      islike:false,
      userId:'',
      com:false,
      con:"",
      userHead:'',
      isShow:false,
        fixedList:[
          {lable:"辱骂、人身攻击等不友善行为"},
          {lable:"淫秽色情等不良信息"},
          {lable:"垃圾广告"},
          {lable:"骚扰行为"},
          {lable:"涉嫌侵权"},
        ],
    };
  },
  mounted() {
    const id = this.$route.params.postId;
    if (id) {
      window.localStorage.setItem("postId", id);
    }
    let postId = window.localStorage.getItem("postId");
    if (postId !== "undefined") {
      this.postId = postId;
      console.log(this.postId);
    }
    this.getShopInfo()
    this.getAnswers()
        this.userId = window.localStorage.getItem("userid");
                this.email = window.localStorage.getItem("username");
            let  dataRequest ={
                userId:this.userId,
            };
            getMessage(dataRequest).then((res) => {
                console.log('获取个人信息',res)
              this.userHead = res.data.userhead
              console.log('用户头像', this.userHead)
            });
  },
  methods: {
    jumpMessage(item) {
      console.log(item)
      this.$router.push({path:'/Message',query:{
        userId:item.userId,
        head: item.userhead,
        name: item.username
      }})
      console.log('toid', item.userId)
        window.localStorage.setItem("toid",item.userId);
    },
    replyIt(){
        this.userId = window.localStorage.getItem("userid")
        this.postId = window.localStorage.getItem("postId")
        let dataRequest = {
            userId:this.userId ,
            postId:this.postId,
             content:this.content,
        }
          commentT(dataRequest).then((res) => {
          console.log('回答某帖子',res)
          this.reload();
      });
    },
               store(id){
        this.userId = window.localStorage.getItem("userid")
        let dataRequest = {
            userId:this.userId ,
            targetId:id,
            sort:2,
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
            sort:2,
        }
          unCollect(dataRequest).then((res) => {
          console.log('取消收藏',res)
          this.reload();
      });
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
    jubao(){
      this.postId = window.localStorage.getItem("postId")
      this.con = window.localStorage.getItem("jubaocontent")
      let dataRequest = {
        userId:this.myId,
        targetId:this.postId,
        sort:1,
        reason:this.con,
      }
       report(dataRequest).then((res) => {
          console.log('举报本帖',res)
          alert(res.msg)
      });
      this.isShow = false
    },
    choose(con){
      window.localStorage.setItem("jubaocontent",con)
      this.con = con
    },
    cancleChoose(){
      this.isShow = false
    },
    show(){
      this.isShow = true
    },
    getcommented(event){
       this.content = event.target.value;
            console.log(this.content);
    },
    getShopInfo() {
      this.userId = window.localStorage.getItem("userid")
      let dataRequest = {
        userId:this.userId,
        postId:this.postId
      }
      console.log(this.postId);
      getInfo(dataRequest).then((res) => {
          console.log('帖子详情',res)
        this.dataInfo = res.data;
        this.myId = res.data.userId
        console.log('myId', this.myId)
      });
    },
     getAnswers() {
         this.userId = window.localStorage.getItem("userid")
      let  dataRequest ={
        postId:this.postId,
        pageNum:1,
        pageSize:3,
        userId:this.userId
      };
      getAnswer(dataRequest).then((res) => {
          console.log('回答',res)
        this.dataInfoList = res.data;
      
       this.total = parseInt(res.total);
      });
    },
         changePage(e){
             this.userId = window.localStorage.getItem("userid")
                let requestData5 = {
                pageNum: e,
                pageSize: 3,
                postId:this.postId,
                userId:this.userId
                };
               getAnswer(requestData5).then((response) => {
                this.dataInfoList = response.data;
            });
            },
    getcomment(id){
      console.log('评论的评论', '1')
         let  dataRequest ={
        answerId:id,
        pageNum:1,
        pageSize:1,
      };
      answerComment(dataRequest).then((res) => {
          console.log('评论',res)
        this.commentList = res.data;
        this.com = true;
      });
    },
    push(id){
      this.$router.push(
                    {
                    name:'comment',
                    params: {
                        postId: id
                    }
                    }
                    )
    },
    Store(id){
        this.userId = window.localStorage.getItem("userid")
         let  dataRequest2 ={
        targetId:id,
        userId:this.userId,
        sort:1
      };
      storeAnswer(dataRequest2).then((res) => {
          console.log('收藏帖子',res)
        this.reload();
      });
    },
  unCollects(id){
        this.userId = window.localStorage.getItem("userid")
         let  dataRequest2 ={
        targetId:id,
        userId:this.userId,
        sort:1
      };
      unCollect(dataRequest2).then((res) => {
          console.log('取消收藏帖子',res)
        this.reload();
      });
  }
  }
 
};
</script>

<style lang="scss" scoped>
.content{
  padding-top: 16px;
}
.hot{
  position: absolute;
  top: 98px;
  left: 1180px;
  background-color: #fff;
  height: 450px;
  width: 300px;
}
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
.box11{
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
  position: absolute;
  top: 180px;
  left: 510px;
  width: 360px;
	height: 320px;
	background-color: #ffffff;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	border: solid 1px #dee2e6;
}
.con11{
  	height: 14px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #21399d;
  margin-left: 80%;
  margin-top: 5px;
}
.confirm{
  width: 64px;
	height: 32px;
	background-color: #3656c6;
	border-radius: 8px;
      border: none;
  cursor: pointer;
  color: #ffffff;
  margin-left: 4%;
}
.userHead{
  width: 48px;
	height: 48px;
  border-radius: 50%;
  margin-top: 16px;
  margin-left: 16px;
}
.commented{
  width: 800px;
	height: 120px;
	background-color: #f9f9f9;
	border-radius: 4px;
  margin-top: 16px;
  margin-left: 10px;
  margin-right: 16px;
  	border: solid 1px #bfcbd9;
    cursor: pointer;
    outline: none;
}
.input::placeholder{
  margin-left: 24px;
}
.comment11{
  width: 843px;
	border-radius: 4px;
	border: solid 1px #364cc6;
}
.commentContent{
  	width: 50%;
  background: rgb(255, 255, 255);
  margin-left: 17%;
}
.fenye{
  margin-left: 53%;
  margin-top: 20px;
}
.small-bar >div{
  margin-top: 10px;
}
.like11-img{
    margin-left: 82px;
}
.like11,.diss,.store3{
  margin-left: 9px;
}
.diss-img,.store3-img{
  margin-left: 64px;
}
.sign{
  position: relative;
  top: -16px;
  left: 85px;
	width: 71px;
	height: 26px;
	background-color: #ffffff;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 0px 8px 8px 8px;
	border: solid 1px #dee2e6;
  line-height: 26px;
  color: #7f8497;
  padding-left: 8px;
}
.content11{
  width: 80%;
  position: relative;
  top: -12px;
  left: 85px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #000000;
  margin-top: 6px;
}
.username2{
  margin-left: 10px;
	height: 15px;
	font-family: Inter-SemiBold;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
	color: #444444;
  margin-top: 16px;
}
.time2{
  margin-left: 10px;
	height: 12px;
	font-family: Inter-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 12px;
	letter-spacing: 0px;
	color: #b6b6b6;
    margin-top: 16px;

}
.title2{
  position: relative;
  top: -33px;
  left: 81px;
}
.jubao{
  margin-top: 19px;
  margin-left: 54%;
	height: 12px;
	font-size: 12px;
	line-height: 12px;
	color: #b6b6b6;
}
.time{
  margin-top: 19px;
  margin-left: 12px;
	height: 12px;
	font-size: 12px;
	line-height: 12px;
	color: #b6b6b6;
}
.content1{
  width: 24px;
	font-size: 12px;
	color: #7f8497;
  border-radius: 8px;
  margin-left: 14px;
  background-color: #FAFAFA;
  margin-top: 18px;
}
.username{
	font-size: 15px;
  color: #444444;
  margin-top: 16px;
  margin-left: 9px;
}
.userphoto >img{
  width: 40px;
	height: 40px;
  border-radius: 50%;
  margin-left: 16px;
  margin-top: 16px;
}
.userphoto2 >img{
  width: 40px;
	height: 40px;
  border-radius: 50%;
  margin-left: 34px;
  margin-top: 16px;
}
.warp-box{
  width: 100%;
}
.content{
  width: 100%;
  background: rgb(250, 250, 250);
height: 100%;
}
.details_nav{
  margin-left: 17%;
  width: 50%;
  height: 90px;
  background: rgb(255, 255, 255);
}
.title{
	font-size: 20px;
  margin-top: 35px;
  margin-left: 32px;
	line-height: 20px;
	color: #000000;
  
}
.dissussionNum{
	font-size: 14px;
  margin-top: 38px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #b6b6b6;
  margin-left: 24px;
}
.storeNum{
  font-size: 14px;
  margin-top: 38px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #b6b6b6;
}
.store-img{
width: 19px;
	height: 18px;
  margin-left: 134px;
  margin-top: 38px;
}
.store{
    font-size: 14px;
  margin-top: 40px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #b6b6b6;
  margin-left: 5px;
}
.reply{
  	width: 64px;
	height: 32px;
	background-color: #3656c6;
	border-radius: 8px;
    border: none;
    cursor: pointer;
    outline: none;
    color: #ffffff;
      margin-top: 29px;
      margin-left: 24px;
}
.line{
	height: 1px;
background-color:#FAFAFA;
	background-blend-mode: normal, 
		normal;
    margin-bottom: 12px;
    margin-top: 22px;
}
.content-describe{
  	width: 50%;
  background: rgb(255, 255, 255);
  margin-left: 17%;
}
.comment{
  	width: 50%;
  background: rgb(255, 255, 255);
  margin-left: 17%;
}
.con{
  width: 96%;
	height: 90px;
  margin-top: 6px;
	background-image: linear-gradient(
		rgba(236, 244, 253, 0.43), 
		rgba(236, 244, 253, 0.43)), 
	linear-gradient(
		rgba(249, 249, 249, 0.55), 
		rgba(249, 249, 249, 0.55));
	background-blend-mode: normal, 
		normal;
	border-radius: 4px;
  margin-left: 2%;
}
</style>
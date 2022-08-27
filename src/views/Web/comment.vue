<template>
  <div class="wrap-box">
    <div class="nav">
    <HeaderHandler/>
    </div> 
    <div class="pad"></div>
    <div class="detail">
    <div class="comment">
        <div class="nav d-flex">
           <div class="userphoto2">
          <img :src="dataInfoList.userhead" alt="">
          </div>
          <div class="username2">
          {{dataInfoList.username}}
          </div>
          <div class="time2">
          {{dataInfoList.date}}
          </div>
          <div class="jubao2 cursor-point" @click="show()">
          举报
          </div>
        </div>
        <div class="sign">
        {{dataInfoList.signature}}
        </div>
        <div class="content11">
        {{dataInfoList.content}}
        </div>
          <div class="small-bar d-flex">
           <img class="like11-img cursor-point" v-if="!dataInfoList.isLiked" @click="like(dataInfoList.commentId)" src="../../assets/icon_Like(1).png" alt="">
           <img class="like11-img cursor-point" v-else src="../../assets/icon_Like.png" alt="">
            <div class="like11">{{dataInfoList.likes}}个赞</div>
            <img class="diss-img cursor-point" src="../../assets/icon_comment.png" alt="">
            <div class="diss cursor-point" @click="getanswerComment(dataInfoList.commentId)">{{dataInfoList.commentNum}}条评论</div>
             <img class="store3-img cursor-point" @click="store(dataInfoList.commentId)" v-if="!dataInfoList.isCollected" src="../../assets/icon_Star.png" alt="">
             <img class="store3-img cursor-point" @click="unstore(dataInfoList.commentId)" v-else src="../../assets/icon_Star(1).png" alt="">
             <div class="store3">收藏</div>
          </div>
          <div class="com">
          <div 
             v-for="(item,index) in commentList"
            :key="index"
            class="pl d-flex">
          <div class="userphoto1">
          <img :src="item.userhead" alt="">
          </div>
          <div class="usernames">
          {{item.username}}
          </div>
          <div class="date">
          {{item.date}}
          </div>
          <div class="jubao4 cursor-point" @click="storeId(item.ccId,item.fromId)">举报</div>
          <div class="contents">
          {{item.content}}
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
        <div class="line"></div>
    </div>
    <div class="your-comment d-flex">
    <div><img  class="userHead" :src="userHead" alt=""></div>
    <input
        class="commented"
        type="text"
        placeholder="评论层主..."
        @blur="getcommented"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='评论层主...'"
      />
    <button class="reply" @click="commentAnswers()">回复</button>
    </div>
    </div>
    <div class="hot">
    <Hot/>
    </div>
    <div class="jubao1" v-if="isShow === true">
     <div class="cancle" @click="cancleChoose()"><img class="cancle-img cursor-point" src="../../assets/icon_quit.png" alt=""></div>
     <div class="jubao-wenzi cursor-point">举报</div>
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
    <div class="jubao11" v-if="isShow1 === true">
     <div class="cancle" @click="cancleChoose1()"><img class="cancle-img cursor-point" src="../../assets/icon_quit.png" alt=""></div>
     <div class="jubao-wenzi cursor-point">举报</div>
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
      <button class="jubao-button cursor-point" @click="jubao1()">举报</button>
    </div>
    </div>
</template>

<script>
import { commentAnswer ,getAnswer2,answerComment,LikeAnswer,storeAnswer,unCollect,getMessage,report} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
import     Hot from '../../components/Hot.vue'
export default {
    inject: ['reload'],
  name: "comment",
  components: {
    HeaderHandler,
    Hot
  },
  data() {
    return {
      isShow1:false,
      dataInfo: [],
      shopID: "",
      postId:'',
      dataInfoList:[],
      total:1,
      commentList:[],
      userId:'',
      com:false,
      answerId:'',
      total:0,
      con:"",
      userHead:"",
      content:"",
      isShow:false,
       fixedList:[
          {lable:"辱骂、人身攻击等不友善行为"},
          {lable:"淫秽色情等不良信息"},
          {lable:"垃圾广告"},
          {lable:"骚扰行为"},
          {lable:"涉嫌侵权"},
        ],
        ccId:"",
        fromId:"",
    };
  },
  mounted() {
    const id = this.$route.params.postId;
    if (id) {
      window.localStorage.setItem("answerId", id);
    }
    let answerId = window.localStorage.getItem("answerId");
    if (answerId !== "undefined") {
      this.answerId = answerId;
      console.log(this.answerId);
    }
    this.getAnswers(),
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
  created(){
        this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            answerId:this.answerId,
            pageNum:1,
            pageSize:10,
        }
          answerComment(dataRequest).then((res) => {
          console.log('评论',res)
          this.commentList = res.data;
          this.total = parseInt(res.total);
      });
  },
  methods: {   
    cancleChoose1(){
      this.isShow1 = false
    },
    storeId(ccId,fromId){
      this.ccId = ccId,
      this.fromId = fromId,
      console.log('cc', this.ccId)
      console.log('cc2', this.fromId)
      this.isShow1 = true
    },
        jubao(){
      this.answerId = window.localStorage.getItem("answerId")
      this.con = window.localStorage.getItem("jubaocontent")
      let dataRequest = {
        userId:this.myId,
        targetId:this.answerId,
        sort:2,
        reason:this.con,
      }
       report(dataRequest).then((res) => {
          console.log('举报本帖',res)
          alert(res.msg)
      });
    },
    jubao1(){
      this.con = window.localStorage.getItem("jubaocontent")
      let dataRequest = {
        userId:this.fromId,
        targetId:this.ccId,
        sort:3,
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
    getcommented(event){
       this.content = event.target.value;
            console.log(this.content);
    },
     getAnswers() {
         this.userId = window.localStorage.getItem("userid")
      let  dataRequest ={
        id:this.answerId,
        userId:this.userId,
      };
      getAnswer2(dataRequest).then((res) => {
          console.log('回答',res)
        this.dataInfoList = res.data;
        this.total = parseInt(res.total);
        this.myId = res.data.userId
      });
    },
      changePage(e){
                 this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            answerId:this.answerId,
            pageNum:e,
            pageSize:2,
        }
          answerComment(dataRequest).then((res) => {
          console.log('评论',res)
          this.commentList = res.data;
          console.log('1', res.total)
          this.total = parseInt(res.total);
      });
            },
    like(){
         this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            userId:this.userId ,
            answerId:this.answerId,
        }
          LikeAnswer(dataRequest).then((res) => {
          console.log('点赞',res)
          this.reload();
      });
    },
    store(){
        this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            userId:this.userId ,
            targetId:this.answerId,
            sort:2,
        }
          storeAnswer(dataRequest).then((res) => {
          console.log('收藏',res)
          this.reload();
      });
    },
    unstore(){
        this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            userId:this.userId ,
            targetId:this.answerId,
            sort:2,
        }
          unCollect(dataRequest).then((res) => {
          console.log('取消收藏',res)
          this.reload();
      });
    },
    getanswerComment(){
          this.userId = window.localStorage.getItem("userid")
         this.answerId = window.localStorage.getItem("answerId")
        let dataRequest = {
            answerId:this.answerId,
            pageNum:1,
            pageSize:2,
        }
          answerComment(dataRequest).then((res) => {
          console.log('评论',res)
          this.commentList = res.data;
          this.total = parseInt(res.total);
      });
    },
    commentAnswers(){
      this.userId = window.localStorage.getItem("userid")
      this.answerId = window.localStorage.getItem("answerId")
      this.postId = window.localStorage.getItem("postId")
      let dataRequest = {
        userId:this.userId,
        answerId:this.answerId,
        postId:this.postId,
        content:this.content
      }
        commentAnswer(dataRequest).then((res) => {
          console.log('回复回答',res)
          window.alert("评论帖子成功"),
             this.reload();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #fff;
}
.hot{
  position: absolute;
  top: 143px;
  left: 1180px;
  background-color: #fff;
  height: 450px;
  width: 300px;
}
.jubao11{
  background-color: #fff;
  position: relative;
  top: -400px;
  left: 470px;
  width: 360px;
	height: 320px;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	border: solid 1px #dee2e6;
}
.jubao4{
  margin-left: 300px;
  color: #84878d;
}
.wrap-box{
   background-color:#FAFAFA;
}
.detail{
  background-color:#FAFAFA;
  height: 90%;
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
  position: relative;
  top: -335px;
  left: 510px;
  width: 360px;
	height: 320px;
	background-color: #ffffff;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	border: solid 1px #dee2e6;
}
.jubao2{
  	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
  margin-top: 19px; 
  margin-left: 457px;
}
.reply{
  width: 64px;
	height: 32px;
	background-color: #3656c6;
	border-radius: 8px;
    border: none;
  cursor: pointer;
  color: #ffffff;
  margin-top: 26px;
  margin-bottom: 26px;
  margin-left: 10px;
}
.commented{
  	width: 560px;
	height: 46px;
	border-radius: 4px;
	border: solid 1px #ecedee;
  margin-left: 5px;
  margin-top: 18px;
   cursor: pointer;
    outline: none;
}
.your-comment{
   width: 50%;
    margin-left: 17%;
    background-color: #FFFFFF;
}
.userHead{
  width: 48px;
	height: 48px;
  border-radius: 50%;
   margin-left: 87px;
   margin-top: 18px;
}
.fenye{
  margin-top: 16px;
  margin-left: 70%;
}
.com{
    margin-top: 30px;
    width: 80%;
    margin-left: 10%;
	border-radius: 4px;
border: solid 1px #ecedee;
}
.usernames{
	height: 15px;
	font-family: Inter-SemiBold;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
	color: #444444;
    margin-top: 3px;
    margin-left: 15px;
}
.date{
	height: 12px;
	font-family: Inter-Regular;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 12px;
	letter-spacing: 0px;
	color: #b6b6b6;
  margin-top: 4px;
  margin-left: 6px;
}
.contents{
        position: relative;
    top: 22px;
    left: -431px;
	height: 23px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #000000;
}
.pl{
margin-top: 16px;
}
.userphoto1 >img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 12px;
}
.detail{
width: 100%;
background-color: #FAFAFA;
}
.comment{
    width: 50%;
    margin-left: 17%;
    background-color: #FFFFFF;
}
.pad{
     width: 100%;
    height: 64px;
    background-color: #FAFAFA;
}
.userphoto2 >img{
    width: 70px;
	height: 70px;
    border-radius: 50%;
    margin-left: 14px;
}
.username2{
     margin-left: 10px;
	height: 18px;
	font-family: Inter-SemiBold;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #444444;
  margin-top: 16px;
}
.time2{
   margin-left: 10px;
	height: 15px;
	font-family: Inter-Regular;
	font-size: 15px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 15px;
	letter-spacing: 0px;
	color: #b6b6b6;
    margin-top: 19px; 
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
  top: -15px;
  left: 85px;
	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #7f8497;
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
  margin-top: 24px;
}
</style>
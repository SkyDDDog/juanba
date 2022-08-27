<template>
    <div class="content">
    <div class="nav justify-content-between">
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
        <div class="release d-flex" @click="Release">
        <div class="icon-post cursor-point"> <img src="../assets/icon_post.png" alt=""></div>
        <div class="cursor-point">发布帖子</div>
        </div>
      </div>
    </div>
    <div class="specify">
      <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box"
        >
        <div class="content-title cursor-point" @click="pushInfo(item.postId)">{{item.title}}</div>
        <div class="con cursor-point"  @click="pushInfo(item.postId)">{{item.bestAnswer}}</div>
        <div class="detail d-flex">
        <div class="like_img" @click="like(item.bestAnswerId)"  v-if="item.bestAnswerIsLiked === false"><img src="../assets/icon_Like(1).png" alt=""></div>
        <div class="like_img" @click="like(item.bestAnswerId)" v-if="item.bestAnswerIsLiked === true"><img src="../assets/icon_Like.png" alt=""></div>
        <div class="like">{{item.likes}}个赞</div>
        <div class="commend_img"><img src="../assets/icon_comment.png" alt=""></div>
        <div class="comment">{{item.discussNum}}个评论</div>
        <div class="store_img" v-if="item.isCollected === false" @click="store(item.postId)"><img src="../assets/icon_Star.png" alt=""></div>
        <div class="store_img" v-if="item.isCollected === true" @click="unstore(item.postId)"><img src="../assets/icon_Star(1).png" alt=""></div>
        <div class="store" @click="strore()" v-if="item.isCollected === true || item.isCollected === false">收藏</div>
        </div>
        <div class="line" v-if="index != length-1"></div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
	  @current-change="changePage"
      :page-size=6
    class="fenye"
    >
    </el-pagination>
    </div>
</template>

<script>
import {getPost,getrecommodate,unCollect,storeAnswer,LikeAnswer,getPost2} from "../api/api"
    export default {
        inject: ['reload'],
        data(){
            return{
                total:1,
                length:"",
                dataInfoListLoading: true,
                pageNum:1,
                pageSize:6,
                commendList:[],
                dataList:[],
                sort:0,
                this_type:'recommend',
                typeList:[
                    {
                    name: "推荐",
                    type: "recommend",
                    },
                    {
                    name: "最新发帖",
                    type: "newrelease",
                    },
                    {
                    name: "最新回复",
                    type: "newreply",
                    },
                ],
                sorts:1,
            }
        },
        created(){
            this.userId = window.localStorage.getItem("userid");
             if(this.userId === null)
             {
                     let requestdata0 = {
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        sort:1,
                    };
                   getPost2(requestdata0).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                         this.total = parseInt(response.total);
                        this.dataInfoListLoading = false;
                        this.length = response.data.length;
                           console.log(response.data.length);
                    })
             }
             else{
                  let requestdata0 = {
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                        sort:1,
                        userId:this.userId
                    };
                   getPost(requestdata0).then((response)=>{
                        console.log('我是返回的数据',response);
                        this.dataList = response.data;
                         this.total = parseInt(response.total);
                        this.dataInfoListLoading = false;
                        this.length = response.data.length;
                           console.log(response.data.length);
                    })
             }
        },
        methods:{
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
            changePage(e){
                if(this.this_type === 'recommend')
                {
                     this.sorts = 1
                }
                if(this.this_type === 'newreply')
               {
                    this.sorts = 2
               }
               if(this.this_type === 'newrelease')
               {
                    this.sorts = 3
               }
                
                this.userId = window.localStorage.getItem("userid")
                if(this.userId === null)
             {
                let requestData5 = {
                pageNum: e,
                pageSize: 6,
                sort:this.sorts,
                };
               getPost2(requestData5).then((response) => {
                this.dataList = response.data;
                 this.total = parseInt(response.total);
                this.dataInfoListLoading = false;
            });
             }
             else{
                      let requestData5 = {
                pageNum: e,
                pageSize: 6,
                sort:this.sorts,
                userId:this.userId,
                };
               getPost(requestData5).then((response) => {
                this.dataList = response.data;
                 this.total = parseInt(response.total);
                this.dataInfoListLoading = false;
            });
             }
           
            },
            handlerTypeClick(type){
                  this.userId = window.localStorage.getItem("userid")
                if(type === 'newrelease')
                {
                 if(this.userId === null)
                        {
                                let requestdata1 = {
                                pageNum:this.pageNum,
                                pageSize:this.pageSize,
                                sort:3,
                            };
                            getPost2(requestdata1).then((response)=>{
                                console.log('我是返回的数据',response);
                                this.dataList = response.data;
                                this.this_type = 'newrelease'
                                 this.total = parseInt(response.total);
                            })
                   }
                   else{
                        let requestdata1 = {
                            pageNum:this.pageNum,
                            pageSize:this.pageSize,
                            sort:3,
                            userId:this.userId
                        };
                        getPost(requestdata1).then((response)=>{
                            console.log('我是返回的数据',response);
                            this.dataList = response.data;
                            this.this_type = 'newrelease'
                             this.total = parseInt(response.total);
                        })
                   }
                    
                }
                 if(type === 'newreply')
                {
                   if(this.userId === null)
                        {
                                let requestdata1 = {
                                pageNum:this.pageNum,
                                pageSize:this.pageSize,
                                sort:2,
                            };
                            getPost2(requestdata1).then((response)=>{
                                console.log('我是返回的数据',response);
                                this.dataList = response.data;
                                this.this_type = 'newreply'
                                 this.total = parseInt(response.total);
                            })
                   }
                   else{
                        let requestdata2 = {
                            pageNum:this.pageNum,
                            pageSize:this.pageSize,
                            sort:2,
                            userId:this.userId
                        };
                    getPost(requestdata2).then((response)=>{
                            console.log('我是返回的数据',response);
                            this.dataList = response.data;
                            this.this_type = 'newreply'
                             this.total = parseInt(response.total);
                        })
                   }
                    
                }
                if(type === 'recommend')
                {
                    if(this.userId === null)
                        {
                                let requestdata1 = {
                                pageNum:this.pageNum,
                                pageSize:this.pageSize,
                                sort:1,
                            };
                            getPost2(requestdata1).then((response)=>{
                                console.log('我是返回的数据',response);
                                this.dataList = response.data;
                                this.this_type = 'recommend'
                                 this.total = parseInt(response.total);
                            })
                   }
                   else{
                            let requestdata4 = {
                            pageNum:this.pageNum,
                            pageSize:this.pageSize,
                            sort:1,
                            userId:this.userId
                        };
                    getPost(requestdata4).then((response)=>{
                            console.log('我是返回的数据',response);
                            this.dataList = response.data;
                            this.this_type = 'recommend'
                            console.log( this.this_type)
                             this.total = parseInt(response.total);
                        })
                   }
                  
                }
            },
           
            Release(){
                 this.userId = window.localStorage.getItem("userid")
                if(this.userId === null)
                {
                    alert('请登录后再发布帖子')
                }
                else{
                    this.$router.push(
                    {
                    name:'PostContent',
                    }
                    )
                }
            },

            pushInfo(id)
            {
                  this.userId = window.localStorage.getItem("userid")
                if(this.userId === null)
                {
                    alert('请登录后再查看帖子详情')
                }
                else{
                         this.$router.push(
                    {
                    name:'ContentDetails',
                    params: {
                        postId: id
                    }
                    }
                        )
                }
                }
           
        }
    }
</script>

<style lang="scss" scoped>
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
.nav{
    height: 64px;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.3);
	border-radius: 4px;
}
.content{
	background-color: #ffffff;
}
.content-title{
	height: 16px;
	font-size: 16px;
	line-height: 16px;
	color: #000000;
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
.type{
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
.release{
    width: 120px;
	height: 40px;
	background-color: #e6ecf9;
	border-radius: 12px;
    align-items: center;
    justify-content:center;
    margin-left:285px ;
}
.icon-post{
    margin-right: 5px;
}
.fenye{
    margin-top: 24px;
}
</style>
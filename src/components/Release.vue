<template>
    <div class="release">
      <div class="nav d-flex">
        <template v-for="item in typeList">
          <div
            :key="item.type"
            class="cursor-point"
            @click="handlerTypeClick(item.kind,item.type)"
          >
            <div class="this_type" v-if="this_type === item.type">{{ item.name }}</div>
            <div class="type" v-else>{{ item.name }}</div>
          </div>
        </template>
      </div>
      <div class="line"></div>
      <div class="content">
       <div
            v-for="(item,index) in releaseList"
            :key="index"
            class="box"
        >
        <div class="d-flex">
        <div>
        </div>
        <div class="diss-tltle d-flex">
        <div class="title cursor-point" v-if="item.kind === '文档'" @click="pushInfo1(item.id)">{{item.title}}</div>
        <div class="title cursor-point" v-else-if="item.kind === '视频'" @click="pushInfo2(item.id)">{{item.title}}</div>
        <div v-else class="title cursor-point" @click="pushInfo(item.id)">{{item.title}}</div>
        <div class="diss cursor-point">{{item.discussNum}}</div>
        <div class="kind2" v-if="item.kind === '文档' || item.kind === '视频'">{{item.kind}}</div>
        <div v-else class="diss-fix">讨论</div>
        </div>
        
        <div class="dates d-flex">
        <div class="date-fix">发布于</div>
        <div class="date">
        {{item.date}}
        </div>
        </div>
        </div>
        <div class="line"></div>
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
</template>

<script>
import { myRelease } from "../api/api";
    export default {
        data(){
            return{
                  typeList:[
                    {
                    name: "帖子",
                    type: "content",
                    kind:1
                    },
                    {
                    name: "资料",
                    type: "data",
                    kind:2
                    },
                ],
                this_type:"content",
                userId:"",
                sort:1,
                pageNum:"",
                pageSize:"",
                releaseList:[],
                total:0
            }
        },
        created(){
               this.userId = window.localStorage.getItem("userid"); 
                   let dataRequest={
                       userId:this.userId,
                       sort:1,
                       pageNum:1,
                       pageSize:10,
                   }
                          myRelease(dataRequest).then((res) => {
                              this.releaseList = res.data
                            console.log('我发布的帖子',res)
                            this.total = parseInt(res.total);
                        });
        },
        methods:{
                  pushInfo2(id) {
             this.$router.push(
                {
                  name:'VideoDetails',
                  params: {
                    videoID: id
                  }
                  }
                )
          },
            pushInfo1(id) {
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
                handlerTypeClick(type,kind){
                this.this_type = kind
                console.log('kind', this.this_type)
                 this.userId = window.localStorage.getItem("userid"); 
                 window.localStorage.setItem("release-type",type)
                   let dataRequest={
                       userId:this.userId,
                       sort:type,
                       pageNum:1,
                       pageSize:10,
                   }
                          myRelease(dataRequest).then((res) => {
                              this.releaseList = res.data
                            console.log('我发布的帖子',res)
                            this.total = parseInt(res.total);
                        });
            },
              	changePage(e){
                this.userId = window.localStorage.getItem("userid");
                 this.sort = window.localStorage.getItem("release-type");
                let requestData5 = {
                    userId:this.userId,
                       sort:this.sort,
                       pageNum:e,
                       pageSize:10,
                };
                console.log(this.sort)
                    myRelease(requestData5).then((response) => {
                    this.releaseList = response.data;
                    this.total = parseInt(response.total);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.kind2{
    width: 44px;
	height: 22px;
	background-color: #ecf0f9;
	border-radius: 8px;
    line-height: 22px;
    padding-left: 9px;
      margin-top: 12px;
}
.fenye{
    margin-left: 140%;
}
.diss-tltle{
    width: 500px;
}
.box{
    height: 14px;
    width: 100%;
    height: 64px!important;
}
.title{
  margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 3%;
}
.title:hover{
    color: #3758C3;
}
.dates{
    position: relative;
    left: 450px;
}
.diss{
    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 19px;
    	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
}
.diss-fix{
    width: 40px;
     margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 6px;
    	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #84878d;
}
.date-fix{
    margin-top: 14px;
    margin-bottom: 14px;
    font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #7f8497;
    width: 50px;
}
.date{
    width: 130px;
    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 6px;
    font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #7f8497;
    margin-right: 3%;
}
.nav > div{
    width: 60px;
	height: 30px;
	background-color: #f6f6f6;
	border-radius: 8px;
    font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #7f8497;
    text-align: center;
    margin-top: 18px;
    margin-left: 5%;
}
.release{
    width: 55%;
    background-color: #fff;
}
.nav{
    width: 100%;
    height: 64px;
}
.line{
 width: 268%;
 background-color: #FAFAFA;
 height: 3px;
}
.this_type{
    width: 60px;
	height: 30px;
	background-color: #3656c6;
	border-radius: 8px;
    color: #FFF;
}
</style>
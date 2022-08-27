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
        <div class="title cursor-point">{{item.title}}</div>
        <div class="diss cursor-point">{{item.discussNum}}</div>
        <div class="diss-fix">讨论</div>
        </div>
        
        <div class="dates d-flex">
        <div class="date-fix">上次浏览于</div>
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
import { myHistory } from "../api/api";
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
                sort:"",
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
                          myHistory(dataRequest).then((res) => {
                              this.releaseList = res.data
                            console.log('浏览历史',res)
                            this.total = parseInt(res.total);
                        });
        },
        methods:{
            //type 1 2 kind content data
            handlerTypeClick(type,kind){
                this.this_type = kind
                console.log('kind', this.this_type)
                 this.userId = window.localStorage.getItem("userid"); 
                 window.localStorage.setItem("history-type",type)
                   let dataRequest={
                       userId:this.userId,
                       sort:type,
                       pageNum:1,
                       pageSize:10,
                   }
                          myHistory(dataRequest).then((res) => {
                              this.releaseList = res.data
                            console.log('浏览历史',res)
                            this.total = parseInt(res.total);
                        });
            },
              	changePage(e){
                this.userId = window.localStorage.getItem("userid");
                 this.sort = window.localStorage.getItem("history-type");
                let requestData5 = {
                    userId:this.userId,
                       sort:this.sort,
                       pageNum:e,
                       pageSize:10,
                };
                    myHistory(requestData5).then((response) => {
                    this.releaseList = response.data;
                    this.total = parseInt(res.total);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.title{
    width: 300px;
     word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.fenye{
    margin-left: 100%;
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
.dates{
    position: absolute;
    left: 650px;
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
    width: 76px;
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
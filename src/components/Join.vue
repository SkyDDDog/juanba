<template>
    <div>
     <div
            v-for="(item,index) in dataList"
            :key="index"
            class="box"
        >
        <div class="title6 pcur"  @click=" pushInfo(item.postId)">{{item.title}}</div>
        <div class="commentContent6 pcur"  @click="push(item.commentId)">{{item.commentContent}}</div>
        <div class="d-flex haha">
        <div class="likes6">{{item.likes}}赞</div>
        <div class="date">回复于{{item.date}}</div>
        </div>
        <div class="line6"></div>
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
</template>

<script>
import{myJoin} from "../api/api"
    export default {
        data(){
            return{
                dataList:[],
                total:0
            }
        },
            created() {
                    this.userId = window.localStorage.getItem("userid"); 
                   let dataRequest={
                       userId:this.userId,
                       pageNum:1,
                       pageSize:10,
                   }
                          myJoin(dataRequest).then((res) => {
                              this.dataList = res.data
                            console.log('我参与的帖子',res)
                            this.total = parseInt(res.total);
                        });
            },
    methods:{
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
         	changePage(e){
                let requestData5 = {
                    userId:this.userId,
                       pageNum:e,
                       pageSize:10,
                };
                    myJoin(requestData5).then((response) => {
                    this.dataList = response.data;
                    this.total = parseInt(response.total);
                });
            },
    }
        
    }
</script>

<style lang="scss" scoped>
.fenye{
    margin-top: 38px;
    margin-left: 80%;
}
.haha{
       padding-bottom: 5px;
}
.line6{
    	width: 100%;
	height: 1px;
	background-image: linear-gradient(
		#ecedee, 
		#ecedee), 
	linear-gradient(
		#ecedee, 
		#ecedee);
	background-blend-mode: normal, 
		normal;
        margin-top: 2px;
}
.box{
    width: 100%;
    height: 108px;
    >div{
        margin-left: 32px;
    }
}
.likes6{
    width: 38px;
	height: 22px;
	background-color: #f0f5fc;
	border-radius: 5px;
    color: #21399d;
    line-height: 22px;
    padding-left: 13px;

}
.date{
    height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #7f8497;
    margin-left: 700px;
}
.commentContent6{
    height: 46px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #000000;
    padding-top: 12px;
}
.title6{
    padding-top: 10px;
    height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #555555;
}
</style>
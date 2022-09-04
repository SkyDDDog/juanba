<template>
    <div>
      <div class="top">
      近期资料
      </div>
      <div class="contents">
       <div
            v-for="item in hotList"
            :key="item.postId"
            class="shop-box d-flex"
        >
        <div class="rank">
          <div class="rank-con">{{item.rank}}</div>
        </div>
        <div class="content-list cursor-point" @click="handle(item.postId)">{{item.name}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import {
getdocumentHot
} from "../api/api";
    export default {
        data(){
            return{
                hotList:[],
                i:0,
            }
        },
        created(){
          getdocumentHot().then((response) => {
            console.log('我是返回数据1',response);
            this.hotList = response.data;
            });
        },
        methods:{
               handle(id){
                  this.$router.push(
                    {
                    name:'Details',
                    params: {
                        postId: id
                    }
                    }
                    )
            }
        }
    
    }
</script>

<style lang="scss" scoped>
.top{
    width: 92px;
	height: 16px;
	font-size: 16px;
	line-height: 16px;
    padding-top: 32px;
    margin-left: 32px;
}
.rank{
    width: 16px;
	height: 16px;
	background-color: #3656c6;
    border-radius: 50%;
    line-height: 16px;
    margin-right: 8px;
}
.rank-con{
    margin-top: 1px;
    margin-left: 3px;
    color: #ffffff;
}
.content-list{
    width: 210px;
	height: 46px;
	font-size: 14px;
	line-height: 23px;
}
.shop-box{
    margin-top: 24px;
    width: 238px;
	height: 46px;
    margin-left: 32px;
}

</style>
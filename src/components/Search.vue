<template>
    <div class="searchbar">
      <div class="align-items-center">
        <img class="icon" src="../assets/illustration_search.png" />
      </div>
       <div class="search d-flex">
       <input
        type="text"
         @blur="getname"
        placeholder="搜索全站内容: 帖子、资料"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='搜索全站内容: 帖子、资料'"
      />
        <button @click="searches()">搜索</button>
        </div>
        <div class="hotsearch d-flex">
        <div>热门搜索：</div>
        <div class="hot d-flex">
          <div
            v-for="item in searchList"
            :key="item.lable"
            class="hot-box cursor-point"
        >
        <div class="cursor-point" @click="hotSearch(item.lable)">{{item.lable}}</div>
        </div>
        </div>
        </div>
    </div>

</template>

<script>
import {
getsearch,search
} from "../api/api";
    export default {
        data(){
            return{
              searchList:[
                 {lable:"新生"},
                 {lable:"六级"},
                 {lable:"大学物理"},
                 {lable:"论文"},
              ]
            }
        },
        methods:{
          hotSearch(content){
            window.localStorage.setItem("searchcontent",content)
            console.log('2', content)
            this.userId = window.localStorage.getItem("userid")
             if(this.userId === null){
               alert('登录后使用搜索功能')
             }
             else{
                  this.$router.push(
              {
                path: "/SearchResult",      
              }
              )
             }
          
          },
            getname(event) {
                this.name= event.target.value;
                console.log(this.name);
                window.localStorage.setItem("searchcontent",this.name)
            },
            searches(){
              console.log('1', this.name)
               this.userId = window.localStorage.getItem("userid")
              if(this.userId === null){
                alert('登录后使用搜索功能')
              }
              else{
                    this.$router.push(
                {
                  path: "/SearchResult",      
                }
                )
              }

            }
    }
    }
</script>

<style lang="scss" scoped>
.hot-box{
  margin-left: 10px;
}
.searchbar{
    width: 100%;
}
.icon{
    margin-left: 38%;
    width: 315px;
    height: 90px;
}
.search input {
    width: 505px;
      font-size: 14px;
  margin-left: 30%;
  border-right: 0;
  background-color: #ffffff;
  	box-shadow: 0px 0px 4px 0px 
		rgba(229, 229, 229, 0.47);
	border-radius: 12px 0px 0px 12px;
  outline: none;
  border: 1px solid #3656c6;
}
.search button {
    width: 120px;
  margin-right: 30%;
  height: 48px;
  background-color: #3656c6;
  border-radius: 0px 12px 12px 0px;
  font-family: SourceHanSansSC-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 6px;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  border: 1px solid #3656c6;
}
input::placeholder {
  padding-left: 20px;
    font-size: 14px;
}
.hotsearch{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 38.5%;
	height: 12px;
	font-size: 12px;
	line-height: 12px;
	color: #84878d;
}
</style>
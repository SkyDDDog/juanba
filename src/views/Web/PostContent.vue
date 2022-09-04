<template>
    <div class="wrap-box">
    <div class="nav-box">
      <HeaderHandler/>
    </div>
    <div class="content">
    <div class="details">
    <input
                class="input1"
                type="text"
                placeholder="请输入标题"
                v-model="title"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请输入标题'"
    />
    <div class="line"></div>
    <input
                class="input2"
                type="text"
                placeholder="写下你想说的..."
                v-model="content"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='写下你想说的...'"
    />
    <button class="button1" @click="release()">发布</button>
    </div>
    </div>
    </div>
</template>

<script>
import { postContent } from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
    export default {
         name: "PostContent",
            components: {
                HeaderHandler
            },
            data(){
                return{
                    title:'',
                    content:'',
                    userId:'',
                }
            },
            methods:{
                release(){
                    if(this.title === '')
                    window.alert('帖子输入内容不应为空！')
                    else{
                         this.userId = window.localStorage.getItem("userid"); 
                   let dataRequest={
                       userId:this.userId,
                       title:this.title,
                       content:this.content
                   }
                          postContent(dataRequest).then((res) => {
                            console.log('发布帖子',res)
                            window.alert('恭喜您，发布帖子成功！')
                        });
                    }
                  
                }
                
            }

    }
</script>

<style lang="scss" scoped>
input::placeholder {
  padding-left: 4%;
  color: #b6b6b6;
}
.content{
    width: 100%;
    height: 650px;
    background-color: #FAFAFA;
    padding-top: 1.8%;
}
.details{
    width: 48%;
    height: 87%;
    background-color: #fff;
    margin-left: 26%;
}
.input1{
height: 9%;
width: 100%;
 cursor: pointer;
outline: none;
   border: none;
	font-family: Inter-SemiBold;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
}
.line{
    	width: 100%;
	height: 1px;
	background-image: linear-gradient(
		#364cc6, 
		#364cc6), 
	linear-gradient(
		#ecedee, 
		#ecedee);
	background-blend-mode: normal, 
		normal;
}
.input2{
    height: 62%;
width: 100%;
 cursor: pointer;
outline: none;
   border: none;
   	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
}
.button1{
    width: 13%;
    height: 6%;
    background-color: #3656c6;
	border-radius: 8px;
    font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #ffffff;
    border: none;
    margin-left: 77%;
}
</style>
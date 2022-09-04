<template>
<div class="box">
    <div class="release d-flex"> 
    <div class="re1 cursor-point">
    <img  @click="upDateDoc()" src="../assets/icon_UploadDocument.png" alt="">
    </div>
     <div class="re2 cursor-point">
    <img @click="upDateVideo()" src="../assets/icon_UploadVideo.png" alt="">
    </div>
    </div>
    <div class="wen d-flex">
    <div class="re11 cursor-point" @click="upDateDoc()">上传文档</div>
    <div class="re22 cursor-point" @click="upDateVideo()">上传视频</div>
    </div>
    <div class="doc" v-if="show === true">
    <div class="top d-flex">
    <div class="name">文件名</div>
    <button class="get">上传文件</button>
    </div>
    <div class="line"></div>
    <div class="message">
    基本信息
    </div>
    <div class="title d-flex">
    <div class="title1">标题：</div>
     <input
        class="title2"
        type="text"
        placeholder="默认文件名"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='默认文件名'"
      />
    </div>
    <div class="category d-flex">
    <div class="cat">分类：</div>
       <template>
            <el-radio-group v-model="radio" class="type">
                <el-radio :label="0">期末历年卷</el-radio>
                <el-radio :label="1">等级考试</el-radio>
                <el-radio :label="2">资格证书</el-radio>
                <el-radio :label="3">论文模板</el-radio>
                <el-radio :label="4">其他</el-radio>
            </el-radio-group>
           </template>
    </div>
    <button class="release22" @click="release()">发布</button>
    </div>
     <div class="doc" v-if="show1 === true">
    <div class="top d-flex">
    <div class="name">文件名</div>
    <button class="get">上传视频</button>
    </div>
    <div class="line"></div>
    <div class="message">
    基本信息
    </div>
    <div class="title d-flex">
    <div class="title1">标题：</div>
     <input
        class="title2"
        type="text"
        placeholder="默认文件名"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='默认文件名'"
      />
    </div>
    <button class="release22" @click="release2()">发布</button>
    </div>
</div>

</template>

<script>
    export default {
        data(){
            return{
                show:false,
                show1:false,
                radio:1,
            }
        },
        methods:{
            upDateDoc(){
                this.show = true
            },
            upDateVideo(){
                this.show1 = true
            },
            release(){
                this.show = false
            },
            release2(){
                this.show1 = false
            }
        }
    }
</script>

<style lang="scss" scoped>
.release22{
    width: 100px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
    margin-top: 10px;
    margin-left: 600px;
    border: none;
    outline: none;
    cursor: pointer;
    color: #FFF;
}
.title,.category{
    margin-left: 20px;
    margin-top: 20px;
}
.title1{
    margin-top: 10px;
}
.title2{
    	width: 600px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #bfcbd9;
    margin-left: 5px;
}
.message{
    	width: 56px;
	height: 14px;
	font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 20px;
}
.line{
    	width: 800px;
	height: 1px;
	background-image: linear-gradient(
		#ecedee, 
		#ecedee), 
	linear-gradient(
		#ecedee, 
		#ecedee);
	background-blend-mode: normal, 
		normal;
}
.get{
    width: 120px;
	height: 40px;
	background-color: #e6ecf9;
	border-radius: 12px;
    border: none;
    cursor: pointer;
    outline: none;
    margin-left: 554px;
    margin-top: 20px;
}
.top{
    width:100% ;
    height: 70px;
}
.name{
    	width: 42px;
	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #b6b6b6;
    margin-top: 30px;
    margin-left: 20px;
}
.doc{
    width: 800px;
    height: 280px;
    background-color: #FFF;
    position: absolute;
    z-index:999;
    left: -643px;
}
.box{
    background-color: #ffffff;
}
.re1{
    width: 48px;
	height: 48px;
	background-color: #fffad5;
	border-radius: 12px;
    margin-left: 21%;
    margin-top: 12%;
}
.re2{
    width: 48px;
	height: 48px;
	background-color: #ecf0f9;
	border-radius: 12px;
    margin-left: 22%;
     margin-top: 12%;
     margin-left: 12%;
}
.re11{
	height: 14px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #805313;
    margin-top: 18px;
    margin-left:19%;
}
.re22{
	height: 14px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #122174;
    margin-top: 18px;
    margin-left: 10%;
}
.re1 img,.re2 img{
    margin-left: 12px;
    margin-top: 12px;
}
</style>
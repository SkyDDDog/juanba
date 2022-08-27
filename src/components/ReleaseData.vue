<template>
<div class="box">
    <div class="release d-flex"> 
    <div class="re1 cursor-point">
    <img src="../assets/icon_UploadDocument.png" alt="">
    </div>
     <div class="re2 cursor-point">
    <img src="../assets/icon_UploadVideo.png" alt="">
    </div>
    </div>
    <div class="wen d-flex">
    <div class="re11 cursor-point">上传文档</div>
    <div class="re22 cursor-point">上传视频</div>
    </div>
</div>

</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style lang="scss" scoped>
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
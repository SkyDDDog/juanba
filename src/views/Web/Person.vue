<template>
  <div class="warp-box">
    <div class="nav">
    <HeaderHandler/>
    </div>
    <div class="content">
    <div class="bg d-flex">
    <img
    class="userphoto"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F17%2F20190517211730_kurtr.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652281535&t=d2d288f89f783b3f1adccd25a791b88b"
        />
        <div>
          <div class="nickname" v-if="nickname === '暂未填写'">完善个人信息</div>
          <div class="nickname" v-else>{{nickname}}</div>
            <div class="signature" v-if="signature === '暂未填写'">完善个人信息</div>
          <div class="signature" v-else>{{signature}}</div>
        </div>
   
    </div>
      <div class="Person-nav d-flex">
      <el-tabs :tab-position="tabPosition" style="height: 200px,width:845px">
        <el-tab-pane label="个人信息"><Personal/></el-tab-pane>
        <el-tab-pane label="我参与的"><Join/></el-tab-pane>
        <el-tab-pane label="我发布的"><Release/></el-tab-pane>
         <el-tab-pane label="收藏"><Store/></el-tab-pane>
         <el-tab-pane label="浏览历史"><History/></el-tab-pane>
      </el-tabs>
    </div>
    </div>
    
  </div>
</template>

<script>
import { getMessage } from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
import Personal from '../../components/Personal.vue'
import Join from '../../components/Join.vue'
import Release from '../../components/Release.vue'
import Store from '../../components/Store.vue'
import History from '../../components/History.vue'
export default {
  name: "Person",
  components: {
    HeaderHandler,
    Personal,
    Join,
    Release,
    Store,
    History
  },
  data() {
    return {
     tabPosition: "top",
     nickname:"",
     signature:""
    };
  },
   created(){
       this.this_fixed= ""
        window.localStorage.setItem("type",this.this_fixed);
           this.userId = window.localStorage.getItem("userid");
                this.email = window.localStorage.getItem("username");
            let  dataRequest ={
                userId:this.userId,
            };
            getMessage(dataRequest).then((res) => {
                console.log('获取个人信息',res)
                        this.nickname = res.data.username
                        this.signature = res.data.signature
            });
        },
}
</script>

<style lang="scss" scoped>
.el-tabs.el-tabs--top {
  width: 111vh !important;
}
.el-tabs__active-bar is-top{
  width: 845px!important;
}
.el-tab-pane{
	background-color: #ffffff;
}
.nickname{
	font-size: 20px;
	line-height: 20px;
	color: #000000;
    margin-left: 24px;
    margin-top: 50px;
}
.signature{
	font-size: 14px;
	line-height: 14px;
	color: #84878d;
        margin-left: 24px;
    margin-top: 24px;
}
.wrap-box{
    width: 100%;
 
}
.content{
    width: 100%;  
    background-color: rgba(250,250,250);
}
.bg{
    width: 55%;
	height: 165px;
    margin-left: 22%;
    background-image: url("../../assets/background_user.png");
}
.userphoto{
margin-left: 32px;
width: 100px;
height: 100px;
border-radius: 50%;
margin-top: 32px;
}
.Person-nav{
margin-left: 22%;
}
</style>
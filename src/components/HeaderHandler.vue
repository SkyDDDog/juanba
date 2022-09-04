<template>
  <div class="nav">
    <div class="d-flex">
      <div class="padding-left"></div>
      <div class="align-items-center logo d-flex">
        <img  @click="handleReturnHome()" class="mx-3 cursor-point" src="../assets/logo.png" />
        <div @click="handleReturnHome()" class="font-logo cursor-point" >卷吧</div>
        <div class="shu"></div>
      </div>
      <div class="align-items-center" v-if="isLogin">
        <span v-for="item in fixedList" :key="item.lable" >
          <router-link :to="{ name: item.routerLink }">
            <template>
              <a class="a-style2 cursor-point" @click="changeFixed(item.lable)"> {{ item.lable }}</a>
            </template>
          <div class="line" v-if="item.lable == this_fixed"></div>
          </router-link>
        </span>
      </div>
      <div class="align-items-center" v-else>
        <span v-for="item in fixedList" :key="item.lable" >
            <template>
              <a class="a-style2 cursor-point" @click="changeFixed2()"> {{ item.lable }}</a>
               <div class="line" v-if="item.lable == this_fixed"></div>
            </template>
        </span>
      </div>
      <div class="flex-sm-grow-1"></div>
      <div class="align-items-center font" v-if="isLogin">
        <span v-for="item in headerList" :key="item.lable" >
          <router-link :to="{ name: item.routerLink }" >
            <template>
              <a class="a-style1 cursor-point"> {{ item.lable }}</a>
            </template>
          </router-link>
        </span>
      </div>
       <div class="align-items-center font" v-else>
        <span v-for="item in headerListLogin" :key="item.lable" >
          <router-link :to="{ name: item.routerLink }">
          <template>
              <a class="register cursor-point" v-if="item.lable == '注册'"> {{ item.lable }}</a>
              <a class="login cursor-point" v-if="item.lable == '登录'"> {{ item.lable }}</a>
            </template>
          </router-link>
        </span>
      </div>
      <div class="width-half"></div>
      <div class="align-items-center header-icon" v-if="isLogin">
        <img
          class="mx-1 cursor-point"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F17%2F20190517211730_kurtr.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652281535&t=d2d288f89f783b3f1adccd25a791b88b"
          @click="handlePerson()"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isLogin:false,
        this_fixed:'',
        fixedList:[
          {lable:"讨论区",routerLink:"HomeView"},
          {lable:"资料库",routerLink:"AllData"},
          {lable:"学习工具",routerLink:"LearningTools"},
        ],
        headerList: [
          { lable: "管理中心", routerLink: "Manager" },
          { lable: "消息通知", routerLink: "Message" },
          { lable: "退出", routerLink: "SignOut" },
        ],
        headerListLogin: [
          { lable: "登录", routerLink: "Login"},
          { lable: "注册", routerLink: "Register" },
        ],
      }
    },
    created(){
     let type= window.localStorage.getItem("type",this.this_fixed)
      this.this_fixed = type;
      let isLoginStatus = window.localStorage.getItem("userid")
    if (isLoginStatus) {
      this.isLogin = true
    }
    },
    methods:{
      changeFixed2(){
        alert('登录后查看')
      },
      handleReturnHome(){
        this.$router.push(
                            {
                                name:'HomeView',
                            }
                            )
        
        this.this_fixed= '讨论区'
        window.localStorage.setItem("type",this.this_fixed);
      },
      changeFixed(type){
        this.this_fixed= type
        window.localStorage.setItem("type",this.this_fixed);
        console.log(this.this_fixed)
      },
      handlePerson(){
           this.userId = window.localStorage.getItem("userid")
                if(this.userId === null)
                {
                    alert('请登录后再查看个人主页')
                }
                else{
                          this.$router.push(
                            {
                                name:'Person',
                            }
                            )
                  
                  this.this_fixed= ""
                  window.localStorage.setItem("type",this.this_fixed);
                }
       
      }
    },
  }
</script>

<style lang="scss" scoped>
.line{
  margin-left: 14px;
  width: 60px;
	height: 5px;
	background-color: #ffc92e;
}
 @font-face {
  /* 我自己命名为 mFont */
 font-family: "mFont";  
src: url("../styles/FZ-PCL-Font-Bold.ttf") format("truetype");
}
.font-logo{
  font-family: mFont;
  color: #3656c6;
  font-size: 20px;
}
.shu{
  width: 1px;
	height: 32px;
	background-color: #dbdde0;
  margin-left: 40px;
}
.logo{
  width: 172px;
	height: 80px;
  line-height: 80px;
}
.nav{
  width: 100%;
  height: 80px;
  min-width: 800px;
    .header-icon {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .width-half {
    width: 50px;
  }
}
.font{
  	font-size: 14px;
}
.a-style2 {
    display: inline-block;
    color: #444444;
   	font-family: PingFang SC;
    font-size: 16px;
    height: 80px;
    line-height: 80px;
    padding: 0 16px;
}
.a-style1 {
    display: inline-block;
    color: #444444;
    font-family: PingFang SC;
    font-size: 14px;
    height: 80px;
    line-height: 80px;
    padding: 0 16px;
}
.register{
  display: inline-block;
  width: 32px;
	height: 36px;
  line-height: 36px;
	background-color: #3656c6;
	border-radius: 8px;
  margin-left: 32px;
  font-size: 16px;
  justify-items: center;
  color: #ffffff;
  padding:0 20px;
}
.login{
  display: inline-block;
  color: #192c89;
   font-size: 16px;
  width: 32px;
	height: 36px;
    line-height: 36px;
	background-color: #ffffff;
	border-radius: 8px;
	border: solid 1px #3656c6;
    padding:0 20px;
}
</style>
<template>
    <div class="register">
      <div class="nav d-flex align-items-center">
      <img class="logo" src="../../assets/logo.png" alt="">
      <div class="con">卷吧</div>
      </div>
      <div class="box d-flex">
      <img class="big_logo" src="../../assets/illustration_signup.png" alt="">
      <div class="input">
        <div class="small_nav d-flex">
        <div class="re cursor-point" @click="goRegister()">注册</div>
        <div class="lo cursor-point">登录</div>
        </div>
        <div class="line"></div>
        <div class="icon"></div>
        <input
        class="email"
        type="text"
        placeholder="请输入你的邮箱"
        @blur="getUserEmail"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='请输入你的邮箱'"
      />
      <input
        class="password"
        type="text"
        placeholder="请输入你的密码"
        @blur="getUserCode"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='请输入你的密码'"
      />
      <button class="confirm" @click="login()">确定</button>
      <div class="forgetPassword" @click="forgetPassword()">忘记密码</div>
      </div>
      </div>
    </div>
</template>

<script>
import { Login,} from "../../api/api";
    export default {
        data(){
            return{
               email:"",
               captchaUrl:"",
               code:"",
               token:''
            }
        },
        methods:{
            getUserEmail(event) {
            this.email = event.target.value;
            console.log(this.email);
           },
            getUserCode(event) {
            this.code = event.target.value;
            console.log(this.code);
           },
           goRegister()
           {
                this.$router.push(
                    {
                        name:'Register',
                    }
                    )
           },
           forgetPassword(){
               this.$router.push(
                    {
                        name:'SetPassword',
                    }
                    )
           },
           login(){
        //带参数的post请求

            // let url = "http://47.110.49.117:9091/user/login"
            // let data = {
            //     username: this.email,
            //     password:this.code,
            //     userId:'',
            // }

            // this.$axios.post(url, data)
            // .then((res) => {
            //     console.log('登录',res) //返回的数据,
            //     this.token= res.data.jwtToken
            //     this.userId = res.data.data.id;
            //     console.log('token', this.token)
            //      if(res.data.code === '200')
            //         {
            //             console.log('登陆成功', '1')
            //         window.localStorage.setItem("username",this.email)
            //         window.localStorage.setItem("userid", this.userId)
            //         window.localStorage.setItem("token",'Bearer ' +this.token)
            //         this.$router.push({
            //             path: "/",
            //         })
            //         }
            //         else{
            //         window.alert('账号或密码错误，请重新登录');
            //         }

            // })
            // .catch((err) => {
            //     console.log(err) //错误信息
            // }),
            let dataRequest2 = {
                username: this.email,
                password:this.code,
            }

               Login(dataRequest2).then((res=>{
                                            console.log('我是注册接口返回的数据', res)
                                            if(res.code==='200'){
                                              window.localStorage.setItem("username",this.email)
                                            window.localStorage.setItem("userid", res.data.userId)
                                             window.localStorage.setItem("authority", res.data.authority)
                                                    this.this_fixed= '讨论区'
                                                    window.localStorage.setItem("type",this.this_fixed);
                                                  console.log('登陆成功', '1')
                                                    this.$router.push(
                                                {
                                                    path: "/",
                                                }
                                                )
                                            }
                                            else{
                                                alert('账号或密码错误，请重新登录')
                                            }
                                        }))
                                        
                                    }
           
        },
       
    }
</script>

<style lang="scss" scoped>
.forgetPassword{
    margin-top: 10%;
    margin-left: 10%;
    width: 20%;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #5875d1;
}
.password{
    margin-left: 10%;
    width: 80%;
    margin-top: 10%;
	height: 8%;
	border-radius: 4px;
		border: solid 1px #bfcbd9;
    cursor: pointer;
    outline: none;
}
.confirm{
    width: 80%;
	height: 8%;
    margin-top: 7%;
	background-color: #3656c6;
	border-radius: 4px;
    margin-left: 10%;
    border: none;
  cursor: pointer;
  color: #ffffff;
}
.verification{
    margin-top: 7%;
    margin-left: 10%;
    width: 80%;
    height: 8%;
}
.verifi_input{
    width: 80%;
	border-radius: 4px;
		border: solid 1px #bfcbd9;
    cursor: pointer;
    outline: none;
}
.password_input{
    margin-top: 7%;
    margin-left: 10%;
      width: 80%;
	border-radius: 4px;
		border: solid 1px #bfcbd9;
        height: 8%;
    cursor: pointer;
    outline: none;
}
.password_input2{
    margin-top: 7%;
    margin-left: 10%;
      width: 80%;
	border-radius: 4px;
		border: solid 1px #bfcbd9;
        height: 8%;
    cursor: pointer;
    outline: none;
}
.ver{
    width: 22%;
	background-color: #e6ecf9;
	border-radius: 0px 4px 4px 0px;
	border: solid 1px #bfcbd9;
    	font-size: 14px;
        color: #3656c6;
     border: none;
  cursor: pointer;
}
.code_img >img{
    margin-left: 15px;
    width: 90%;
    height: 100%;
}
input::placeholder {
  padding-left: 4%;
}
.email{
    margin-left: 10%;
    width: 80%;
    margin-top: 7%;
	height: 8%;
	border-radius: 4px;
		border: solid 1px #bfcbd9;
    cursor: pointer;
    outline: none;
}
.icon{
    width: 18%;
	height: 4px;
	background-image: linear-gradient(
		#364cc6, 
		#364cc6), 
	linear-gradient(
		#bfcbd9, 
		#bfcbd9);
	background-blend-mode: normal, 
		normal;
        margin-top: -4px;
        margin-left: 63%;
}
.line{
    margin-top: 4%;
     margin-left: 20%;
    width: 60%;
	height: 1px;
background: #bfcbd9;
}
.small_nav{
    height: 13%;
}
.small_nav >div{
    margin-top: 7%;
	font-size: 18px;
	color: #000000;
}
.re{
      margin-left: 23%;
}
.lo{
    margin-left: 32%;
}
.register{
    width: 100%;
    height: 100%;
}
@font-face {
  /* 我自己命名为 mFont */
 font-family: "mFont";  
src: url("../../styles/FZ-PCL-Font-Bold.ttf") format("truetype");
}
.nav{
    width: 100%;
	height: 10%;
	background-color: rgba(242, 243, 255, 0.65);
	box-shadow: 0px 2px 4px 0px 
		rgba(209, 211, 218, 0.22);
        text-align: center;
}
.logo{
    width: 51px;
	height: 56px;
    margin-left: 48%;
}
.con{
	font-family: mFont;
	font-size: 24px;
	font-weight: bold;
	font-stretch: normal;
	letter-spacing: 2px;
	color: #3656c6;
    margin-left: 10px;
}
.box{
    width: 100%;
    height: 90%;
}
.big_logo{
    width: 26.5%;
    height: 55%;
    margin-left: 24%;
    margin-top: 10%;
}
.input{
    width: 21%;
	height: 70%;
	border-radius: 4px;
	border: solid 1px #364cc6;
    margin-top: 7.5%;
    margin-left: 7%;
}
</style>
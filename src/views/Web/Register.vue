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
        <div class="re">注册</div>
        <div class="lo cursor-point" @click="goLogin()">登录</div>
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
            class="password_input"
            type="text"
            placeholder="请设置你的密码"
            @blur="getUserpassword"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请设置你的密码'"
        />
          <input
            class="password_input2"
            type="text"
            placeholder="请再次确认你的密码"
            @blur="getUserpassword2"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请再次确认你的密码'"
        />
      <div class="verification d-flex">
          <input
            class="verifi_input"
            type="text"
            placeholder="请输入右侧验证码"
            @blur="getUserCode"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入右侧验证码'"
        />
          <button class="ver" @click="verCode()">验证</button>
          <div class="code_img" @click="changeCode()"><img :src="this.captchaUrl" alt=""></div>
      </div>
        <input
        v-if="right===0"
        class="email"
        type="text"
        disabled="disabled"
        placeholder="验证通过后将发送安全验证码至邮箱"
        @blur="getUserEmailCode"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='请输入安全验证码'"
      />
        <input
        v-else
        class="email"
        type="text"
        placeholder="请输入安全验证码"
        @blur="getUserEmailCode"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='请输入安全验证码'"
      />
      <button class="confirm" @click="VerMail()">确定</button>
      </div>
      </div>
    </div>
</template>

<script>
import { getCode ,VerCode,SendEmail,Register,Vermail} from "../../api/api";
    export default {
        data(){
            return{
               email:"",
               captchaUrl:"",
               code:"",
               right:0,
               pass:'',
               pass2:'',
               mailCode:'',
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
           getUserpassword(event){
               this.pass = event.target.value;
               console.log(this.pass)
           },
           getUserpassword2(event){
               this.pass2 = event.target.value;
               console.log(this.pass2)
           },
           getUserEmailCode(event){
                this.mailCode = event.target.value;
               console.log(this.mailCode)
           },
           changeCode(){
                 let dataRequest ={
               key : this.email +'juanba'
            }
                getCode(dataRequest).then(res => {
                // btoa 创建一个 base-64 编码的字符串
                // Uint8Array 创建8位无符号整型数组
                // fromCharCode 将 Unicode 编码转为一个字符
                const img = btoa(
                    new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
                )
                this.captchaUrl = 'data:image/png;base64,' + img
                console.log(this.captchaUrl)
            })
           },
           verCode(){
               let dataRequest1 = {
                   code:this.code,
                   key:this.email+'juanba'
               }

               VerCode(dataRequest1).then((response)=>{
                        if(this.pass === this.pass2)
                        {
                            console.log('我是返回的数据',response);
                            if(response.code === '200')
                            {
                                let dataRequest1 = {
                                    email:this.email
                                }
                                SendEmail(dataRequest1).then((res=>{
                                    console.log('我是返回的数据1',res);
                                })),
                                this.right=1;
                            }
                        }
                        else{
                            alert('前后输入密码不一致');
                        }
                        
                    })
           },
              goLogin()
           {
                this.$router.push(
                    {
                        name:'Login',
                    }
                    )
           },
           VerMail(){
                let dataRequest1 = {
                                    email:this.email,
                                    VerCode:this.mailCode
                                }
                               Vermail(dataRequest1).then((res=>{
                                    console.log('我是返回的数据1',res);
                                    if(res.code === '200')
                                    {
                                        let dataRequest2 = {
                                            email:this.email,
                                            password:this.pass,
                                        }
                                        Register(dataRequest2).then((res=>{
                                            console.log('我是注册接口返回的数据', res)
                                            if(res.code==='200'){
                                                    this.$router.push(
                                                {
                                                    name:'Login',
                                                }
                                                )
                                            }
                                            else{
                                                alert('该账户已经被注册')
                                            }
                                        }))
                                        
                                    }
                                    else{
                                        alert('安全验证码输入错误')
                                    }
                                }))
           }
           
        },
       created() {
            let dataRequest ={
               key : this.email +'juanba'
            }
        getCode(dataRequest).then(res => {
            // btoa 创建一个 base-64 编码的字符串
            // Uint8Array 创建8位无符号整型数组
            // fromCharCode 将 Unicode 编码转为一个字符
            const img = btoa(
                new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            this.captchaUrl = 'data:image/png;base64,' + img
            console.log(this.captchaUrl)
        })
        
      },
    }
</script>

<style lang="scss" scoped>
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
        margin-left: 20%;
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
<template>
    <div class="content">
    <div class="username d-flex">
    <div class="username1">用户名：</div>
    <input
                class="username2"
                type="text"
                placeholder="请填写你的昵称"
                v-model="nickname"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的昵称'"
    />
    </div>
    <div class="signature d-flex">
    <div class="signature1">签名：</div>
    <input
                class="signature2"
                type="text"
                placeholder="请填写你的个性签名"
                v-model="signature"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的个性签名'"
    />
    </div>
     <div class="sex1 d-flex">
          <div class="sex">性别:</div>
           <template>
            <el-radio-group v-model="radio" class="sextype">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
            </el-radio-group>
           </template>
         </div>
    <div class="school d-flex">
    <div class="school1">学校：</div>
    <input
                class="school2"
                type="text"
                placeholder="请填写你的学校信息"
                v-model="school"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的学校信息'"
    />
    </div>
    <div class="collegue d-flex">
    <div class="collegue1">学院：</div>
    <input
                class="collegue2"
                type="text"
                placeholder="请填写你的学院信息"
                v-model="collegue"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的学院信息'"
    />
    </div>
    <div class="major d-flex">
    <div class="major1">专业：</div>
    <input
                class="major2"
                type="text"
                placeholder="请填写你的专业"
                v-model="major"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的专业'"
    />
    </div>
    <div class="grade d-flex">
    <div class="grade1">年级：</div>
    <input
                class="grade2"
                type="text"
                placeholder="请填写你的年级"
                v-model="grade"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='请填写你的年级'"
    />
    <button class="grade3">级</button>
    </div>
    <div class="email d-flex">
     <div class="email1">邮箱：</div>
     <div class="email2">{{email}}</div>
    </div>
    <div class="changeEmail cursor-point" @click="changeEmails()">
    更换邮箱
    </div>
     <div class="changePassword cursor-point" @click="changePasswords()">重置密码</div>
    <button class="store cursor-point" @click="Stores()">保存</button>
    </div>
</template>

<script>
import { getMessage,upMessage } from "../api/api";
    export default {
        data(){
            return{
                nickname:"",
                signature:"",
                radio: 1,
                school:"",
                collegue:"",
                major:"",
                grade:2,
                email:"",
                nickname:""
            }
        },
        created(){
           this.userId = window.localStorage.getItem("userid");
                this.email = window.localStorage.getItem("username");
            let  dataRequest ={
                userId:this.userId,
            };
            getMessage(dataRequest).then((res) => {
                console.log('获取个人信息',res)
                        // this.nickname = res.data.username
                        if(res.data.username === '暂未填写')
                        this.nickname = ""
                        else
                        this.nickname = res.data.username
                        if(res.data.signature === '暂未填写')
                        this.signature =""
                        else
                        this.signature = res.data.signature
                        if(res.data.school === '暂未填写')
                        this.school = ""
                        else
                        this.school = res.data.school
                        if(res.data.academic === '暂未填写')
                        this.collegue = ""
                        else
                        this.collegue = res.data.academic
                        if(res.data.profession === '暂未填写')
                        this.major = ""
                        else
                        this.major = res.data.profession
                        this.email = res.data.email
                        this.grade = res.data.grade
                        if(res.data.gender === '男')
                        this.radio = 0
                        else if(res.data.gender === '女')
                        this.radio = 1
            });
        },
        methods:{
            changeEmails(){
                  this.$router.push(
                    {
                        path: "/changeEmail",
                        }
                     )
            },
            changePasswords(){
                    this.$router.push(
                    {
                        path: "/setPassword",
                        }
                     )
            
            },
            Stores(){
                this.userId = window.localStorage.getItem("userid");
                this.email = window.localStorage.getItem("username");
                let  dataRequest ={
                        userId:this.userId,
                        academic:this.collegue,
                        email:this.email,
                        gender:parseInt(this.radio),
                        profession:this.major,
                        school:this.school,
                        signature:this.signature,
                        grade:parseInt(this.grade),
                        nickname:this.nickname
                };
                upMessage(dataRequest).then((res) => {
                console.log('上传个人信息',res)
                 window.alert('修改成功')
            });
            }
        }
    }
</script>

<style lang="scss" scoped>
.sex1{
       margin-top: 30px;
    margin-left: 54px;
    	font-size: 14px;
	line-height: 14px;
	color: #555555;
}
.sextype{
    margin-left: 28px;
}
.content{
    width: 55%;
    background-color: #FFF;
}
.username ,.signature,.school,.collegue,.major,.grade,.email,.changeEmail,.changePassword,.store{
    margin-left: 54px;
    margin-top: 30px;
}
.username1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 5px;
}
.username2{
    width: 210px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
      outline: none;
}
.signature1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 19px;
}
.signature2{
    width: 210px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
    outline: none;
}
.school1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 19px;
}
.school2{
    width: 210px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
    outline: none;
}
.collegue1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 19px;
}
.collegue2{
    width: 210px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
    outline: none;
}
.major1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 19px;
}
.major2{
    width: 210px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
    outline: none;
}
.grade1{
    margin-top: 14px;
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	color: #555555;
    margin-right: 19px;
}
.grade2{
    width: 50px;
	height: 40px;
	border-radius: 8px;
	border: solid 1px #364cc6;
    border: none;
    cursor: pointer;
    outline: none;
}
.grade3{
    width: 38px;
	height: 40px;
	border-radius: 0px 8px 8px 0px;
	border: solid 1px #bfcbd9;
       border: none;
    cursor: pointer;
    outline: none;
}
.changeEmail,.changePassword{
    	color: #3656c6;
}
.store{
    	width: 92px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
      border: none;
    cursor: pointer;
    outline: none;
    color: #ffffff;
}
</style>
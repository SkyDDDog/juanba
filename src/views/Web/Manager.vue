<template>
    <div class="box">
    <div class="header">
    <HeaderHandler/>
    </div>
    <div class="content d-flex">
    <div class="left">
        <div class="title">
        管理中心
        </div>
        <!-- 第一种 -->
        <div class="jubao d-flex cursor-point" v-if="now === true || now === ''">
        <img class="tu1" src="../../assets/icon_alert_on.png" alt="">
        <div class="wenzi">
        处理举报
        </div>
        </div>
        <div class="jubao1 d-flex cursor-point" v-if="now === false" @click="change()">
        <img class="tu2" src="../../assets/icon_alert_off.png" alt="">
        <div class="wenzi2">
        处理举报
        </div>
        </div>
        <!-- 第二种 -->
        <div class="user d-flex cursor-point" v-if="now === true || now === ''" @click="change1()">
        <img class="tu3" src="../../assets/icon_users-x_off.png" alt="">
        <div class="wenzi2">
        封禁用户
        </div>
        </div>
        <div class="user1 d-flex cursor-point" v-if="now === false">
        <img class="tu4" src="../../assets/icon_users-x_on.png" alt="">
        <div class="wenzi">
        封禁用户
        </div>
        </div>
    </div>
    <div class="right" v-if="now === true || now === ''" >
      <div class="nav2 d-flex align-items-center">
      <div class="category">类别</div>
      <div class="touser">被举报用户</div>
      <div class="tocontent">举报内容</div>
      <div class="toreason">举报理由</div>
      <div class="tohandle">操作</div>
      </div>
      <div>
         <div
            v-for="(item,index) in dataList"
            :key="index"
            class="tiao d-flex"
        >
        <div class="sort">{{item.sort}}</div>
        <div class="name">{{item.reporterName}}</div>
        <div class="content1 pcur">{{item.content}}</div>
        <div class="reason11">{{item.reason}}</div>
        <button class="delete pcur" @click="handleReport(item.reportId)">删除</button>
        <button class="nodelete pcur" @click="handleReport2(item.reportId)">保留</button>
        </div>
    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
	  @current-change="changePage"
    class="fenye"
    >
    </el-pagination>
      </div>
    </div>
      <div class="right" v-else>
      <div class="nav2 d-flex align-items-center">
      <div class="username">用户名</div>
      <div class="time">本月违规次数</div>
      <div class="ban-user">操作</div>
      </div>
      <div>
         <div
            v-for="(item,index) in userList"
            :key="index"
            class="tiao d-flex"
        >
        <div class="username1">{{item.userName}}</div>
        <div class="num">{{item.violationNum}}</div>
        <button class="ban cursor-point" @click="banUser(item.userId)" v-if="item.status === '正常'">封禁</button>
        <button class="ban2 cursor-point" @click="unbanUser(item.userId)" v-if="item.status === '已封禁'">已封禁</button>
        </div>
      </div>
       <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total2"
	  @current-change="changePage2"
    class="fenye"
    >
    </el-pagination>
    </div>
    
    </div>
      
    </div>
</template>

<script>
import { getList,banUser,userList,dealReport,unbanUser} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
    export default {
        inject: ['reload'],
        name: "Manager",
        components: {
            HeaderHandler,
        }, 
        data(){
            return{
                now:'',
                dataList:[],
                userList:[],
                total:0,
                total2:0,
            }
        },
        created(){
            this.this_fixed= ""
        window.localStorage.setItem("type",this.this_fixed);
            let dataRequest = {
                pageNum:1,
                pageSize:10,
              }
              getList(dataRequest).then((response) => {
                console.log('我是getList返回数据',response);
                this.dataList = response.data;
                this.total = parseInt(response.total);
                });
                 userList(dataRequest).then((response) => {
                console.log('我是userList返回数据',response);
                this.userList = response.data;
                this.total2 = parseInt(response.total);
                });
        },
        methods:{
            	changePage(e){
		let dataRequest = {
		  pageNum: e,
		  pageSize: 10,
		};
		      getList(dataRequest).then((response) => {
                console.log('我是getList返回数据',response);
                this.dataList = response.data;
                this.total = parseInt(response.total);
                });
	},
              	changePage2(e){
		let dataRequest = {
		  pageNum: e,
		  pageSize: 10,
		};
		          userList(dataRequest).then((response) => {
                console.log('我是userList返回数据',response);
                this.userList = response.data;
                this.total2 = parseInt(response.total);
                });
	},
            change(){
               window.localStorage.setItem("now", true);
                this.now = window.localStorage.getItem("now");
                this.now = true
            },
            change1(){
                window.localStorage.setItem("now", false);
                this.now = window.localStorage.getItem("now");
                this.now = false
            },
            handleReport(id){
                var confirm2 = window.confirm("是否确认删除该信息")
                if(confirm2){
                    let dataRequest = {
                        reportId:id,
                        result:1,
                    }
                    dealReport(dataRequest).then((response) => {
                    console.log('我是dealReport返回数据',response);
                    });
                    window.alert('您已成功删除该举报记录')
                    this.reload(); 
                }
                
            },
            handleReport2(id){
                   var confirm1 = window.confirm("是否确认保留该举报信息")
                   if(confirm1){
                                let dataRequest = {
                            reportId:id,
                            result:2,
                        }
                        dealReport(dataRequest).then((response) => {
                        console.log('我是dealReport返回数据',response);
                        });
                        window.alert('您已成功保留该举报记录')
                        this.reload();
                   }
                
            },
            banUser(id){
                   var confirm1 = window.confirm("是否确认封禁该用户")
                   if(confirm1){
                                let dataRequest = {
                            userId:id,
                        }
                        banUser(dataRequest).then((response) => {
                        console.log('我是banUser返回数据-封禁用户',response);
                        window.alert(response.msg)
                        });
                        this.reload();
                         this.now = false
                   }
            },
             unbanUser(id){
                   var confirm1 = window.confirm("是否确认解封该用户")
                   if(confirm1){
                                let dataRequest = {
                            userId:id,
                        }
                        unbanUser(dataRequest).then((response) => {
                        console.log('我是unbanUser返回数据-解封用户',response);
                        window.alert(response.msg)
                        });
                        this.reload();
                         this.now = false
                   }
            },
        }
    }
</script>

<style lang="scss" scoped>
.fenye{
    position: absolute;
    top: 730px;
    left: 1250px;
}
.tiao:hover{
    background-color: #edf1f9;
    height: 24px;
    line-height: 24px;
}
.username1{
    width: 48%;
    margin-left: 3%;
}
.ban{
    margin-left: 40%;
    height: 25px;
	border-radius: 8px;
	border: solid 1px #dc0d0d;
    background-color: #fff;
    	color: #dc0d0d;
}
.ban2{
    margin-left: 39.5%;
    height: 25px;
	background-color: #f8edee;
	border-radius: 8px;
	border: solid 1px #f0dddd;
    	color: #dc0d0d;
}
.ban-user{
color: #222222;
margin-left: 34%;
}
.time{
color: #222222;
margin-left: 43%;
}
.username{
	margin-left: 3%;
	color: #222222;
}
.nodelete{
	background-color: #FFF;
	border-radius: 8px;
	border: solid 1px #2f80cb;
    color: #2f80cb;
    margin-left: 2%;
    height: 26px;
}
.delete{
    height: 26px;
    background-color: #FFF;
	border-radius: 8px;
	border: solid 1px #dc0d0d;
    	color: #dc0d0d;
}
.reason11{
    margin-left: 3%;
    width: 19%;
}
.tiao{
        height: 24px;
    line-height: 24px;
    padding-top: 15px;
     padding-bottom: 15px;
}
.category{
    margin-left: 3%;
}
.sort{
    width: 6%;
    margin-left: 3%;
}
.touser{
    margin-left: 6%;
}
.name{
    width: 10%;
    margin-left: 3%;
}
.content1{
    width: 42%;
    margin-left: 3%;
      overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tocontent{
    margin-left: 6.8%;
}
.reason{
    margin-left: 3%;
    width: 9%;
}
.toreason{
    margin-left: 39.5%;
}
.tohandle{
    margin-left: 16%;
}
.nav2 > div{
   height: 14px;
	font-family: Inter-SemiBold;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #222222;
    -align: center;
}
.nav2{
    height: 6%;
    border: solid 1px #ecedee;
}
.right{
    width: 62%;
    background-color: #fff;
    height: 87%;
    margin-left: 1%;
}
.box{
    width: 100%;
    height: 100%;
}
.header{
    width: 100%;
}
.content{
    height: 90.5%;
    width: 100%;
    background-color: #FAFAFA;
    padding-top: 2%;
}
.left{
width: 11%;
margin-left: 13%;
background-color: #fff;
height: 87%;
}
.title{
	height: 14px;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0px;
	color: #222222;
    padding-top: 24px;
    margin-left: 24px;
}
.jubao,.user1{
    width: 140px;
	height: 40px;
	background-color: #ecf0f9;
	border-radius: 8px;
     margin-left: 24px;
     margin-top: 20px;
}
.tu1,.tu2,.tu3,.tu4{
    width: 21px;
	height: 20px;
    margin-left: 12px;
    margin-top: 10px;
}
.wenzi{
    height: 40px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
	color: #2b47b2;
    margin-left: 5px;
}
.wenzi2{
     height: 40px;
	font-family: Inter;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	letter-spacing: 0px;
    color: #2c2c2c;
    margin-left: 5px;
}
.user,.jubao1{
     width: 140px;
	height: 40px;
	background-color: #FFFFFF;
	border-radius: 8px;
     margin-left: 24px;
     margin-top: 20px;
}
</style>
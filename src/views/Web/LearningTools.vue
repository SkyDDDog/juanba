<template>
    <div class="wrap-box"> 
      <div class="nav-box">
      <HeaderHandler/>
      </div>
      <div class="content">
       <div class="todo-title">
      待办事项
      </div>
      <div class="d-flex">
       <div class="todo-list"> 
      <div class="small-title">
      未完成
      </div>
      <div class="addTodo d-flex" @click="exitTodo()">
      <img class="cursor-point" src="../../assets/icon_plus.png" alt="">
        <div class="add cursor-point">添加事项</div>
      </div>
          <div
            v-for="item in todoList"
            :key="item.id"
            class="shop-box d-flex"
        >
        <div class="circle cursor-point" @click="finish(item.id)"></div>
        <div class="content1 cursor-point">{{item.content}}</div>
        <div class="modify cursor-point" @click="modify(item.id)">修改</div>
        <div class="delete cursor-point" @click="deleteTodo(item.id)">删除</div>
        </div>
      </div>
      <div class="todo-list-finish">
       <div class="small-title2">
       已完成
      </div>
          <div
            v-for="item2 in todoLists"
            :key="item2.id"
            class="shop-box2 d-flex"
        >
        <div><img class="circle2 cursor-point" src="../../assets/icon_finish.png" alt=""></div>
        <div class="content2 cursor-point">{{item2.content}}</div>
        </div>
      </div>
      </div>
     <div class="concentrate">
     专注
     </div>
     <div class="getfocus2">
     <div class="small-nav2 d-flex">
     <div class="rank">
          专注时长排行榜
     </div>
    <div class="rank-img"><img src="../../assets/icon_concentrationtime.png" alt=""></div>
    <div class="week1 cursor-point" @click="changeType1()" v-if="onit === '本周内'">
    本周内
    </div>
     <div class="week cursor-point" @click="changeType1()" v-else>
    本周内
    </div>
    <div class="month1 cursor-point" @click="changeType()" v-if="onit === '本月内'">
    本月内
    </div>
     <div class="month cursor-point" @click="changeType()" v-else>
    本月内
    </div>
     </div>
     <div class="focus2">
       <div
            v-for="item in todoLists2"
            :key="item.id"
            class="shop-box1 d-flex"
        >
        <div class="todo-rank">
          <div class="todo-rank1">{{item.rank}}</div>
        </div>
      <div class="todo-content">{{item.content}}</div>
      <div class="todo-time">{{item.time}}分钟</div>     
      </div>
     </div>
     </div>
     
     <div class="concer d-flex" v-if="conke === false">
     <div class="con2 cursor-point" @click="concertrate_start()">
          开启你的专注
     </div>  
     <img class="icon_8" src="../../assets/icon_timer.png" alt="">
     </div>
      <div class="con3" v-else>
      <div class="con4">已专注 {{time}} 分钟···</div>
      <button class="closebutton" @click="concertrateClose()">结束专注</button>
      </div>
      </div>
      <div class="chose" v-if="isShow === true">
      <div class="cancle" @click="cancleChoose()"><img class="cancle-img" src="../../assets/icon_quit.png" alt=""></div>
      <div class="title1">请选择你要专注的事项</div>
      <div class="contne">
        <div
            v-for="item in todoList"
            :key="item.id"
            class="shop-box1 d-flex"
        >
        <div @click="choose(item.id)"><img class="kuan cursor-point" src="../../assets/icon_checkdefault.png" alt=""></div>
        <div v-if="item.id === todoId">
        <div @click="choose(item.id)"><img class="kuan1 cursor-point" src="../../assets/icon_checkactive.png" alt=""></div>
        </div>
        <div class="todo00 cursor-point" @click="choose(item.id)">{{item.content}}</div>
        </div>
      </div>
        <button class="start" @click="concertrate()">开启专注</button>
      </div>
      <div class="addTodo2" v-if="isShow2 === true">
      <div class="cancle1" @click="cancle1Choose()"><img class="cancle-img cursor-point" src="../../assets/icon_quit.png" alt=""></div>
      <div class="addingtodo">添加你的待办事项</div>
      <div class="addingtodo2">通过记录、专注，提高你的效率</div>
        <input
        class="addingtodo3"
        type="text"
        placeholder="接下来要做的是..."
        @blur="addTodo4"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='接下来要做的是...'"
      />
      <button class="addButton" @click="addBUtton()">添加至清单</button>
      </div>
   </div>
</template>

<script>
var timer = null
import {
modifytodo,
 getTodoList,FinishedTodo,DeleteTodo,closeFocus,getFocus,addTodo
} from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
    export default {
      inject: ['reload'],
          name: "LearningTools",
            components: {
                HeaderHandler,
            },
            data(){
              return{
                todoList:[],
                todoLists:[],
                content:'',
                time:0,
                conke:false,
                todoId:"",
                isShow:false,
                todoLists2:[],
                isShow2:false,
                todos:"",
                onit:'本周内'
              }
            },
            created() {
            this.userId = window.localStorage.getItem("userid")
            let requestData = {
                userId:this.userId,
                sort:0
            };
            
            // provide reject
            getTodoList(requestData).then((response) => {
            console.log('我是todo返回数据',response);
            this.todoList = response.data;
            });
              let requestData1 = {
                userId:this.userId,
                sort:1
            };
            // provide reject
            getTodoList(requestData1).then((response) => {
            console.log('我是todo返回数据2',response);
            this.todoLists = response.data;
            });
            let dataRequest2 = {
              sort:1,
              userId:this.userId,
            }
            getFocus(dataRequest2).then((response) => {
            console.log('我是getFocus返回数据',response);
            this.todoLists2 = response.data;
            });
          },
          methods:{
            changeType(){
              this.onit = '本月内'
              this.userId = window.localStorage.getItem("userid")
                let dataRequest2 = {
              sort:2,
              userId:this.userId,
            }
            getFocus(dataRequest2).then((response) => {
            console.log('我是getFocus返回数据',response);
            this.todoLists2 = response.data;
            });
            },
              changeType1(){
                this.onit = '本周内'
              this.userId = window.localStorage.getItem("userid")
                let dataRequest2 = {
              sort:1,
              userId:this.userId,
            }
            getFocus(dataRequest2).then((response) => {
            console.log('我是getFocus返回数据',response);
            this.todoLists2 = response.data;
            });
            },
            cancle1Choose(){
              this.isShow2 = false
            },
            exitTodo(){
              this.isShow2 = true
            },
            addBUtton(){
              this.userId = window.localStorage.getItem("userid")
                let dataRequest = {
                userId:this.userId,
                content:this.todos,
              }
              addTodo(dataRequest).then((response) => {
                console.log('我是addTodo返回数据',response);
                this.todoLists = response.data;
                window.alert("添加成功")
                this.reload();
                }); 
            },
            addTodo4(event){
              this.todos = event.target.value;
              console.log(this.todos);
            },
            concertrate_start(){
              this.isShow = true
            },
            cancleChoose(){
              this.isShow = false
            },
            choose(id){
              window.localStorage.setItem("todoId",id)
              this.todoId = id
            },
            dontchoose(){
              window.localStorage.setItem("todoId",)
            },
            concertrate(){
              this.conke = true
              this.isShow = false
              console.log('tag', this.conke)
              this.time = 0;
              console.log('1', 1)
              timer = setInterval(() => {
                this.time++;
                console.log('时间', this.time)
              }, 1000)
            },
            concertrateClose(){
              clearInterval(timer);
              this.conke = false
              console.log('时间', this.time)
                this.conke = false
                this.todoId=window.localStorage.getItem("todoId")
                let dataRequest = {
                todoId:this.todoId,
                time:this.time,
              }
              closeFocus(dataRequest).then((response) => {
                console.log('我是closeFocus返回数据',response);
                this.todoLists = response.data;
                this.reload();
                }); 
            },
            modify(id){
              this.content = prompt("请输入您修改后的todo名称", ""); 
              console.log(this.content)
              let dataRequest = {
                id:id,
                content:this.content,
              }
              modifytodo(dataRequest).then((response) => {
                console.log('我是modifytodo返回数据',response);
                this.todoLists = response.data;
                this.reload();
                });      
            },
            finish(id){
              let dataRequest = {
                id:id,
              }
              FinishedTodo(dataRequest).then((response) => {
            console.log('我是FinishedTodo返回数据',response);
            this.reload();
            });
            },
             deleteTodo(id){
              let dataRequest = {
                id:id,
              }
              DeleteTodo(dataRequest).then((response) => {
            console.log('我是DeleteTodo返回数据',response);
            });
             this.reload();
            },
    },
    }

</script>

<style lang="scss" scoped>
.todo-content{
  width: 420px;
	height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
  margin-left: 8px;
}
.shop-box1{
  margin-left: 5%;
  padding-top: 12px;
}
.todo-rank1{
  width: 5px;
	height: 10px;
	font-family: Inter-Regular;
	font-size: 10px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 10px;
	letter-spacing: 0px;
	color: #21399d;
  margin-top: 4px;
  margin-left: 4px;
}
.todo-rank{
  	width: 16px;
	height: 16px;
	background-color: #d0daf4;
  border-radius: 50%;
}
.addButton{
  	width: 308px;
	height: 32px;
	background-color: #3656c6;
	border-radius: 8px;
  cursor: pointer;
    outline: none;
    margin-left: 15px;
    margin-top: 13px;
    border: none;
    color: #FFFFFF;
}
.addingtodo3{
  	width: 300px;
	height: 38px;
	background-color: #ffffff;
	box-shadow: 0px 1px 3px 0px 
		rgba(0, 0, 0, 0.08), 
		1px 1px 4px 0px 
		rgba(0, 0, 0, 0.1), 
		0px 1px 3px 0px 
		rgba(0, 0, 0, 0.08), 
		1px 1px 5px 0px 
		rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	border: solid 1px #d1d1d1;
    cursor: pointer;
    outline: none;
    margin-left: 15px;
    margin-top: 13px;
}
.addingtodo2{
  height: 22px;
	font-family: Inter;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: rgba(86, 96, 112, 0.6);
    margin-left: 15px;
    margin-top: 4px;
}
.addingtodo{
  height: 24px;
	font-family: Inter-SemiBold;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #54595e;
  margin-left: 15px;
}
.addTodo2{
  width: 380px;
	height: 200px;
	background-color: #ffffff;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	border: solid 1px #dee2e6;
  position: relative;
  top: -1000px;
  left: 626px;
}
.cancle-img{
 margin-left: 7px;
 margin-top: 7px;
}
.cancle{
  	width: 24px;
	height: 24px;
	background-color: #e5e5e5;
	border-radius: 29px;
  margin-left: 261px;
  margin-top: 3px;
}
.cancle1{
  	width: 24px;
	height: 24px;
	background-color: #e5e5e5;
	border-radius: 29px;
  margin-left: 346px;
  margin-top: 3px;
}
.contne{
   height: 270px;
  overflow: auto;
}
.start{
  width: 86px;
	height: 38px;
	background-color: #3656c6;
	border-radius: 8px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #ffffff;
  margin-left: 190px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.shop-box1{
  margin-top: 10px;
}
.todo00{
  height: 17px;
	font-family: Inter-Medium;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #4f4f4f;
  margin-left: 6px;
}
.title1{
  height: 24px;
	font-family: Inter-SemiBold;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 23px;
	letter-spacing: 0px;
	color: #54595e;
  margin-top: 10px;
  margin-left: 15px;
}
.kuan{
  width: 20px;
	height: 20px;
  margin-left: 15px;
}
.kuan1{
  width: 20px;
	height: 20px;
  margin-left: -20px;
}
.chose{
  position: relative;
  top: -600px;
  width: 300px;
	height: 400px;
  left: 650px;
	background-color: #ffffff;
	box-shadow: 0px 0px 2px 0px 
		rgba(0, 0, 0, 0.12);
	border-radius: 8px;
	border: solid 1px #dee2e6;
}
.closebutton{
  	width: 80px;
	height: 30px;
	background-color: #dcefdf;
	border-radius: 8px;
  color: #83978a;
     border: none;
  cursor: pointer;
  margin-left: 93px;
  margin-top: 44px;
}
.con4{
	height: 16px;
	font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #086644;
    margin-left: 38px;
  padding-top: 80px;
}
.icon_8{
  width: 9px;
	height: 13px;
  display: inline-block;
   margin-left: 8px;
  margin-top: 80px;
}
.con2{
  height: 16px;
	font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #122174;
  margin-left: 38px;
  margin-top: 80px;
}
.concer{
  background-image: url("../../assets/background_startconcentration.png");
  width: 194px;
	height: 186px;
	background-color: #ECF0F9;
 position: relative;
 top: -464px;
 left: 1073px;
}
.con3{
  background-image: url("../../assets/background_OnConcentration.png");
  width: 194px;
	height: 186px;
	background-color: #E8F9EF;
 position: relative;
 top: -464px;
 left: 1073px;
}
.addTodo >img{
  width: 15px;
  height: 15px;
  margin-top: 8px;
  margin-left: 4px;
  margin-right: 4px;
}
.add{
	height: 30px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
	color: #21399d;
}
.addTodo{
  position: relative;
  top: -23px;
  left: 289px;
  width: 90px;
	height: 30px;
	background-color: #e6ecf9;
	border-radius: 8px;
	border: solid 1px #d6dfe9;
}
.week,.month{
  width: 50px;
  height: 14px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #ffffff;
  margin-top: 18px;
}
.week1{
    width: 50px;
 padding-left: 5px;
  height: 18px;
  padding-top: 2px;
	background-color: #ecf0f9;
	border-radius: 8px;
  color: #21399d;
  margin-top: 18px;
}
.month1{
 width: 50px;
 padding-left: 5px;
  height: 18px;
  padding-top: 2px;
	background-color: #ecf0f9;
	border-radius: 8px;
  color: #21399d;
  margin-top: 18px;
}
.week:hover,.month:hover{
  padding-left: 5px;
  height: 18px;
  padding-top: 2px;
	background-color: #ecf0f9;
	border-radius: 8px;
  color: #21399d;
}
.week,.week1{
  margin-left: 42%;
}
.month,.month1{
  margin-left: 3%;
}
.rank-img{
  width: 24px;
	height: 24px;
  margin-top: 16px;
  margin-left: 9px;
}
.rank{
	height: 16px;
	font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 56px;
	letter-spacing: 0px;
	color: #ffffff;
  margin-left: 5%;
}
.small-nav2{
  	width: 33%;
	height: 56px;
	background-color: #3656c6;
	border-radius: 4px 4px 0px 0px;
  margin-left: 28%;
}
.focus2{
   	width: 33%;
	height: 410px;
	background-color: #FFFFFF;
	border-radius: 4px 4px 0px 0px;
  margin-left: 28%;
  overflow: auto;
}
.concentrate{
  margin-left: 28%;
  
      padding-top: 40px;
      padding-bottom: 40px;
	height: 20px;
	font-family: Inter-SemiBold;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #000000;
}
.modify{
 	width: 36px;
	height: 22px;
	font-family: Inter-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: #7f8497;
  	background-color: #f5f5f5;
	border-radius: 20px;
  text-align: center;
  margin-left: 60px;
  margin-top: 3.6%;
}
.delete{
   margin-right: 6%;
   margin-left: 12px;
  width: 36px;
	height: 22px;
	background-color: #ffeeee;
	border-radius: 20px;
	font-family: Inter-Regular;
	font-size: 14px;
    text-align: center;
	font-weight: normal;
	font-stretch: normal;
		line-height: 22px;
	letter-spacing: 0px;
	color: #cf3535;
  margin-top: 3.6%;
}
.content2{
	height: 14px;
	font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #939393;
    margin-left: 3%;
  margin-top: 3.6%;
}
.shop-box2{
     margin-left: 6%;
  margin-top: 4%;
}
.circle2{
  display: inline-block;
  width: 12px;
	height: 12px;
  padding-top: 11px;
}
.small-title2{
	height: 16px;
	font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #40bb8f;
  margin-left: 6%;
  padding-top: 7%;
}
.todo-list-finish{
     overflow: auto;
    width: 16%;
    margin-left: 2%;
    height: 472px;
      background-image: url("../../assets/background _finish.png");
      background-color: #fff;
      background-repeat :no-repeat;
}
.content1{
  width: 50%;
	height: 14px;
	font-family: PingFang SC;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 14px;
	letter-spacing: 0px;
	color: #000000;
  margin-left: 3%;
  margin-top: 3.6%;
}
.circle{
	width: 10px;
	height: 10px;
	border: solid 1px #000000;
  border-radius: 50%;
  margin-left: 6%;
  margin-top: 4%;
}
.small-title{
  	width: 48px;
	height: 16px;
	font-family: Inter-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #5875d1;
  margin-left: 6%;
  padding-top: 7%;
}
.todo-title{
  width: 80px;
	height: 20px;
	font-family: Inter-SemiBold;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 20px;
	letter-spacing: 0px;
	color: #000000;
      margin-left: 28%;
      padding-top: 40px;
      padding-bottom: 40px;
}
.todo-list{
     overflow: auto;
    width: 27%;
    margin-left: 28%;
    height: 472px;
      background-image: url("../../assets/background _unfinished.png");
      background-color: #fff;
      background-repeat :no-repeat;
}
.content{
      width: 100%;
  background: rgb(250, 250, 250);
}
</style>
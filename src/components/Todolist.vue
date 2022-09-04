<template>
    <div class="todo">
    <div class="title d-flex pcur" @click="push()">
      <div class="Todo">Todo</div>
      <div class="List">List</div>
    </div>
    <div class="box"   v-if="this.userId">
        <div
            v-for="item in todoList"
            :key="item.id"
            class="shop-box d-flex"
        >
        <div class="circle pcur" @click="finish(item.id)" v-if="item.done === false"></div>
        <div class="pcur" v-else><img src="../assets/icon_finish.png" alt=""></div>
        <div class="content pcur" @click="finish(item.id)" v-if="item.done === false">{{item.content}}</div>
         <div class="content pcur" v-else>{{item.content}}</div>
        </div>
    </div>
        <div v-else class="islogin">
        登陆后查看和使用todolist!!
        </div>
    </div>
</template>

<script>
import {
 getTodoList,FinishedTodo
} from "../api/api";
    export default {
          inject: ['reload'],
        data(){
            return{
                todoList:[],
                userId:"",          
                token:'',
                todoLists:[],
          }
        },
        created() {
            this.userId = window.localStorage.getItem("userid")
            console.log('userid', this.userId)
            if(this.userId){
            let requestData = {
                        userId:this.userId,
                        sort:0
                    };
                    
                    // provide reject
                    getTodoList(requestData).then((response) => {
                    console.log('我是todo返回数据',response);
                    this.todoList = response.data;
                    });
            }
            let requestData1 = {
                userId:this.userId,
                sort:1
            };
            // provide reject
            getTodoList(requestData1).then((response) => {
            console.log('我是todo返回数据2',response);
            this.todoLists = response.data;
            });
        },
        methods:{
                finish(id){
              let dataRequest = {
                id:id,
              }
              FinishedTodo(dataRequest).then((response) => {
            console.log('我是FinishedTodo返回数据',response);
            this.reload();
            });
            },
            push(){
                 this.userId = window.localStorage.getItem("userid")
                 if(this.userId === null)
                 alert('登录后使用Todolist')
                 else{
                       this.$router.push(
                    {
                        path: "/learningTools",
                        }
                     )
                 }
               
            }
        }
    }
</script>

<style lang="scss" scoped>
.islogin{
    margin-left: 32px;
    margin-top: 24px;
}
.title{
   padding-left: 32px;
    padding-top: 32px;
    font-size: 16px;
}
.circle{
  	width: 10px;
	height: 10px;
	border: solid 2px #000000;
    border-radius: 50%;
    margin-top: 8px;
    margin-right: 10px;
}
.Todo{
    margin-right: 5px;
    color: #3656c6;
}
.box{
    padding-left: 32px;
    margin-top: 28px;
    height: 134px;
    overflow: auto;
}
.content{
    font-size: 14px;
    align-items: center;
    height: 14px;
}
.shop-box{
    height: 30px;
    line-height: 30px;
}
</style>
<template>
    <div class="box">
    <div class="header">
    <HeaderHandler/>
    </div>
    <div class="content d-flex">
    <div class="left">
        <div class="title">
        消息通知
        </div>
        <!-- 第一种 -->
        <div class="jubao d-flex cursor-point" v-if="now === true  || now === ''">
        <img class="tu1" src="../../assets/icon_message_on.png" alt="">
        <div class="wenzi">
        私信消息
        </div>
        </div>
        <div class="jubao1 d-flex cursor-point" v-if="now === false" @click="change()">
        <img class="tu2" src="../../assets/icon_message_off.png" alt="">
        <div class="wenzi2">
        私信消息
        </div>
        </div>
        <!-- 第二种 -->
        <div class="user d-flex cursor-point" v-if="now === true  || now === ''" @click="change1()">
        <img class="tu3" src="../../assets/icon_notification_off.png" alt="">
        <div class="wenzi2">
        系统通知
        </div>
        </div>
        <div class="user1 d-flex cursor-point" v-if="now === false">
        <img class="tu4" src="../../assets/icon_notification_on.png" alt="">
        <div class="wenzi">
        系统通知
        </div>
        </div>
    </div>
    <div class="right" v-if="now === true || now === ''">
      <div class="notice">
        <div class="notice-head">
            {{username}}
        </div>
        <div class="notice-content">
            <div v-for="(item,index) in messageList" :key='index'>
                <div class="outher" v-if="!item.isMy">
                    <img :src="item.head"/>
                    <div>
                        {{item.content}}
                    </div>
                </div>
                <div class="outher mys" v-else>
                    <div>
                         {{item.content}}
                    </div>
                    <img :src="item.head"/>
                </div>
            </div>
    
        </div>
        <div class="message-view">
            <el-input type="textarea"
            placeholder="请输入内容"
            v-model="messageContent.contentText"
             :rows='6'></el-input>
            <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
      </div>
      <div>
         <div
            v-for="(item,index) in dataList"
            :key="index"
            class="tiao d-flex"
        >
        
        </div>
      </div>
    </div>
      <div class="right" v-else>
      <div class="nav3">
      最近通知
      </div>
      <div class="line"></div>
       <div
            v-for="(item,index) in dataList"
            :key="index"
            class="tiao"
        >
        <div class="title2">{{item.title}}</div>
        <div class="msg">{{item.msg}}</div>
        <div class="line"></div>
        </div>
    </div>
    </div>
      
    </div>
</template>

<script>
import {getSysMsg } from "../../api/api";
import HeaderHandler from '../../components/HeaderHandler.vue'
    export default {
        inject: ['reload'],
        name: "Message",
        components: {
            HeaderHandler,
        }, 
        data(){
            return{
                now:'',
                dataList:[],
                userId:"",
                messageList: [],
                socket: null,
                messageContent: {
                    toUserId: this.$route.query.userId,
                    contentText: ''
                },
                username: this.$route.query.name
            }
        },
        created(){
            this.this_fixed= ""
        window.localStorage.setItem("type",this.this_fixed);
            this.userId = window.localStorage.getItem("userid");
            this.initSocket()

            let dataRequest = {
                userId:this.userId
              }
              getSysMsg(dataRequest).then((response) => {
                console.log('我是getSysMsg返回数据',response);
                this.dataList = response.data;
                });
        },
        methods:{
            
              isJSON(str) {
                if (typeof str == 'string') {
                try {
                    var obj=JSON.parse(str);
                    if(typeof obj == 'object' && obj ){
                        return true;
                    }else{
                        return false;
                    }

                } catch(e) {
                    return false;
                }
                }else{
                return false;
                }
            },
            sendMessage() {
                const obj = {
                        content: this.messageContent.contentText,
                        head: '',  // 用自己的头像
                        isMy: true
                    }
                    this.messageList.push(obj)
                this.socket.send(JSON.stringify(this.messageContent));
                this.messageContent.contentText = ''
            },
            initSocket() {
                let _this = this
                 var socketUrl="http://1.12.66.67:9091/socket/"+ this.userId ;
                socketUrl=socketUrl.replace("https","ws").replace("http","ws");
                if(this.socket!=null){
                    this.socket.close();
                    this.socket=null;
                }
                this.socket = new WebSocket(socketUrl);
                //打开事件
                this.socket.onopen = function() {
                    console.log("websocket已打开");
                    //socket.send("这是来自客户端的消息" + location.href + new Date());
                };
                //获得消息事件
                this.socket.onmessage = function(msg) {
                    console.log(msg.data);
                    if(msg.data&&_this.isJSON(msg.data)) {
                        const { contentText,toUserId,fromUserId, name } = JSON.parse(msg.data)
                        _this.messageContent.toUserId = fromUserId
                        // _this.username = name

                        const obj = {
                            content: contentText,
                            head: toUserId == this.userId? '自己': '',  
                            isMy: toUserId == this.userId
                        }
                        _this.messageList.push(obj)
                    }
                    //发现消息进入    开始处理前端触发逻辑
                };
                //关闭事件
                this.socket.onclose = function() {
                    console.log("websocket已关闭");
                };
                //发生了错误事件
                this.socket.onerror = function() {
                    var data = onerror;
                    console.log(data)
                    console.log("websocket发生了错误");
                }
            },
            change(){
                this.now = true
            },
            change1(){
                this.now = false
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/messages.scss";
</style>
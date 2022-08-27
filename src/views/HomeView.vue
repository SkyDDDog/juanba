
<template>
  <div class="warp-box">
    <div class="nav-box">
      <HeaderHandler />
      <Search />
    </div>
    <div class="content">
    <Content />
    </div>
    <div class="todos">
    <Todolist />
    </div>
    <div class="hot">
    <Hot />
    </div>
  </div>
</template>

<script>
import HeaderHandler from '../components/HeaderHandler.vue'
import Search  from '../components/Search.vue'
import Content  from '../components/Content.vue'
import Todolist from '../components/Todolist.vue'
import Hot from '../components/Hot.vue'
export default {
  name: "HomeView",
  components: {
      HeaderHandler,
      Search,
      Content,
      Todolist,
      Hot,
  }
};
</script>

<style lang="scss" scoped>
.nav-box{
    background-image: url("../assets/background_home.png");
}
.warp-box{
  background-color: rgba(250,250,250);
}
.content{
  margin-left: 8.5%;
  width: 72%;
}
.todos{
    width:288px;
    height: 246px;
    position: relative;
    left: 1155px;
    top: -1063px;
   	background-color: #ffffff;
  background-image: url("../assets/background _todo.png");
 border-radius: 4px 4px 0px 0px;
}
.hot{
    width:288px;
    height: 438px;
	background-color: #ffffff;
    position: relative;
    left: 1155px;
    top: -1007px;
 border-radius: 4px 4px 0px 0px;
}
</style>

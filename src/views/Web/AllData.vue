<template>
  <div class="warp-box">
    <div class="nav-box">
      <HeaderHandler />
      <Search />
    </div>
     <div class="content">
    <Data/>
    </div>
    <div class="releaseno">
    <ReleaseData />
    </div>
    <div class="hot">
    <Data_Hot />
    </div>
  </div>
</template>

<script>
import HeaderHandler from '../../components/HeaderHandler.vue'
import Search  from '../../components/Search.vue'
import Todolist from '../../components/Todolist.vue'
import Data from '../../components/Data.vue'
import Data_Hot  from '../../components/Data_Hot.vue'
import ReleaseData  from '../../components/ReleaseData.vue'
export default {
  name: "HomeView",
  components: {
      HeaderHandler,
      Search,
      Todolist,
      Data_Hot,
      Data,
      ReleaseData,
  }
}
</script>

<style lang="scss" scoped>
.nav-box{
    background-image: url("../../assets/background_home.png");
}
.warp-box{
  background-color: rgba(250,250,250);
}
.content{
  margin-left: 12.5%;
  width:54%;
  height: 400px;
}
.hot{
    width:288px;
    height: 438px;
	background-color: #ffffff;
    position: relative;
    left: 1155px;
    top: -372px;
 border-radius: 4px 4px 0px 0px;
}
.releaseno{
    width:288px;
    height: 150px;
	background-color: #ffffff;
    position: relative;
    left: 1155px;
    top: -400px;
 border-radius: 4px 4px 0px 0px;
}
</style>
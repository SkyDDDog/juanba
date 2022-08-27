<template>
    <div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        created(){
             var tui = confirm('是否确认退出')
             if(tui === true){
                  localStorage.clear()
                     this.$router.push(
                {
                  name:'HomeView',
                 
                  }
                )
             }
             else{
                         this.$router.push(
                {
                  name:'HomeView',
                 
                  }
                )
             }
        }
    }
</script>

<style lang="scss" scoped>

</style>
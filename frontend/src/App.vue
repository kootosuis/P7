<script>
    import NavBar from "@/components/NavBar.vue"
    import PageFooter from "@/components/PageFooter.vue"

    export default {
        name: 'App',
        components :{
            NavBar,
            PageFooter
        }}
</script>

<template>
    <div>
            <header >
                <NavBar/>
            </header>
           
            <router-view/> 
            
            <footer >
                <PageFooter/>
            </footer>
    </div>
</template>


<style lang="scss">
    #app {

    //   * {
    //     border: solid 1px rgb(204, 121, 42)
    //   }
      header {
        height :120px;
      }
 }

</style>

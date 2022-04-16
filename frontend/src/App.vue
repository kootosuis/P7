<script>
    // import NavBar from "@/components/NavBar.vue"
    // import LoaderComp from "@/components/LoaderComp.vue"
    import PageFooter from "@/components/PageFooter.vue"

    export default {
        name: 'App',
        components :{
            // NavBar,
            // LoaderComp,
            PageFooter
        }}
</script>

<template>
    <div>
            <!-- <LoaderComp/> -->

            <!-- <header class="header">
                <NavBar/>
            </header> -->
            <div class="main">
                <router-view/> 
            </div>
           
            <footer class="footer" >
                <PageFooter/>
            </footer>
    </div>
</template>


<style lang="scss">
    #app {

      * {
        border: solid 1px rgb(204, 121, 42)
      }
      header {
        height :120px;
      }
 }
 

</style>

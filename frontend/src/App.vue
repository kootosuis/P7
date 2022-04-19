<script>
    import LoaderComp from "@/components/LoaderComp.vue"
    import PageFooter from "@/components/PageFooter.vue"
    console.log("TEST" + process.env.ADMINID)

    export default {
        name: 'App',
        components :{

            LoaderComp,
            PageFooter
        }}
</script>

<template>
    <div>
            <LoaderComp/>

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

    //   * {
    //     border: solid 1px rgb(204, 121, 42)
    //   }

 }
 

</style>

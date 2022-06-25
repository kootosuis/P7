<template>
    <div>
        <!-- <LoaderComp/> -->

        <div class="main vh">
            <router-view />
            <footer class="footer">
                <PageFooter />
            </footer>
        </div>
    </div>
</template>

<script>
    // import LoaderComp from "@/components/LoaderComp.vue"
    import PageFooter from "@/components/PageFooter.vue";

    export default {
        name: "App",
        components: {
            // LoaderComp,
            PageFooter,
        },
    };
</script>



<style lang="scss">
    // #app {
    //   * {
    //     border: solid 1px rgb(204, 121, 42)
    //   }
    // }
    .vh {
        min-height: 100vh;
    }
</style>

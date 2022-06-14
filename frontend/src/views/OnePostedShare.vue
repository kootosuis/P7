<template>
    <div>
        <header class="header">
            <NavBar />
        </header>
        <div class="main">
            <PostAShare />
            <ShareAlone />
            <!-- <ShareAlone :key="componentKey" /> -->
        </div>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import PostAShare from "@/components/PostAShare.vue";
    import ShareAlone from "@/components/ShareAlone.vue";

    export default {
        name: "OnePostedShare",
        components: {
            NavBar,
            PostAShare,
            ShareAlone,
        },
        //         data() {
        //             return {
        //                 componentKey: 0,
        //             };
        //         },
        //         methods: {
        //             forceRerender() {
        //                 this.componentKey += 1;
        //             },
        //         },
    };
</script>

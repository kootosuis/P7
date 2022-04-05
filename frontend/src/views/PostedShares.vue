<template>
	<div>
		<!-- <PostedSharesPopular />
                    <PostedSharesComp /> -->
                    <!-- <ShareAlone /> -->
                    <PostAShare/>
                    <SharesAll/>

          </div>
</template>


<script>
	// import PostedSharesPopular from "@/components/PostedSharesPopular.vue"
          // import PostedSharesComp from "@/components/PostedSharesComp.vue"
          // import ShareAlone from "@/components/ShareAlone.vue"
          import SharesAll from "@/components/SharesAll.vue"
          import PostAShare from "@/components/PostAShare.vue"

	export default {
		name: "PostedShares",
		components: {
			// PostedSharesPopular,
                              // PostedSharesComp,
                              // ShareAlone,
                              SharesAll,
                              PostAShare
		}
	};
</script>
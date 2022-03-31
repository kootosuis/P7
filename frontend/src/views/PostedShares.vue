<template>
	<div>
		<PostedSharesPopular />
                    <PostedSharesComp />

          </div>
</template>


<script>
	import PostedSharesPopular from "@/components/PostedSharesPopular.vue"
          import PostedSharesComp from "@/components/PostedSharesComp.vue"

	export default {
		name: "PostedShares",
		components: {
			PostedSharesPopular,
                              PostedSharesComp 	
		}
	};
</script>
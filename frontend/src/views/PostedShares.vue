<template>
          <div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<!-- <ShareAlone />  -->
		<PostAShare/>
		<!-- <PostedSharesPopular/> -->
		<SharesAll/>
		</div>
		
	</div>
</template>


<script>
          import NavBar from "@/components/NavBar.vue"
          // import ShareAlone from "@/components/ShareAlone.vue"
          import PostAShare from "@/components/PostAShare.vue"
          // import PostedSharesPopular from "@/components/PostedSharesPopular.vue"
          import SharesAll from "@/components/SharesAll.vue"
          
          

	export default {
		name: "PostedShares",
		components: {
                              NavBar,
                              // ShareAlone,
                              PostAShare,
                              // PostedSharesPopular
                              SharesAll,
                    
                              
		}
	};
</script>
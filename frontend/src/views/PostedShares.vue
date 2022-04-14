<template>
          <div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
		<PostAShare/>
		<!-- <PostedSharesPopular/> -->
		<SharesAll/>
		</div>
		
	</div>
</template>


<script>
          import NavBar from "@/components/NavBar.vue"
          import PostAShare from "@/components/PostAShare.vue"
          // import PostedSharesPopular from "@/components/PostedSharesPopular.vue"
          import SharesAll from "@/components/SharesAll.vue"
          
          

	export default {
		name: "PostedShares",
		components: {
                              NavBar,
                              PostAShare,
                              // PostedSharesPopular
                              SharesAll,
                    
                              
		}
	};
</script>
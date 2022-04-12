<template>
<div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<PostAShare/>
                              <ShareAlone/>
                              <PostAComment/>
		</div>
		
	</div>
</template>


<script>
          import NavBar from "@/components/NavBar.vue"
          import PostAShare from "@/components/PostAShare.vue"
          import ShareAlone from "@/components/ShareAlone.vue"
          import PostAComment from "@/components/PostAComment.vue"
         
	export default {
		name: "OnePostedShare",
		components: {
                              NavBar,
                              PostAShare,
                              ShareAlone,
                              PostAComment
		}
	};
</script>
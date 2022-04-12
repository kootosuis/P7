<template>
	<div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<UserModifyComp />
		</div>
		
	</div>
</template>

<script>
	import UserModifyComp from "@/components/UserModifyComp.vue"
	import NavBar from "@/components/NavBar.vue"

	export default {
		name: "UserModify",
		components: {
			NavBar,
			UserModifyComp, 	
		}
	};
</script>

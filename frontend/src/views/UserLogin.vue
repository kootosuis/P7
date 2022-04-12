<template>
	<div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<UserLoginComp />
		</div>
		
	</div>
</template>

<script>
	import UserLoginComp from "@/components/UserLoginComp.vue"
	import NavBar from "@/components/NavBar.vue"

	export default {
		name: "UserLogin",
		components: {
			NavBar,
			UserLoginComp, 	
		}
	};
</script>
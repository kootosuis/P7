<template>
	<div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<UserSignUpComp />
		</div>
		
	</div>
</template>

<script>
	import UserSignUpComp from "@/components/UserSignUpComp.vue"
	import NavBar from "@/components/NavBar.vue"

	export default {
		name: "UserSignUp",
		components: {
			NavBar,
			UserSignUpComp, 	
		}
	};
</script>

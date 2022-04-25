<template>
	<div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
			<UserModifyCompByAdmin />
		</div>
		
	</div>
</template>

<script>
	import UserModifyCompByAdmin from "@/components/UserModifyCompByAdmin.vue"
	import NavBar from "@/components/NavBar.vue"

	export default {
		name: "UserModify",
		components: {
			NavBar,
			UserModifyCompByAdmin, 	
		}
	};
</script>

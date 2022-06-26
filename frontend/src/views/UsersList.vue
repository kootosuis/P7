<template>
          <div>
		<header class="header">
			<NavBar/>
		</header>
		<div class="main">
		<UsersListComp @resfreshUsers="mounted()"/>
		</div>
		
	</div>
</template>


<script>
          import NavBar from "@/components/NavBar.vue"
          import UsersListComp from "@/components/UsersListComp.vue"

	export default {
		name: "UsersList",
		components: {
                              NavBar,
                              UsersListComp      
		}
	};
</script>
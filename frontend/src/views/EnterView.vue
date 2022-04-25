<template>
	<div>
    <header class="header">
			<NavBar/>
		</header>
		<section class="fond">
                <div class="container">

                        <div class="message__principal">
                          <h2 > Bienvenue sur LeRezo,<br/>le réseau social de Groupomania</h2>
                        </div>

                        <div class="message__secondaire">
                          <h3>Attention</h3>
                          <p >
                            <br>L'usage de ce réseau est strictement réservé 
                            <br>aux membres des équipes de Groupomania.
                          </p>
                </div>
           </div>
    </section>
		
	</div>
</template>


<script>
import NavBar from "@/components/NavBar.vue"

    export default {
        name: "EnterView",
        components:{
          NavBar
        }
    }
</script>



<style scoped>

</style>




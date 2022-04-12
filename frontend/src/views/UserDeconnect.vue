<template>
<div>
  <header class="header">
			<NavBar/>
		</header>

    <section class="fond2">
                <div class="container">

                        <div class="message__principal">
                          <h2 >Au revoir et à bientôt sur LeRezo, le réseau social de Groupomania</h2>
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
        name: "UserDeconnect",
        components:{
          NavBar
        },
        methods: {
        },
        created()  {
            setTimeout(() => this.$router.push({ name: 'enter' }), 5000)
        }
          
    }
</script>



<style scoped>

</style>

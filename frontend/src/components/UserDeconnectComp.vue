<script>
export default {
  name : 'UserDeconnectComp',
  props : {
    aurevoir : String
  }
}
</script>

<template>

    <section class="avertissement">
          <div class="container">

                        <div >
                          <h2 class="bienvenue"> {{aurevoir}}</h2>
                        </div>
           </div>
    </section>
          
</template>


<style scoped>

.avertissement {
  margin-top: 0;
  margin-bottom: 0;
  min-height: 680px;
  margin-top: 0;
  font-size: 1.25rem;
  background-image: linear-gradient(#40cbc4, #fed7d7);
  
}

.bienvenue {
  padding: 30px;
  font-size: 3.75rem;
  font-family: Alata;
  text-transform: none;
  font-weight: 400;
  margin: 30px;
}

</style>
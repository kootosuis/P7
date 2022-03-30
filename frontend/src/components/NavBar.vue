<template>

<nav class="navbar">
      <div class="navbar-container container">
          <input type="checkbox" name="" id="">
          <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
          </div>
          <ul class="menu-items">
               <li><router-link to="/signup">S'inscrire</router-link></li>
               <li><router-link to="/login">S'identifier</router-link></li>
               <li><router-link to="/deconnect">Se déconnecter</router-link></li>
          </ul>

          <div class="logo">
            <img src="../assets/images/icon-above-font.svg" alt="Logo Groupomania">
          </div>
          
      </div>
  </nav>
</template>

<style lang="scss">

</style>

<script>    

export default {
    name : 'NavBar',
}

</script>
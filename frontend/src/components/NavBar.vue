<template>
    <nav class="navbar">
        <div class="navbar-container container">
            <input type="checkbox" name="">
            
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>

                <ul class="menu-items">
                    <li v-show="!token"><router-link to="/signup">S'inscrire</router-link></li>
                    <li v-show="!token"><router-link to="/login">S'authentifier</router-link></li>
                    <li v-show="token" ><router-link to="/modify">Gérér son compte</router-link></li>
                    <li v-show="token" ><router-link @click="logout()" to="/deconnect">Se déconnecter</router-link></li>
                </ul>

                <div class="logo">
                    <img src="../assets/images/icon-above-font.svg" alt="Logo Groupomania">
                </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>


</style>

<script>    

export default {
    name : 'NavBar',

    data() {
    return {
          token: "",
          message :"", //message d'erreur
    }},
    methods : {
        logout(){
            sessionStorage.removeItem("UserId");
            sessionStorage.removeItem("Token");
        }
    },
    
    mounted(){
      console.log('App Mounted');
        if (sessionStorage.getItem("Token"))
            this.token = JSON.parse(sessionStorage.getItem("Token"));
    },
  }


</script>
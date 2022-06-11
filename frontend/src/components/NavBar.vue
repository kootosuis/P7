<template>
    <nav class="navbar">
        <div class="navbar-container container">
            
            <input type="checkbox" name="main-nav" class="check"/>

            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>

            <ul class="navbar__items">
                <li v-show="token"><router-link @click="toggleMenu" to="/wall">Le Forum</router-link></li>
                <li v-show="!token"><router-link @click="toggleMenu" to="/signup">S'inscrire</router-link></li>
                <li v-show="!token"><router-link @click="toggleMenu" to="/login">S'authentifier</router-link></li>
                <li v-show="token"><router-link @click="toggleMenu" to="/modify">Gérér son compte</router-link></li>
                <li v-show="token && isAdmin == 1"><router-link @click="toggleMenu" to="/list">Comptes utilisateurs</router-link></li>
                <li v-show="token"><router-link @click="logout()" to="/deconnect">Se déconnecter</router-link></li>
            </ul>

            <div class="logo">
                <img src="../assets/images/icon-above-font.svg" alt="Logo Groupomania" id="lelogogroupomania" />
            </div>
        </div>
        <div>
            <p v-show="token" id="authentification">Vous êtes authentifié en tant que {{ UserFirstname }} {{ UserName }}.</p>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    #authentification,
    #accessToList {
        font-size: 12px;
        font-style: italic;
        text-align: center;
        background-color: #fed7d7
    }
</style>

<script>
    export default {
        name: "NavBar",

        data() {
            return {
                token: "",
                UserFirstname: "",
                UserName: "",
                isAdmin: "",
            };
        },
        methods: {
            //-------- le logout efface toutes les données du sessionStorage -------///
            logout() {
                sessionStorage.clear();
                this.$router.push({ name: "enter" });
            },

            toggleMenu() {
                const input = document.getElementById("check");
                input.checked = false;
            },
        },

        //-------- la NavBar change en fonction de l'existence ou pas d'un Token d'authentification -------///
        mounted() {
            if (sessionStorage.getItem("Token")) {
                this.token = JSON.parse(sessionStorage.getItem("Token"));
                const UserId = JSON.parse(sessionStorage.getItem("UserId"));
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                this.isAdmin = sessionStorage.getItem("isAdmin");

                fetch(`http://localhost:3000/api/auth/${UserId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                    mode: "cors",
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        this.UserName = res.UserName;
                        this.UserFirstname = res.UserFirstname;
                    })
                    .catch((error) => {
                        alert(error);
                    });
            } else {
                this.token = null;
            }
        },
    };
</script>

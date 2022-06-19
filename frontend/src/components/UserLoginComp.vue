<template>
    <section class="container">
        <div class="formSection">
            <div class="please">
                <h2>Ravis de vous revoir !</h2>
            </div>

            <div class="formDiv">
                <form class="formulaire" method="POST" name="form" id="form" @submit="logIn">
                    <!--L'Email'-->
                    <div class="formLine">
                        <label for="UserEmail" class="label">Email</label>
                        <input class="input" @input="checkForm" type="email" id="UserEmail" name="UserEmail" required />
                    </div>

                    <!--Le Mot de passe -->
                    <div class="formLine">
                        <label for="UserPassword" class="label">Mot de passe</label>
                        <input class="input" @input="checkForm" type="text" id="UserPassword" name="UserPassword" required maxlength="30" />
                    </div>

                    <div class="btn-div">
                        <input type="submit" class="btn" id="UserSignupBtn" value="S'authentifier" disabled />
                        <!-- rajouter un bouton "mot de passe oublié"-->
                    </div>
                </form>

                <div class="add-div" v-show="success === false">
                    <p id="erreur">Echec de l'authentification : {{ message }}</p>
                </div>

                <div class="add-div" v-show="success === true">
                    <p id="erreur">Succès de l'authentification : {{ message }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserLogin",
        data() {
            return {
                success: "",
                message: "", //message d'erreur ou pas
                isAdmin: "",
            };
        },
        methods: {
            checkForm() {
                if (document.getElementById("UserEmail").checkValidity() && document.getElementById("UserPassword").checkValidity()) {
                    document.getElementById("UserSignupBtn").disabled = false;
                } else document.getElementById("UserSignupBtn").disabled = true;
            },

            logIn(e) {
                e.preventDefault();

                const UserEmail = document.getElementById("UserEmail").value;
                const UserPassword = document.getElementById("UserPassword").value;

                const User = { UserEmail: UserEmail, UserPassword: UserPassword };

                fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify(User),
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 200) {
                            return response.json();
                        } else {
                            response.json().then((json) => {
                                this.success = false;
                                this.message = json.error || json.message;
                            });
                        }
                    })
                    .then((response) => {
                        this.success = true;
                        this.message = response.message;
                        this.isAdmin = response.UserHabilitation;
                        sessionStorage.setItem("UserEmail", JSON.stringify(response.UserEmail));
                        sessionStorage.setItem("Token", JSON.stringify(response.token));
                        setTimeout(() => this.$router.push({ name: "wall" }), 1000);
                    })

                    .catch(() => {
                        this.success = false;
                        this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                    });
            },
        },
    };
</script>

<style lang="scss" scoped></style>

<template>
    <section class="container">
        <div class="formSection">
            <div class="please">
                <h2>Veuillez renseigner le formulaire pour créer votre compte</h2>
            </div>

            <div class="formDiv">
                <form class="formulaire" method="POST" name="form" id="form" @submit="signUp">
                    <!--Le Prénom-->
                    <div class="formLine">
                        <label for="UserFirstname" class="label">Prénom <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            @input="checkForm"
                            type="text"
                            placeholder="Entrez votre prénom."
                            id="UserFirstname"
                            name="UserFirstname"
                            required="required"
                        />
                    </div>

                    <!--Le Nom-->
                    <div class="formLine">
                        <label for="UserName" class="label">Nom <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            @input="checkForm"
                            type="text"
                            placeholder="Entrez votre nom."
                            id="UserName"
                            name="UserName"
                            required="required"
                        />
                    </div>

                    <!--L'Email'-->
                    <div class="formLine">
                        <label for="UserEmail" class="label">Email <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            @input="checkForm"
                            type="email"
                            placeholder="Entrez une adresse mail valide."
                            id="UserEmail"
                            name="UserEmail"
                            required=""
                        />
                    </div>

                    <!--La Présentation-->
                    <div class="formLine">
                        <label for="UserPresentation" class="label">Présentation</label>
                        <textarea
                            class="smalltextarea input"
                            type="textarea"
                            placeholder="Si vous le souhaitez, vous pouvez vous présenter..."
                            id="UserPresentation"
                            name="UserPresentation"
                        ></textarea>
                    </div>

                    <!--Le Service-->
                    <div class="formLine">
                        <label for="UserDepartement" class="label">Service <span class="asterisque">*</span></label>

                        <select class="input" id="UserDepartement" name="UserDepartement" required="required">
                            <option value="...">...</option>
                            <option value="communication">communication</option>
                            <option value="administration">administration</option>
                            <option value="siège">siège</option>
                            <option value="R&amp;D">R&amp;D</option>
                            <option value="magasin 1">magasin 1</option>
                            <option value="magasin 2">magasin 2</option>
                            <option value="etc.">etc.</option>
                        </select>
                    </div>

                    <!--Le Rôle-->
                    <div class="formLine">
                        <label for="UserRole" class="label">Rôle</label>
                        <textarea
                            class="smalltextarea input"
                            type="textarea"
                            placeholder="Quel est votre rôle dans l'entreprise ?"
                            id="UserRole"
                            name="UserRole"
                        ></textarea>
                    </div>

                    <!--Le Mot de passe -->
                    <div class="formLine">
                        <label for="UserPassword" class="label">Mot de passe <span class="asterisque">*</span></label>

                        <input
                            class="input"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="password"
                            placeholder="N'oubliez pas de noter votre mot de passe."
                            id="UserPassword"
                            name="UserPassword"
                            required="required"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        />
                        <!--- un séparateur -->
                        <div class="separator"></div>

                        <input
                            class="input"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="password"
                            placeholder="Veuillez confirmer votre mot de pass."
                            id="UserPasswordConfirm"
                            name="UserPasswordConfirm"
                            required="required"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        />
                    </div>

                    <!-- Avertissement -->
                    <div class="formLine">
                        <div class="label"></div>
                        <p class="hint input">
                            Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère
                            spécial.
                        </p>
                    </div>

                    <div class="asterisque" style="text-align: right">* Champs requis</div>

                    <div class="btn-div">
                        <button type="button" class="btn" @click="goBacKToForum()" id="CancelBtn">Annuler</button>
                        <input type="submit" class="btn" id="UserSignupBtn" value="S'inscrire" disabled />
                    </div>
                </form>

                <div class="add-div" v-show="success === false">
                    <p id="erreur">Echec de l'inscription : {{ message }}</p>
                </div>

                <div class="add-div" v-show="success === true">
                    <p id="erreur">{{ message }}</p>
                </div>

                <div id="no-account" class="add-div">
                    <p>Déjà un compte ? <router-link class="no-account-link" to="../login">S'authentifier</router-link></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserSignUpComp",
        data() {
            return {
                message: "", //message d'erreur
            };
        },
        methods: {
            checkForm() {
                if (
                    document.getElementById("UserName").checkValidity() &&
                    document.getElementById("UserFirstname").checkValidity() &&
                    document.getElementById("UserEmail").checkValidity() &&
                    document.getElementById("UserPassword").checkValidity() &&
                    document.getElementById("UserPassword").value == document.getElementById("UserPasswordConfirm").value
                ) {
                    document.getElementById("UserSignupBtn").disabled = false;
                } else {
                    document.getElementById("UserSignupBtn").disabled = true;
                }
            },

            goBacKToForum() {
                this.$router.push({ name: "wall" });
            },

            signUp(e) {
                e.preventDefault();

                const UserName = document.getElementById("UserName").value;
                const UserFirstname = document.getElementById("UserFirstname").value;
                const UserEmail = document.getElementById("UserEmail").value;
                const UserPassword = document.getElementById("UserPassword").value;
                const UserPresentation = document.getElementById("UserPresentation").value;
                const UserDepartement = document.getElementById("UserDepartement").value;
                const UserRole = document.getElementById("UserRole").value;

                const User = {
                    UserName: UserName,
                    UserFirstname: UserFirstname,
                    UserEmail: UserEmail,
                    UserDepartement: UserDepartement,
                    UserPresentation: UserPresentation,
                    UserRole: UserRole,
                    UserPassword: UserPassword,
                    UserHabilitation: false,
                };

                fetch("http://localhost:3000/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify(User),
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 201) {
                            response.json().then(() => {
                                this.success = true;
                                this.message = "Inscription validée.";

                                const UserShortCutEmail = User.UserEmail;
                                const UserShortCutPassword = User.UserPassword;
                                const UserShortCutHabilitation = User.UserHabilitation;
                                const UserShortCut = {
                                    UserEmail: UserShortCutEmail,
                                    UserPassword: UserShortCutPassword,
                                    UserHabilitation: UserShortCutHabilitation,
                                };

                                fetch("http://localhost:3000/api/auth/login", {
                                    method: "POST",
                                    body: JSON.stringify(UserShortCut),
                                    headers: { "Content-Type": "application/json" },
                                    mode: "cors",
                                })
                                    .then((response) => {
                                        if (response.status == 200) {
                                            response.json().then((response) => {
                                                this.success = true;
                                                this.message = "Authentification effectuée.";
                                                sessionStorage.setItem("UserId", JSON.stringify(response.UserId));
                                                sessionStorage.setItem("Token", JSON.stringify(response.token));
                                                sessionStorage.setItem("isAdmin", JSON.stringify(response.UserHabilitation));
                                                setTimeout(this.$router.push({ name: "wall" }), 3000);
                                            });
                                        } else {
                                            response.json().then((json) => {
                                                this.success = false;
                                                console.log(json);
                                                this.message = json.error;
                                            });
                                        }
                                    })
                                    .catch(() => {
                                        this.success = false;
                                        this.message = `veuillez réessayer ultérieurement`;
                                    });
                            });
                        } else {
                            response.json().then((json) => {
                                this.success = false;
                                console.log(json);
                                this.message = json.error.errors[0].message;
                            });
                        }
                    })
                    .catch(() => {
                        this.success = false;
                        this.message = `veuillez réessayer ultérieurement`;
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    #no-account {
        padding: 1.5rem;
        font-size: 1.5rem;
    }

    .no-account-link {
        font-weight: 500;
        font-size: 2rem;
    }
</style>

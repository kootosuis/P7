<template>
    <section class="container">
        <div class="formSection">
            <div class="please">
                <h2>Vous pouvez mettre à jour les données de {{ UserFirstname }} {{ UserName }}</h2>
            </div>

            <div class="formDiv">
                <form class="formulaire" method="PUT" name="form" id="form" @keydown="checkForm" @input="checkForm" @submit="modifySignup">
                    <!--Le Prénom-->
                    <div class="formLine">
                        <label for="UserFirstname" class="label">Prénom <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            v-model="UserFirstname"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="text"
                            placeholder="Entrez votre prénom."
                            id="UserFirstname"
                            name="UserFirstname"
                            required
                        />
                    </div>

                    <!--Le Nom-->
                    <div class="formLine">
                        <label for="UserName" class="label">Nom <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            v-model="UserName"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="text"
                            placeholder="Entrez le nom de l'utilisateur."
                            id="UserName"
                            name="UserName"
                            required
                        />
                    </div>

                    <!--L'Email'-->
                    <div class="formLine">
                        <label for="UserEmail" class="label">Email <span class="asterisque">*</span></label>
                        <input
                            class="input"
                            v-model="UserEmail"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="email"
                            placeholder="Entrez une adresse mail valide."
                            id="UserEmail"
                            name="UserEmail"
                            required
                        />
                    </div>

                    <!--La Présentation-->
                    <div class="formLine">
                        <label for="UserPresentation" class="label">Présentation</label>
                        <textarea
                            class="smalltextarea input"
                            v-model="UserPresentation"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="textarea"
                            placeholder="Si vous le souhaitez, vous pouvez vous présenter..."
                            id="UserPresentation"
                            name="UserPresentation"
                        ></textarea>
                    </div>

                    <!--Le Service-->
                    <div class="formLine">
                        <label for="UserDepartement" class="label">Service <span class="asterisque">*</span></label>

                        <select class="input" id="UserDepartement" name="UserDepartement" v-model="UserDepartement" @input="checkForm" required>
                            <!-- <option value="...">...</option> -->
                            <option value="" disabled selected>Où travaillez-vous?</option>
                            <!-- <option value="" disabled selected hidden >Où travaillez-vous?</option> 
                            hidden permet de faire disparaitre le place holder de la liste des choix-->
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
                        <input
                            class="input"
                            v-model="UserRole"
                            @keydown="checkForm"
                            @input="checkForm"
                            type="text"
                            placeholder="En deux mots, votre rôle dans l'entreprise..."
                            id="UserRole"
                            name="UserRole"
                        />
                    </div>

                    <!--Le Mot de passe -->
                    <div class="formLine">
                        <label for="UserPassword" class="label">Mot de passe</label>

                        <div class="input">
                            <input
                                class="passwordinput"
                                @keydown="checkForm"
                                @input="checkForm"
                                v-bind:type="[showPassword ? 'text' : 'password']"
                                placeholder="Si vous changez le mot de passe, n'oubliez pas de le noter."
                                id="UserPassword"
                                name="UserPassword"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            />
                            <img id="eye" @click="showPassword = !showPassword" :src="[showPassword ? 'nosee.png' : 'see.png']" />
                        </div>
                    </div>
                    <!-- Avertissement -->
                    <div class="formLineHint">
                        <div class="label"></div>
                        <p class="inputhint">
                            Le mot de passe doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère
                            spécial.
                        </p>
                    </div>

                    <!-- Confirmation -->
                    <div class="formLine">
                        <label for="UserPassword" class="label">Confirmation</label>
                        <div class="input">
                            <input
                                class="passwordinput"
                                @keydown="checkForm"
                                @input="checkForm"
                                v-bind:type="[showPassword ? 'text' : 'password']"
                                placeholder="Veuillez confirmer votre mot de passe."
                                id="UserPasswordConfirm"
                                name="UserPasswordConfirm"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            />
                            <img id="eye" @click="showPassword = !showPassword" :src="[showPassword ? 'see.png' : 'nosee.png']" />
                        </div>
                    </div>

                    <!--L'habilitation -->
                    <div class="formLine">
                        <label for="UserHabilitation" class="label">Habilitation</label>
                        <select
                            v-if="UserHabilitation == 0"
                            class="input"
                            id="changedUserHabilitation"
                            name="UserHabilitation"
                            @input="checkForm"
                            required
                        >
                            <option value="0">sans habilitation à administrer</option>
                            <option value="1">avec habilitation à administrer</option>
                        </select>
                        <select
                            v-if="UserHabilitation == 1 && AdminLength"
                            class="input"
                            id="changedUserHabilitation"
                            name="UserHabilitation"
                            @input="checkForm"
                            required
                        >
                            <option value="1">avec habilitation à administrer</option>
                            <option value="0">sans habilitation à administrer</option>
                        </select>
                        <select
                            v-if="UserHabilitation == 1 && !AdminLength"
                            class="input"
                            id="changedUserHabilitation"
                            name="UserHabilitation"
                            @input="checkForm"
                            required
                        >
                            <option value="1">avec habilitation à administrer</option>
                            <p class="hint inputhint">
                                Vous pourrez modifier l'habilitation <br />
                                lorsqu'il y aura plus de deux administrateurs.
                            </p>
                        </select>
                    </div>

                    <div class="asterisque champs" style="text-align: right">* Champs requis</div>

                    <div class="btn-div">
                        <button type="button" class="btn" @click="goBacKToForum()" id="CancelBtn">Annuler</button>
                        <input type="submit" class="btn" id="UserSignupBtn" value="Mettre à jour" disabled />
                    </div>
                </form>

                <div class="add-div" v-show="success === true">
                    <p id="erreur">Tout va bien : {{ message }}</p>
                </div>
                <div class="add-div" v-show="success === false">
                    <p id="erreur">Echec de la mise à jour : {{ message }}</p>
                </div>

                <!--effacement du compte-->
                <div id="no-account" class="add-div">
                    <p>Vous pouvez si vous le souhaitez, effacer ce compte ainsi que tous les partages et commentaires qui y sont liés</p>
                    <div class="btn-div">
                        <button type="button" class="btn"><router-link @click="deleteAccount()" to="../deconnect">Effacer</router-link></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserModifyCompByAdmin",

        data() {
            return {
                showPassword: false,

                UserName: "",
                UserFirstname: "",
                UserEmail: "",
                UserPresentation: "",
                UserDepartement: "",
                UserRole: "",
                UserHabilitation: "",
                success: "",
                message: "", //message d'erreur

                AdminLength: {
                    type: Boolean,
                    default: false,
                },

                isAdmin: "",
            };
        },

        mounted() {
            const UserEmail = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];
            const Token = JSON.parse(sessionStorage.getItem("Token"));

            ///----- on vérifie d'abord qu'il y a au minimum deux administrateurs ----///
            fetch(`http://localhost:3000/api/auth/safeAdmin`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res.length > 2) {
                        this.AdminLength = true;
                    } else {
                        this.AdminLength = false;
                    }
                })
                .catch((error) => {
                    alert(error);
                });

            ///----on peut ensuite accèder au profil User------///
            fetch(`http://localhost:3000/api/auth/${UserEmail}`, {
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
                    this.UserEmail = res.UserEmail;
                    this.UserPresentation = res.UserPresentation;
                    this.UserDepartement = res.UserDepartement;
                    this.UserRole = res.UserRole;
                    this.UserHabilitation = res.UserHabilitation;
                })
                .catch((error) => {
                    alert(error);
                    this.message = error;
                });
        },

        methods: {
            checkForm() {
                if (document.getElementById("UserPassword").value) {
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
                } else {
                    if (
                        document.getElementById("UserName").checkValidity() &&
                        document.getElementById("UserFirstname").checkValidity() &&
                        document.getElementById("UserEmail").checkValidity()
                    ) {
                        document.getElementById("UserSignupBtn").disabled = false;
                    } else {
                        document.getElementById("UserSignupBtn").disabled = true;
                    }
                }
            },

            goBacKToForum() {
                this.$router.push({ name: "wall" });
            },

            modifySignup(e) {
                e.preventDefault();

                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const cardUserEmail = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];

                if (document.getElementById("UserPassword").value) {
                    const UserName = document.getElementById("UserName").value;
                    const UserFirstname = document.getElementById("UserFirstname").value;
                    const UserEmail = document.getElementById("UserEmail").value;
                    const UserPresentation = document.getElementById("UserPresentation").value;
                    const UserDepartement = document.getElementById("UserDepartement").value;
                    const UserRole = document.getElementById("UserRole").value;
                    const UserPassword = document.getElementById("UserPassword").value;
                    const UserHabilitation = document.getElementById("changedUserHabilitation").value;

                    const User = {
                        UserName: UserName.toUpperCase(),
                        UserFirstname: UserFirstname.toUpperCase(),
                        UserEmail: UserEmail,
                        UserDepartement: UserDepartement,
                        UserPresentation: UserPresentation,
                        UserRole: UserRole,
                        UserPassword: UserPassword,
                        UserHabilitation: UserHabilitation,
                    };

                    fetch(`http://localhost:3000/api/auth/modifySignup/${cardUserEmail}`, {
                        method: "PUT",
                        body: JSON.stringify(User),
                        headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                        mode: "cors",
                    })
                        .then((response) => {
                            if (response.status == 201) {
                                response.json().then((res) => {
                                    console.log(res);
                                    this.success = true;
                                    this.message = "mise à jour effectuée";
                                    this.$emit("refreshUsers");
                                    // this.$router.go(0);
                                    setTimeout(() => this.$router.push({ name: "list" }), 1000);
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
                            this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                        });
                } else {
                    const UserName = document.getElementById("UserName").value;
                    const UserFirstname = document.getElementById("UserFirstname").value;
                    const UserEmail = document.getElementById("UserEmail").value;
                    const UserPresentation = document.getElementById("UserPresentation").value;
                    const UserDepartement = document.getElementById("UserDepartement").value;
                    const UserRole = document.getElementById("UserRole").value;
                    const UserHabilitation = document.getElementById("changedUserHabilitation").value;

                    const User = {
                        UserName: UserName.toUpperCase(),
                        UserFirstname: UserFirstname.toUpperCase(),
                        UserEmail: UserEmail,
                        UserDepartement: UserDepartement,
                        UserPresentation: UserPresentation,
                        UserRole: UserRole,
                        UserHabilitation: UserHabilitation,
                    };

                    fetch(`http://localhost:3000/api/auth/modifySignup/${cardUserEmail}`, {
                        method: "PUT",
                        body: JSON.stringify(User),
                        headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                        mode: "cors",
                    })
                        .then((response) => {
                            if (response.status == 201) {
                                response.json().then((res) => {
                                    console.log(res);
                                    this.success = true;
                                    this.message = "mise à jour effectuée";
                                    this.$emit("refreshUsers");
                                    // this.$router.go(0);
                                    setTimeout(() => this.$router.push({ name: "list" }), 1000);
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
                            this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                        });
                }
            },

            deleteAccount() {
                const cardUserEmail = new URL(window.location.href).hash.split("/modifyByAdmin/")[1];
                const Token = JSON.parse(sessionStorage.getItem("Token"));

                const deleteUser = confirm("Le compte et tous les partages et commentaires associés vont être effacés");

                if (deleteUser) {
                    fetch(`http://localhost:3000/api/auth/delete/${cardUserEmail}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                        mode: "cors",
                    }).then(() => {
                        alert("Compte supprimé"),
                            this.$emit("refreshUsers"),
                            // this.$router.go(0);
                            setTimeout(() => this.$router.push({ name: "list" }), 1000);
                    });
                } else {
                    this.$router.push({ name: "list" });
                }
            },
        },
    };
</script>

<style lang="scss" scoped></style>

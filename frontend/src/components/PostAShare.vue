<template>
    <section class="container">
        <div class="btn-div" id="ShareAccess" v-show="ShareFormHidden">
            <button type="button" class="btn" @click="displayForm()" id="GoToShare">
                Et vous,<br />
                que voulez-vous partager?
            </button>
        </div>
        <div class="formSection" id="ShareForm" v-show="!ShareFormHidden">
            <div class="please">
                <h2>Votre partage</h2>
            </div>
            <div class="formDiv">
                <form type="multipart/form-data" method="POST" name="form" id="ShareToBePosted" @submit="Share" class="formulaire">
                    <!--Le Media -->
                    <div class="formLine">
                        <label for="Media" class="label">Votre image, votre GIF</label>
                        <input
                            class="input"
                            style="padding: 0; margin-top: 5px"
                            form="ShareToBePosted"
                            @change="checkForm"
                            @input="uploadImage($event)"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/png, image/gif"
                            multiple
                            id="Media"
                            name="file"
                        />
                    </div>

                    <div id="formImagePreview">
                        <img id="formImageLoaded" v-if="this.file" :src="this.file" />
                        <!--la phrase suivante n'est à priori pas utile-->
                        <img id="formImageNotLoaded" v-else hidden />
                    </div>

                    <!--Le Share-->
                    <div class="formLine">
                        <label for="ShareText" class="label">Votre texte</label>
                        <AutoTextareaShare v-model="inputValue"></AutoTextareaShare>
                    </div>

                    <!-- A ÉTUDIER -->
                    <!-- https://css-tricks.com/auto-growing-inputs-textareas/ -->
                    <!-- https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php -->
                    <!-- https://www.skymac.org/Admin-Dev/article-5d6989e5-Astuce-HTML-Javascript-Creer-un-textarea-a-la-hauteur-auto-adaptative-1.htm -->

                    <div class="btn-div">
                        <button type="button" class="btn" @click="displayGoTo()" id="CancelBtn">Annuler</button>
                        <button type="button" @click="Share" class="btn" id="ShareBtn" disabled>Partager</button>
                    </div>
                </form>

                <div class="add-div" v-show="success === false">
                    <p id="erreur">Echec du partage : {{ message }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import AutoTextareaShare from "@/components/AutoTextareaShare.vue";
    export default {
        name: "PostAShare",
        components: { AutoTextareaShare },
        data() {
            return {
                success: "",
                message: "", //message d'erreur
                ShareText: {
                    type: String,
                    default: "No comment",
                },
                file: "",
                inputValue: "",
                ShareFormHidden: {
                    type: Boolean,
                    default: true,
                },
            };
        },
        methods: {
            displayForm() {
                this.ShareFormHidden = false;
            },
            displayGoTo() {
                this.ShareFormHidden = true;
                this.file = "";
                document.getElementById("ShareToBePosted").reset();
            },
            checkForm() {
                // if (document.getElementById("ShareText").value != "" || document.getElementById("formImagePreview").firstChild.id == 'formImageLoaded'
                if (document.getElementById("ShareText").value != "" || this.file != "") {
                    document.getElementById("ShareBtn").disabled = false;
                } else {
                    document.getElementById("ShareBtn").disabled = true;
                }
            },
            uploadImage($event) {
                this.file = URL.createObjectURL($event.target.files[0]);
            },
            Share() {
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const ShareToBePosted = document.getElementById("ShareToBePosted");

                const Body = new FormData(ShareToBePosted);

                fetch("http://localhost:3000/api/shares", {
                    method: "POST",
                    headers: {
                        Accept: "*/*",
                        // "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + Token,
                    },
                    body: Body,
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 201) {
                            this.success = true;
                            this.message = "Partage en ligne.";
                            this.ShareFormHidden = true;
                            this.$router.push({ name: "wall" });
                            // this.$router.go(0);
                            // history.go(0);
                        } else {
                            response.json().then((json) => {
                                this.success = false;
                                this.message = json.error || json.message;
                                return this.message;
                            });
                        }
                    })
                    .catch(() => {
                        this.success = false;
                        this.message = `Le serveur ne répond pas ! Veuillez réessayer ultérieurement`;
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    #ShareAccess {
        margin-top: 10px;
    }

    #formImagePreview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #formImagePreview img {
        max-width: 100%;
        max-height: 500px;
    }
</style>

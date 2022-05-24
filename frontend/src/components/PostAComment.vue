<template>
    <section class="container">
        <div class="btn-div" id="CommentAccess" v-show="CommentFormHidden">
            <button type="button" class="btn" @click="displayCommentForm()" id="GoToComment">Un commentaire ?</button>
        </div>
        <div class="formSection" id="CommentForm" v-show="!CommentFormHidden">
            <div class="formDiv">
                <form type="multipart/form-data" method="POST" name="form" @submit="Comment" id="CommentToBePosted" class="formulaire">
                    <!--Le Comment-->
                    <div class="formLine">
                        <label for="CommentText" class="label">Votre commentaire</label>
                        <textarea
                            id="CommentText"
                            class="bigtextarea textarea input"
                            form="CommentToBePosted"
                            type="textarea"
                            @keydown="checkCommentForm"
                            @input="checkCommentForm"
                            placeholder="..."
                            name="CommentText"
                        ></textarea>
                    </div>

                    <div class="btn-div">
                        <button type="button" class="btn" @click="displayGoTo()" id="CancelBtn">Annuler</button>
                        <input type="button" @click="Comment" class="btn" id="CommentBtn" value="Commenter" disabled />
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PostAComment",
        data() {
            return {
                success: "",
                message: "", //message d'erreur
                CommentText: String,
                CommentFormHidden: {
                    type: Boolean,
                    default: true,
                },
            };
        },

        methods: {
            displayCommentForm() {
                this.CommentFormHidden = false;
            },
            displayGoTo() {
                this.CommentFormHidden = true;
            },
            checkCommentForm() {
                const noblank = document.getElementById("CommentText").value.trim();
                if (noblank != "" && noblank.length > 2) {
                    document.getElementById("CommentBtn").disabled = false;
                } else {
                    document.getElementById("CommentBtn").disabled = true;
                }
            },
            Comment() {
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const CommentText = document.getElementById("CommentText").value.trim();
                const shareShareId = new URL(window.location.href).hash.split("=")[1];

                const Comment = { CommentText: CommentText, shareShareId: shareShareId };




                fetch("http://localhost:3000/api/comments", {
                    method: "POST",
                    body: JSON.stringify(Comment),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: "Bearer " + Token,
                    },
                })
                    .then((response) => {
                        if (response.status == 201) {
                            this.success = true;
                            this.message = "Commentaire en ligne.";
                            this.CommentFormHidden = true;
                            this.$router.push({ name: "wall" });
                            // la ligne suivante provoque des failed to fetch ( à creuser)
                            // this.$router.go(0);
                        } else {
                            response.json().then((json) => {
                                this.success = false;
                                console.log(json);
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

<template>
    <section class="container">
        <div class="btn-div" :id="`CommentOnACommentAccess-${commentid}`" v-show="CommentOnACommentFormHidden">
            <button type="button" class="btn btn__main" @click="displayCommentOnCommentForm()" :id="`GoToCommentOnAComment-${commentid}`">
                Une réaction ?
            </button>
        </div>
        <div class="formSection" :id="`CommentOnACommentForm-${commentid}`" v-show="!CommentOnACommentFormHidden">
            <div class="formDiv">
                <form
                    type="multipart/form-data"
                    method="POST"
                    name="form"
                    @submit="CommentOnAComment"
                    :id="`CommentOnAComment-${commentid}`"
                    class="formulaire"
                >
                    <!--Le Comment-->
                    <div class="formLine">
                        <label for="CommentOnACommentText" class="label">Votre réaction</label>

                        <textarea
                            :id="`CommentOnACommentText-${commentid}`"
                            class="bigtextarea textarea input"
                            form="CommentOnACommentText"
                            type="textarea"
                            @keydown="checkCommentOnCommentForm"
                            @input="checkCommentOnCommentForm"
                            placeholder="..."
                            name="CommentOnACommentText"
                        ></textarea>
                    </div>

                    <div class="btn-div">
                        <button type="button" class="btn" @click="displayGoTo()" :id="`CancelBtn-${commentid}`">Annuler</button>
                        <input
                            type="button"
                            @click="CommentOnAComment"
                            class="btn"
                            :id="`CommentOnACommentBtn-${commentid}`"
                            value="Réagir"
                            disabled
                        />
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PostACommentOnAComment",
        data() {
            return {
                success: "",
                message: "", //message d'erreur
                CommentOnACommentText: String,
                CommentOnACommentFormHidden: {
                    type: Boolean,
                    default: true,
                },
            };
        },
        // prop reçue du composant parent ShareAloneComments
        props: ["commentid"],

        methods: {
            displayCommentOnCommentForm() {
                this.CommentOnACommentFormHidden = false;
            },
            displayGoTo() {
                this.CommentOnACommentFormHidden = true;
                document.getElementById(`CommentOnAComment-${this.commentid}`).reset();
            },
            checkCommentOnCommentForm() {
                const noblank = document.getElementById(`CommentOnACommentText-${this.commentid}`).value.trim();
                if (noblank != "" && noblank.length > 2) {
                    document.getElementById(`CommentOnACommentBtn-${this.commentid}`).disabled = false;
                } else {
                    document.getElementById(`CommentOnACommentBtn-${this.commentid}`).disabled = true;
                }
            },
            CommentOnAComment() {
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const commentOnACommentText = document.getElementById(`CommentOnACommentText-${this.commentid}`).value;
                const shareShareId = new URL(window.location.href).hash.split("=")[1];

                const commentCommentId = this.commentid;

                const commentOnAComment = { CommentText: commentOnACommentText, shareShareId: shareShareId, commentCommentId: commentCommentId };

                fetch("http://localhost:3000/api/comments", {
                    method: "POST",
                    body: JSON.stringify(commentOnAComment),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: "Bearer " + Token,
                    },
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 201) {
                            this.success = true;
                            this.message = "Commentaire en ligne.";
                            this.CommentOnACommentFormHidden = true;
                            this.$router.push({ name: "wall" });
                            // la ligne suivante provoque des failed to fetch ( à creuser)
                            // this.$router.go(0);
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

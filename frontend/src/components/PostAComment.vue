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
                        <AutoTextareaComment v-model="inputValue"></AutoTextareaComment>
                    </div>

                    <div class="btn-div">
                        <button type="button" class="btn" @click="displayGoTo()" id="CancelBtn">Annuler</button>
                        <button type="button" @click="Comment" class="btn" id="CommentBtn" disabled>Commenter</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import AutoTextareaComment from "@/components/AutoTextareaComment.vue";

    export default {
        name: "PostAComment",
        components: { AutoTextareaComment },
        data() {
            return {
                success: "",
                message: "", //message d'erreur
                CommentText: String,
                CommentFormHidden: {
                    type: Boolean,
                    default: true,
                },
                inputValue: "",
                Token: JSON.parse(sessionStorage.getItem("Token")),
                ShareId: new URL(window.location.href).hash.split("/wallAlone/")[1],
            };
        },

        methods: {
            displayCommentForm() {
                this.CommentFormHidden = false;
            },
            displayGoTo() {
                this.CommentFormHidden = true;
                document.getElementById("CommentToBePosted").reset();
            },

            //--TENTATIVE DE RELOAD (cf. Comment())
            // displayOneShare(id) {
            //     this.$router.push({ name: "wallAlone", params: { id: id } });
            // },

            Comment() {
                const CommentText = document.getElementById("CommentText").value.trim();
                const Comment = { CommentText: CommentText, shareShareId: this.ShareId };

                fetch("http://localhost:3000/api/comments", {
                    method: "POST",
                    body: JSON.stringify(Comment),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: "Bearer " + this.Token,
                    },
                })
                    .then(() => {
                        this.success = true;
                        this.message = "Commentaire en ligne.";
                        this.CommentFormHidden = true;

                        this.$emit('refreshShare');
                        this.$router.go(0);
                            // history.go(0);

                        // setTimeout(() => this.$router.push({ name: "wall" }), 1000);


                        // TENTATIVES DIVERSES
                        // window.location.reload();
                        // this.displayOneShare(`${this.ShareId}`)
                        // this.$router.push({ name: "wallAlone", id: this.ShareId });
                        // this.$router.go({ name: "wallAlone", params :{id : shareShareId} });
                        // this.$router.push({ name: "wallAlone", params: { id: this.ShareId } });
                        // this.$router.push({ name: "wallAlone", params: { id: `${this.ShareId}` } });
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

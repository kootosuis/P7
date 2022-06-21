<template>
    <section class="mainshares shares">
        <div class="card" id="shareAloneComments">
            <div
                v-for="item in apiCommentsResponse"
                v-bind:id="`commentDiv-${item.CommentId}`"
                :key="item.shareShareId"
                class="card card__info card__info--2"
            >
                <!--- le commentaire original -->
                <div style="display: inline-block" :id="`OriginalCommentText-${item.CommentId}`">
                    <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                </div>

                <!--- un formulaire contenant le commentaire original, à modifier-->
                <div style="display: none" class="formSection" :id="`CommentForm-${item.CommentId}`">
                    <div class="formDiv">
                        <form
                            type="multipart/form-data"
                            method="PUT"
                            name="form"
                            :id="`CommentToBeCorrected-${item.CommentId}`"
                            class="formulaire"
                            @submit="correctComment(item.CommentId)"
                        >
                            <!--La ligne de formulaire correspondant au commentaire-->
                            <div class="formLine">
                                <label for="CommentToBeCorrectedText" class="label">Votre commentaire</label>
                                <textarea
                                    class="bigtextarea textarea input"
                                    form="CommentToBeCorrected"
                                    type="textarea"
                                    :id="`CommentToBeCorrectedText-${item.CommentId}`"
                                    name="CommentToBeCorrectedText"
                                    v-model="item.CommentText"
                                    placeholder="..."
                                ></textarea>
                            </div>
                            <!--Les boutons permettant d'annuler ou de confirmer la modification-->
                            <div class="btn-div">
                                <button type="button" class="btn" @click="doNotModify(item.CommentId)" :id="`CancelBtn-${item.CommentId}`">
                                    Annuler
                                </button>
                                <button type="button" class="btn" @click="correctComment(item.CommentId)" :id="`CommentBtn-${item.CommentId}`">
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!--- un séparateur -->
                <div class="separator"></div>

                <!--- les informations sur l'auteur du commentaire -->
                <div class="card__info--complement">
                    <div>
                        <p>{{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p>
                        <p>{{ formatDate(item.updatedAt) }}</p>
                    </div>
                </div>

                <!--- les boutons qui permettent à l'auteur du commentaire (ou à un admin) de le corriger ou de l'effacer-->
                <div class="btn-div" v-show="modifying">
                    <button
                        v-if="item.user.UserEmail === this.loggedUserEmail || isAdmin == 1"
                        type="button"
                        class="btn"
                        @click="modifyComment(item.CommentId)"
                        :id="`modifyCommentBtn-${item.CommentId}`"
                    >
                        Corriger
                    </button>
                    <button
                        v-if="item.user.UserEmail === this.loggedUserEmail || isAdmin == 1"
                        type="button"
                        class="btn"
                        @click="deleteComment(item.CommentId)"
                        :id="`deleteCommentBtn-${item.CommentId}`"
                    >
                        Effacer
                    </button>
                </div>

                <!--le CommentId sert à identifier de manière unique les id des templates du composant PostACommentOnAComment-->
                <PostACommentOnAComment v-show="item.user.UserEmail != loggedUserEmail" v-bind:commentid="item.CommentId" />
                <ShareAloneReactions
                    v-if="apiReactionsResponse.find((x) => x.commentCommentId === item.CommentId)"
                    v-bind:commentcommentid="item.CommentId"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import PostACommentOnAComment from "@/components/PostACommentOnAComment.vue";
    import ShareAloneReactions from "@/components/ShareAloneReactions.vue";

    import dayjs from "dayjs";
    require("dayjs/locale/fr");
    dayjs.locale("fr");

    export default {
        name: "ShareAloneComments",
        components: {
            PostACommentOnAComment,
            ShareAloneReactions,
        },

        props: ["shareid"],

        data() {
            return {
                loggedUserEmail: "",
                apiCommentsResponse: Array,
                apiReactionsResponse: Array,
                apiLengthComments: Number,
                apiLengthReactions: Number,

                // data envoyée au composant enfant dans la déclaration du composant PostACommentOnAComment

                modifying: {
                    type: Boolean,
                    default: false,
                },

                isAdmin: "",
            };
        },

        methods: {
            formatDate(dateString) {
                const date = dayjs(dateString);
                return date.format("dddd D MMMM YYYY , HH:mm");
            },
            modifyComment(i) {
                document.getElementById(`OriginalCommentText-` + i).style = "display:none";
                document.getElementById(`CommentForm-` + i).style = "display:inline-block";
                this.modifying = false;
            },
            doNotModify(i) {
                document.getElementById(`CommentForm-` + i).style = "display:none";
                document.getElementById(`CommentToBeCorrected-` + i).reset();
                document.getElementById(`OriginalCommentText-` + i).style = "display:inline-block";
                this.modifying = true;
            },
            correctComment(i) {
                const CommentToBeCorrected = document.getElementById(`CommentToBeCorrectedText-` + i).value;
                const CommentId = i;
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const Modify = {
                    CommentId: CommentId,
                    CommentText: CommentToBeCorrected,
                };

                //--- TEST ---- ///
                // for(var pair of Modify.entries()) {
                //   console.log(pair[0]+ ', '+ pair[1]);
                // }

                fetch(`http://localhost:3000/api/comments/${CommentId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + Token,
                    },
                    body: JSON.stringify(Modify),
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 201) {
                            this.success = true;
                            this.message = "Correction effectuée.";
                            this.modifyForm = true;
                            this.$router.push({ name: "wall" });
                            // this.$router.push({ name: "wallAlone", params: { id: "shareid" } });
                            // this.$router.go(0);
                            // history.go(0);
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
            deleteComment(i) {
                const Token = JSON.parse(sessionStorage.getItem("Token"));

                const CommentId = i;
                const Comment = {
                    CommentId: CommentId,
                };

                const deleteComment = confirm("Le commentaire et tous les commentaires associés vont être effacés");

                if (deleteComment) {
                    fetch(`http://localhost:3000/api/comments/${CommentId}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                        body: JSON.stringify(Comment),
                        mode: "cors",
                    })
                        
                        
                        .then(() => {
                            setTimeout(() => this.$router.push({ name: "wall" }), 1000);
                            //---TENTATIVES
                            // setTimeout(() => this.$router.push({ name: "wallAlone", params: { id: this.shareid } }), 1000);
                            // this.$router.go(0);
                        })
                        .catch((error) => {
                            alert(error);
                        });
                } else {
                    this.$router.push({ name: "wall" });
                    // this.$router.go(0);
                }
            },
        },

        mounted() {
            const Token = JSON.parse(sessionStorage.getItem("Token"));
            const loggedUserEmail = JSON.parse(sessionStorage.getItem("UserEmail"));
            const ShareId = new URL(window.location.href).hash.split("/wallAlone/")[1];

            // ISADMIN
            fetch(`http://localhost:3000/api/auth/${loggedUserEmail}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    this.isAdmin = res.UserHabilitation;
                })
                .catch((error) => {
                    alert(error);
                });

            // LES COMMENTAIRES
            fetch(`http://localhost:3000/api/comments/${ShareId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    this.loggedUserEmail = loggedUserEmail;

                    this.apiCommentsResponse = res.filter((item) => item.commentCommentId === null);
                    this.apiReactionsResponse = res.filter((item) => item.commentCommentId != null);

                    this.apiLengthComments = this.apiCommentsResponse.length;
                    this.apiLengthReactions = this.apiReactionsResponse.length;

                    this.CommentId = res.CommentId;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    };
</script>

<style lang="scss" scoped></style>

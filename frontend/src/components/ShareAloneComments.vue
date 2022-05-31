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
                <div v-show="modifyCommentBox" :id="`OriginalCommentText-${item.CommentId}`">
                    <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                </div>

                <!--- un formulaire contenant le commentaire original, à modifier-->
                <div v-show="!modifyCommentBox" class="formSection" :id="`CommentForm-${item.CommentId}`">
                    <div class="formDiv">
                        <form
                            type="multipart/form-data"
                            method="PUT"
                            name="form"
                            :id="`CommentToBeCorrectedForm-${item.CommentId}`"
                            class="formulaire"
                        >
                            <!--La ligne de formulaire correspondant au commentaire-->
                            <div class="formLine">
                                <label for="CommentToBeCorrectedText" class="label">Votre commentaire</label>
                                <textarea
                                    class="bigtextarea textarea input"
                                    form="CommentToBeCorrected"
                                    type="textarea"
                                    v-model="item.CommentText"
                                    placeholder="..."
                                    :id="`CommentToBeCorrectedText-${item.CommentId}`"
                                    name="CommentToBeCorrectedText"
                                ></textarea>
                            </div>
                            <!--Les boutons permettant d'annuler ou de confirmer la modification-->
                            <div class="btn-div">
                                <button type="button" class="btn" @click="doNotModify()" :id="`CancelBtn-${item.CommentId}`">Annuler</button>
                                <input type="button" class="btn" @click="correctComment()" :id="`CommentBtn-${item.CommentId}`" value="Confirmer" />
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
                        <!-- ajouter hidden qd composant au point-->
                        <p>{{ item.CommentId }}</p>
                    </div>
                </div>

                <!--- les boutons qui permettent à l'auteur du commentaire (ou à un admin) de le corriger ou de l'effacer-->
                <div class="btn-div" v-show="modifying">
                    <button
                        v-if="item.userUserId === this.loggedUserId || isAdmin == 1"
                        type="button"
                        class="btn"
                        @click="modifyComment()"
                        :id="`modifyCommentBtn-${item.CommentId}`"
                    >
                        Corriger
                    </button>
                    <button
                        v-if="item.userUserId === this.loggedUserId || isAdmin == 1"
                        type="button"
                        class="btn"
                        @click="deleteComment()"
                        :id="`deleteCommentBtn${item.CommentId}`"
                    >
                        Effacer
                    </button>
                </div>

                <!--le CommentId sert à identifier de manière unique les id des templates du composant PostACommentOnAComment-->
                <!-- <p id="CommentId">{{ item.CommentId }}</p> -->
                <PostACommentOnAComment v-show="item.userUserId != loggedUserId" v-bind:commentid="item.CommentId" />
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
                loggedUserId: "",
                apiCommentsResponse: Array,
                apiReactionsResponse: Array,
                apiLengthComments: Number,
                apiLengthReactions: Number,

                // data envoyée au composant enfant dans la déclaration du composant PostACommentOnAComment

                modifyCommentBox: {
                    type: Boolean,
                    default: true,
                },

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
                // Then specify how you want your dates to be formatted
                return date.format("dddd D MMMM YYYY , HH:mm");
            },

            modifyComment() {
                // this.modifyCommentBox = false;
                document.getElementById(`CommentToBeCorrectedForm-${this.CommentId}`).hidden = true;
                // this.modifying = false;
            },
            doNotModify() {
                // this.modifyCommentBox = true;
                document.getElementById(`CommentToBeCorrectedForm-${this.CommentId}`).hidden = false;
                document.getElementById(`CommentToBeCorrectedForm-${this.CommentId}`).reset();
                // this.modifying = true;
            },

            correctComment() {
                const CommentToBeCorrected = document.getElementById(`CommentToBeCorrectedForm-${this.CommentId}`);
                const CommentId = document.getElementById(`CommentId-${this.CommentId}`).outerText;

                const Token = JSON.parse(sessionStorage.getItem("Token"));
                const Modify = new FormData(CommentToBeCorrected);

                Modify.append("CommentId", CommentId);

                //--- TEST ---- ///
                // for(var pair of Modify.entries()) {
                //   console.log(pair[0]+ ', '+ pair[1]);
                // }

                fetch(`http://localhost:3000/api/comments/${CommentId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + Token,
                    },
                    body: Modify,
                    mode: "cors",
                })
                    .then((response) => {
                        if (response.status == 201) {
                            this.success = true;
                            this.message = "Correction effectuée.";
                            this.modifyForm = true;
                            this.$router.push({ name: "wall" });
                            this.$router.go(0);
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
            deleteComment() {
                const Token = JSON.parse(sessionStorage.getItem("Token"));
                // const loggedUserId=JSON.parse(sessionStorage.getItem("UserId"))
                const CommentId = document.getElementById(`CommentOnACommentId-${this.CommentId}`).textContent;
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
                            alert("Commentaire effacé !");
                            setTimeout(this.$router.push({ name: "wall" }), 3000);
                            this.$router.go(0);
                        })
                        .catch((error) => {
                            alert(error);
                        });
                } else {
                    this.$router.push({ name: "wall" });
                    this.$router.go(0);
                }
            },
        },

        beforeMount() {
            const Token = JSON.parse(sessionStorage.getItem("Token"));
            const loggedUserId = JSON.parse(sessionStorage.getItem("UserId"));
            const ShareId = new URL(window.location.href).hash.split("=")[1];

            this.isAdmin = sessionStorage.getItem("isAdmin");

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
                    this.loggedUserId = loggedUserId;
                    this.apiCommentsResponse = res.filter((item) => item.commentCommentId === null);
                    this.apiReactionsResponse = res.filter((item) => item.commentCommentId != null);

                    this.apiLengthComments = this.apiCommentsResponse.length;
                    this.apiLengthReactions = this.apiReactionsResponse.length;

                    // const apiReactionsResponse = this.apiReactionsResponse;
                    // apiReactionsResponse.forEach((item) => document.getElementById(`OriginalCommentText-${item.CommentId}`).insertAdjacentHTML("afterend", "<div id=`OriginalCommentText-${item.commentCommentId}`>TOTO</div>"));

                    // apiReactionsResponse.forEach(
                    //     (item) => console.log(item.CommentId),
                    //     (item) => console.log(document.getElementById(`OriginalCommentText-${item.commentCommentId}`)),
                    //     (item) => document.getElementById(`OriginalCommentText-${item.commentCommentId}`).insertAdjacentHTML("afterend", "<div id=`OriginalCommentText-${item.commentCommentId}`>TOTO</div>")
                    // );

                    // apiReactionsResponse.forEach((item) => console.log(document.getElementById(`OriginalCommentText-${item.commentCommentId}`)));

                    this.CommentId = res.CommentId;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    };
</script>

<style lang="scss" scoped></style>

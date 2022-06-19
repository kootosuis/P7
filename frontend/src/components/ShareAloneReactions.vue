<template>
    <section class="mainshares shares">
        <div class="card" id="shareAloneReactions">
            <div
                v-for="item in apiReactionsResponse"
                v-show="item.commentCommentId == this.commentcommentid"
                v-bind:id="`commentDiv-${item.CommentId}`"
                :key="item.shareShareId"
                class="card card__info card__info--2"
            >
                <!--- la réaction -->
                <div :id="`OriginalReactionText-${item.CommentId}`">
                    <p class="card__info--text card__info--sharetext">{{ item.CommentText }}</p>
                </div>

                <!--- un séparateur -->
                <div class="separator"></div>

                <!--- les informations sur l'auteur de la réaction -->
                <div class="card__info--complement">
                    <div>
                        <p>{{ item.user.UserFirstname }} {{ item.user.UserName }} / {{ item.user.UserDepartement }} / {{ item.user.UserRole }}</p>
                        <p>{{ formatDate(item.updatedAt) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import dayjs from "dayjs";
    require("dayjs/locale/fr");
    dayjs.locale("fr");

    export default {
        name: "ShareAloneReactions",
        components: {},

        props: ["commentcommentid"],

        data() {
            return {
                // loggedUserId: "",
                apiReactionsResponse: Array,
                isAdmin: "", // ici cela ne sert à rien sauf si un jour on implémente une possibilité de corriger ou d'effacer une réaction
            };
        },

        methods: {
            formatDate(dateString) {
                const date = dayjs(dateString);
                return date.format("dddd D MMMM YYYY , HH:mm");
            },
        },

        mounted() {
            const Token = JSON.parse(sessionStorage.getItem("Token"));
            const loggedUserEmail = JSON.parse(sessionStorage.getItem("loggedUserEmail"));
            const ShareId = new URL(window.location.href).hash.split("=")[1];

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

            fetch(`http://localhost:3000/api/comments/${ShareId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    // this.loggedUserId = loggedUserId;
                    this.apiReactionsResponse = res.filter((item) => item.commentCommentId != null);

                    this.apiLengthReactions = this.apiReactionsResponse.length;
                    this.CommentId = res.CommentId;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    };
</script>

<style lang="scss" scoped>
    .card {
        background-color: #e5dada;
    }
</style>

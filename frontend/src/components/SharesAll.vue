<template>
    <section class="mainshares">
        <div id="shares" class="shares">
            <a id="link" v-for="item in apiResponse" :key="item.ShareId" @click="displayOneShare(item.ShareId)">
                <div class="card">
                    <div class="card__image">
                        <div class="card__image--img">
                            <img v-if="item.medium.MediaUrl.split(`/07media/`)[1] != `feather.png`" :src="item.medium.MediaUrl" />
                            <img v-else style="width: 30px" :src="item.medium.MediaUrl" />
                        </div>
                    </div>

                    <div class="card__info">
                        <div v-if="item.medium.MediaUrl.split(`/07media/`)[1] == `feather.png`">
                            <p class="card__info--text textLimited" style="height: 150px">{{ item.ShareText }}</p>
                        </div>
                        <div v-else>
                            <p class="card__info--text textLimited">{{ item.ShareText }}</p>
                        </div>
                        <div class="readMore" @click="displayOneShare(item.ShareId)">En savoir plus...</div>

                        <div class="separator"></div>

                        <div class="card__info--complement">
                            <div class="card__info--complement--adress">
                                <p>{{ item.user.UserFirstname }} {{ item.user.UserName }}</p>
                                <p>
                                    Service : {{ item.user.UserDepartement }} <br />
                                    Rôle : {{ item.user.UserRole }}
                                </p>
                                <p hidden>{{ item.userUserId }}</p>
                                <p>{{ item.comments.length }} commentaire<span v-if="item.comments.length > 1">s</span></p>
                                <p>{{ formatDate(item.updatedAt) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </section>
</template>

<script>
    import dayjs from "dayjs";
    require("dayjs/locale/fr");
    dayjs.locale("fr");

    export default {
        name: "ShareAll",

        data() {
            return {
                apiResponse: Array,
                commentLength: Number,
            };
        },

        methods: {
            displayOneShare(i) {
                this.$router.push({ name: "wallAlone", params: { id: i } });
            },

            formatDate(dateString) {
                const date = dayjs(dateString);
                return date.format("dddd D MMMM YYYY , HH:mm");
            },
        },

        mounted() {
            const Token = JSON.parse(sessionStorage.getItem("Token"));

            fetch(`http://localhost:3000/api/shares`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    console.log(res);
                    return res.json();
                })
                .then((res) => {

                    // JE GARDE TRACE DE CETTE REFELEXIN
                    // MAIS LE MIEUX SERAIT DE PASSER PAR LE BACKEND OU MÊME U NIVEAU DE LA DATABASE (à travailler)
                    // ici il faut pour chaque item
                    // regarder s'il y a un comment
                    // et s'il y a un comment prendre la date de l'update
                    // et la pusher dans apiResponse
                    // qu'il s'agira alors de trier sur ce critère :

                    // const unsortedArray = res

                    // for each item in res
                    // if item.updatedAt < ???(pas sûr de mon coup, là) n'importe lequel ??? item.comments.updatedAt
                    // alors const lastUpdatedAt = item.comments.updatedAt
                    // et
                    // push lastUpdatedAt dans unsortedArray > updatedAt
                    // là où ShareId = item.ShareId
                    // puis tri
                    // const sortedArray = methode de tri (unsortedArray, updatedAt)

                    // this Apiresponse = unsortedArray

                    this.apiResponse = res;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    };
</script>

<style lang="scss" scoped>
    .readMore {
        text-align: right;
        font-style: italic;
        font-size: 13px;
    }
    .textLimited {
        max-height: 95px;
        max-width: 320px;
        overflow: hidden;
        text-overflow: ellipsis; // cela ne marche que si le texte n'est que sur une ligne : chercher une solution
        margin: 0.5rem;
    }

    .card__image img {
        width: 320px;
    }

    #line {
        margin: 2rem 0;
        display: flex;
        height: 2px;
        border: solid 1px #40cbc4;
    }
</style>

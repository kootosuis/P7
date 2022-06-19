<template>
    <section class="mainshares">
        <div id="shares" class="shares">
            <a id="link" v-for="item in apiResponse" :key="item.UserId" @click="displayOneUser(item.UserEmail)">
                <div class="card">
                    <div class="card__info">
                        <div class="card__info--complement">
                            <div class="card__info--complement--adress">
                                <p>Prénom : {{ item.UserFirstname }}</p>
                                <p>Nom : {{ item.UserName }}</p>
                                <p>Service : {{ item.UserDepartement }}</p>

                                <p>Rôle : {{ item.UserRole }}</p>
                                <p>Membre depuis : {{ formatDate(item.createdAt) }} .</p>
                                <p>Compte mis à jour le : {{ formatDate(item.updatedAt) }} .</p>
                                <p>Email : {{ item.UserEmail }} .</p>
                                <p>
                                    Administrateur : <span v-if="item.UserHabilitation == 1">OUI</span>
                                    <span v-if="item.UserHabilitation == 0">NON</span>
                                </p>
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
        name: "UsersListComp",

        data() {
            return {
                apiResponse: Array,
            };
        },

        methods: {
            displayOneUser(id) {
                this.$router.push({ name: "modifyByAdmin", params: { id: id } });
            },

            formatDate(dateString) {
                const date = dayjs(dateString);
                return date.format("dddd D MMMM YYYY , HH:mm");
            },
        },

        mounted() {
            const Token = JSON.parse(sessionStorage.getItem("Token"));
             
            fetch(`http://localhost:3000/api/auth`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + Token },
                mode: "cors",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log(res)
                    this.apiResponse = res;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    };
</script>

<style lang="scss" scoped></style>

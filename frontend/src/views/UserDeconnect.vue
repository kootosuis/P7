<template>
    <div class="entrée">
        <UserDeconnectComp 
        aurevoir="Au revoir et à bientôt sur LeRezo, le réseau social de Groupomania" />
    </div>
</template>


<script>
    import UserDeconnectComp from "@/components/UserDeconnectComp.vue";

    export default {
        name: "UserDeconnect",
        components: {
            UserDeconnectComp,
        },
    };
</script>

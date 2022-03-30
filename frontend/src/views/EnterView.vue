<template>
    <div class="entrée">
        <EnterComp avertissement_titre= "Attention"
        avertissement_texte= "L'usage de ce réseau est strictement réservé aux membres des équipes de Groupomania"
        bienvenue="Bienvenue sur LeRezo, le réseau social de Groupomania" />
    </div>
</template>

<script>
    import EnterComp from "@/components/EnterComp.vue";

    export default {
        name: "EnterView",
        components: {
            EnterComp,
        },
    };
</script>

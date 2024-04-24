<template>
    <div class="titulo-pagina">
        <h1>{{ titulo }}</h1>
        <router-link v-if="link" :to="link" class="titulo-pagina-button">
            <i class="fa-solid fa-circle-arrow-left"></i>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    titulo: String,
    link: String
})
</script>

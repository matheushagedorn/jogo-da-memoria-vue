<template>
  <div class="menu-principal">
    <div class="menu-principal-form">
      <h1>Desafio MemórIA</h1>
      <img src="@/assets/img/brain.png" />
      <router-link to="game"><button>Jogar</button></router-link>
      <router-link to="como-jogar"><button>Como jogar</button></router-link>
      <router-link to="creditos"><button>Créditos</button></router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()

onMounted(() => {
  router.push('/menu-principal')
});
</script>

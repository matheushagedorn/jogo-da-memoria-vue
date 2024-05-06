<template>
  <div class="menu-principal">
      <div class="menu-principal-form">
        <h1>Desafio MemórIA</h1>
        <img src="@/assets/img/brain.png" />
        <button @click="abreModal">Jogar</button>
        <router-link to="como-jogar"><button>Como jogar</button></router-link>
        <router-link to="creditos"><button>Créditos</button></router-link>
      </div>
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <span class="fecha" @click.stop="fechaModal">X</span>
          <input
            type="text"
            v-model="playerName"
            placeholder="Digite seu nome"
          />
          <button @click="startGame">Iniciar</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showModal = ref(false);
const playerName = ref("");

onMounted(() => {
  showModal.value = false;
});

const abreModal = () => {
  showModal.value = true;
};

const fechaModal = () => {
  showModal.value = false;
};

const startGame = () => {
  console.log("Iniciar o jogo com o nome:", playerName.value);
  router.push({ name: "game", params: { playerName: playerName.value } });
};
</script>

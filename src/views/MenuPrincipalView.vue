<template>
  <div class="menu-principal">
    <div class="menu-principal-form">
      <h1>Desafio MemórIA</h1>
      <img src="@/assets/img/brain.png" />
      <button @click="openGameModal">Jogar</button>
      <router-link to="como-jogar"><button>Como jogar</button></router-link>
      <router-link to="creditos"><button>Créditos</button></router-link>
    </div>
  </div>
</template>

<script setup>
import { useModal } from '@kolirt/vue-modal';

const { openModal, closeModal } = useModal();

const openGameModal = () => {
  openModal('game-modal');
};

</script>

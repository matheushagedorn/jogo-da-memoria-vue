<template>
  <div class="game">
    <div class="game-container">
      <TituloPagina titulo="Jogar" link="/menu-principal" />
      <button @click="resetarJogo" class="game-container-reset">Resetar</button>
      <div class="game-container-player">
      <div class="game-container-player-1"></div>
      <div class="game-container-player-2"></div>
    </div>
      <div class="game-container-cards">
        <button
          v-for="(carta, index) in cartas"
          :key="index"
          class="game-container-cards-item"
          @click="viraCarta(index)"
        >
          <img
            v-if="carta.virada"
            :src="carta.imagem"
            width="64px"
            height="64px"
            :alt="`carta_${index}`"
          />
          <span v-else>?</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
import { ref } from "vue";

const imagens = [
  "https://cdn3.emoji.gg/emojis/9071-joe-stare.png",
  "https://cdn3.emoji.gg/emojis/2618-joeangry.png",
  "https://cdn3.emoji.gg/emojis/6683-joe-shrug.png",
  "https://cdn3.emoji.gg/emojis/6295-joe-waiting.png",
  "https://cdn3.emoji.gg/emojis/2401-joe-pray.png",
  "https://cdn3.emoji.gg/emojis/7714-yellowguy-bicycle.png",
  "https://cdn3.emoji.gg/emojis/3323-joenerd.png",
  "https://cdn3.emoji.gg/emojis/7071-joe-devious.png",
  "https://cdn3.emoji.gg/emojis/6676-sadjoe.png",
  "https://cdn3.emoji.gg/emojis/4631-joe-chef.png",
  "https://cdn3.emoji.gg/emojis/8332-joe-disgust.png",
  "https://cdn3.emoji.gg/emojis/1088-joe-mischievous.png",
];

const NUMERO_DE_CARTAS = 12;

// Embaralha as imagens
imagens.sort(() => Math.random() - 0.5);

// Duplica as imagens para formar os pares
const paresDeImagens = imagens.concat(imagens);

// Embaralha os pares de imagens
paresDeImagens.sort(() => Math.random() - 0.5);

// Cria as cartas usando os pares de imagens embaralhados
const cartas = ref(
  paresDeImagens.map((imagem, index) => ({ virada: false, imagem }))
);

// Variáveis para armazenar as cartas viradas atualmente
let cartaViradaIndex = null;
let segundaCartaViradaIndex = null;

function viraCarta(index) {
  // Verifica se a carta já está virada ou se já foi encontrada
  if (cartas.value[index].virada || segundaCartaViradaIndex !== null) {
    return;
  }

  // Virar a carta
  cartas.value[index].virada = true;

  if (cartaViradaIndex === null) {
    // Primeira carta virada
    cartaViradaIndex = index;
  } else {
    // Segunda carta virada
    segundaCartaViradaIndex = index;
    // Verifica se as cartas viradas correspondem
    if (
      cartas.value[cartaViradaIndex].imagem ===
      cartas.value[segundaCartaViradaIndex].imagem
    ) {
      // Se forem iguais, as cartas permanecem viradas
      cartaViradaIndex = null;
      segundaCartaViradaIndex = null;
    } else {
      // Se forem diferentes, as cartas são viradas novamente após um curto intervalo
      setTimeout(() => {
        cartas.value[cartaViradaIndex].virada = false;
        cartas.value[segundaCartaViradaIndex].virada = false;
        cartaViradaIndex = null;
        segundaCartaViradaIndex = null;
      }, 1000);
    }
  }
}

function resetarJogo() {
  // Embaralha as imagens novamente
  imagens.sort(() => Math.random() - 0.5);
  const paresDeImagens = imagens.concat(imagens);
  paresDeImagens.sort(() => Math.random() - 0.5);

  // Reseta o estado das cartas
  cartas.value.forEach((carta) => {
    carta.virada = false;
  });

  // Reseta as variáveis de controle
  cartaViradaIndex = null;
  segundaCartaViradaIndex = null;
}
</script>

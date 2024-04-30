<template>
  <div class="game">
    <div class="game-container">
      <TituloPagina titulo="Jogar" link="/menu-principal" class="game-container-title"/>
      <button @click="resetarJogo" class="game-container-reset">Resetar</button>
      <div class="game-container-player">
        <div class="game-container-player-pontuacao">Pontuação</div>
        <div class="game-container-player-i">
          Jogador:  {{ pontuacaoJogador }}
          <div class="game-container-player-i-turno">
            <p>{{ turnoJogador ? "É a sua vez de jogar!" : "Aguarde sua vez..." }}</p>
          </div>
        </div>
        <p class="game-container-player-vs">VS.</p>
        <div class="game-container-player-ii">
          IA:   {{ pontuacaoIA }}
          <div class="game-container-player-ii-turno">
            <p>{{ !turnoJogador ? "É a sua vez de jogar!" : "Aguarde sua vez..." }}</p>
          </div>
        </div>
      </div>
      <div class="game-container-cards">
        <button
          v-for="(carta, index) in cartas"
          :key="index"
          class="game-container-cards-item"
          @click="turnoJogador ? viraCarta(index) : null"
          :style="{ cursor: turnoJogador ? 'pointer' : 'not-allowed' }"
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
  "src/assets/img/ambulancia.png",
  "src/assets/img/automovel.png",
  "src/assets/img/caminhao-de-entrega.png",
  "src/assets/img/caminhao-de-reciclagem.png",
  "src/assets/img/caminhao-guindaste.png",
  "src/assets/img/caminhao-tanque.png",
  "src/assets/img/carro-de-policia.png",
  "src/assets/img/carro.png",
  "src/assets/img/empilhadeira.png",
  "src/assets/img/mini-onibus.png",
  "src/assets/img/onibus-escolar.png",
  "src/assets/img/suv.png",
];

const NUMERO_DE_CARTAS = 12;

let cartaViradaIndex = null;
let segundaCartaViradaIndex = null;
let memoriaCartas = ref({});

const pontuacaoJogador = ref(0);
const pontuacaoIA = ref(0);
const turnoJogador = ref(true);

const cartas = ref([]);
let turnoInicialDecidido = false;
let paresDeImagens = [];

function iniciarNovoJogo() {
  imagens.sort(() => Math.random() - 0.5);
  paresDeImagens = imagens.concat(imagens);
  paresDeImagens.sort(() => Math.random() - 0.5);
  pontuacaoJogador.value = 0;
  pontuacaoIA.value = 0;

  // Decidir aleatoriamente quem começará jogando
  turnoJogador.value = Math.random() < 0.5;

  // Restaurar as cartas para o estado inicial
  cartas.value = paresDeImagens.map((imagem, index) => ({ virada: false, imagem }));

  cartaViradaIndex = null;
  segundaCartaViradaIndex = null;
  memoriaCartas = {};

  // Se a IA começar, fazer a primeira jogada
  if (!turnoJogador.value) {
    setTimeout(() => {
      jogadaIA();
    }, 1000);
  }

  turnoInicialDecidido = true;
}

function resetarJogo() {
  iniciarNovoJogo();
}

function viraCarta(index) {
  if (cartas.value[index].virada || segundaCartaViradaIndex !== null) {
    return;
  }

  cartas.value[index].virada = true;

  if (cartaViradaIndex === null) {
    cartaViradaIndex = index;
  } else {
    segundaCartaViradaIndex = index;
    if (
      cartas.value[cartaViradaIndex].imagem ===
      cartas.value[segundaCartaViradaIndex].imagem
    ) {
      // Se formar um par, atualiza a pontuação e remove as cartas da lista de cartas disponíveis
      if (turnoJogador.value) {
        pontuacaoJogador.value += 1;
      } else {
        pontuacaoIA.value += 1;
        // Remove as cartas combinadas do array cartas e paresDeImagens
        const index1 = Math.min(cartaViradaIndex, segundaCartaViradaIndex);
        const index2 = Math.max(cartaViradaIndex, segundaCartaViradaIndex);
        cartas.value.splice(index2, 1);
        cartas.value.splice(index1, 1);
        paresDeImagens.splice(index2, 1);
        paresDeImagens.splice(index1, 1);
      }
      cartaViradaIndex = null;
      segundaCartaViradaIndex = null;
    } else {
      // Se as cartas não formarem um par, desvira e atualiza a vez
      setTimeout(() => {
        cartas.value[cartaViradaIndex].virada = false;
        cartas.value[segundaCartaViradaIndex].virada = false;
        cartaViradaIndex = null;
        segundaCartaViradaIndex = null;
        if (turnoJogador.value) {
          turnoJogador.value = false;
          setTimeout(() => {
            jogadaIA();
          }, 1000);
        } else {
          turnoJogador.value = true;
        }
      }, 1000);
    }
  }
  // Memoriza cartas viradas pela IA
  if (!turnoJogador.value) {
    memoriaCartas[index] = true;
  }
}

function jogadaIA() {
  if (!turnoJogador.value) {
    console.log("IA está jogando...");
    const cartasDisponiveis = cartas.value
      .map((_, index) => index)
      .filter(index => cartas.value[index].virada && !memoriaCartas.value[index]);

    console.log("Cartas disponíveis para a IA:", cartasDisponiveis);
    if (cartasDisponiveis.length >= 1) {
      const indiceAleatorio = escolherAleatoriamente(cartasDisponiveis, 1)[0];
      memoriaCartas.value[indiceAleatorio] = true; // Memoriza a carta virada pela IA
      setTimeout(() => {
        viraCarta(indiceAleatorio);
      }, 500);
    }
  }
}




function escolherAleatoriamente(array, quantidade) {
  const indicesEmbaralhados = array.map((_, index) => index).sort(() => Math.random() - 0.5);
  return indicesEmbaralhados.slice(0, quantidade);
}

if (!turnoInicialDecidido) {
  iniciarNovoJogo();
}
</script>

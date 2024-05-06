<template>
  <div class="game">
    <div class="game-container">
      <TituloPagina
        titulo="Jogar"
        link="/menu-principal"
        class="game-container-title"
      />
      <button @click="resetarJogo" class="game-container-reset">Resetar</button>
      <div class="game-container-player">
        <div class="game-container-player-pontuacao">Pontuação</div>
        <div class="game-container-player-i">
          {{ playerName }}: {{ pontuacaoJogador }}
          <div class="game-container-player-i-turno">
            <p>
              {{
                turnoJogador ? "É a sua vez de jogar!" : "Aguarde sua vez..."
              }}
            </p>
          </div>
        </div>
        <p class="game-container-player-vs">VS.</p>
        <div class="game-container-player-ii">
          IA: {{ pontuacaoIA }}
          <div class="game-container-player-ii-turno">
            <p>
              {{
                !turnoJogador ? "É a sua vez de jogar!" : "Aguarde sua vez..."
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="game-container-cards">
        <button
          v-for="(carta, index) in cartas"
          :key="carta.id"
          class="game-container-cards-item"
          @click="!carta.virada && turnoJogador ? viraCarta(index) : null"
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
      <div v-if="showModal" class="game-modal">
        <div class="game-modal-content">
          <span class="game-close" @click="resetarJogo">&times;</span>
          <p>{{ resultado }}</p>
        </div>
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
let cartasViradas = [];
const playerName = ref("")
const cartas = ref([]);
const pontuacaoJogador = ref(0);
const pontuacaoIA = ref(0);
const turnoJogador = ref(true);
const resultado = ref("");
const showModal = ref(false);

function iniciarNovoJogo() {
  const imagensDuplas = [...imagens, ...imagens];
  imagensDuplas.sort(() => Math.random() - 0.5);
  cartas.value = imagensDuplas.map((imagem, index) => ({
    id: index,
    imagem,
    virada: false,
  }));
  turnoJogador.value = true;
  pontuacaoJogador.value = 0;
  pontuacaoIA.value = 0;
  cartaViradaIndex = null;
  segundaCartaViradaIndex = null;
  cartasViradas = [];
}

function viraCarta(index) {
  if (!cartas.value[index].virada) {
    cartas.value[index].virada = true;
    if (cartaViradaIndex === null) {
      cartaViradaIndex = index;
    } else {
      segundaCartaViradaIndex = index;
      if (
        cartas.value[cartaViradaIndex].imagem ===
        cartas.value[segundaCartaViradaIndex].imagem
      ) {
        if (turnoJogador.value) {
          pontuacaoJogador.value += 1;
        } else {
          pontuacaoIA.value += 1;
          viraCartaIA();
        }
        cartaViradaIndex = null;
        segundaCartaViradaIndex = null;
      } else {
        setTimeout(() => {
          cartas.value[cartaViradaIndex].virada = false;
          cartas.value[segundaCartaViradaIndex].virada = false;
          cartaViradaIndex = null;
          segundaCartaViradaIndex = null;
          turnoJogador.value = !turnoJogador.value;
          if (!turnoJogador.value) {
            viraCartaIA();
          }
        }, 1000);
      }
    }
  }
  if (cartas.value.every((carta) => carta.virada)) {
    verificarFimDoJogo();
  }
}

function viraCartaIA() {
  setTimeout(() => {
    let cartasViradasIndices = cartasViradas.map((carta) => carta.indice);
    let cartasDisponiveis = cartas.value
      .map((carta, index) => ({ index, carta }))
      .filter(
        ({ index, carta }) =>
          !carta.virada && !cartasViradasIndices.includes(index)
      );

    let cartaAleatoriaIndices = [];
    while (cartaAleatoriaIndices.length < 2 && cartasDisponiveis.length > 0) {
      let indexAleatorio = Math.floor(Math.random() * cartasDisponiveis.length);
      cartaAleatoriaIndices.push(cartasDisponiveis[indexAleatorio].index);
      cartasDisponiveis.splice(indexAleatorio, 1);
    }

    cartaAleatoriaIndices.forEach((index) => {
      viraCarta(index);
    });

    setTimeout(() => {
      if (
        cartaViradaIndex !== null &&
        segundaCartaViradaIndex !== null &&
        cartas.value[cartaViradaIndex].imagem ===
          cartas.value[segundaCartaViradaIndex].imagem
      ) {
        viraCartaIA();
      }
    }, 1000);
  }, 1000);
  if (cartas.value.every((carta) => carta.virada)) {
    verificarFimDoJogo();
  }
}

function verificarFimDoJogo() {
  if (cartas.value.some((carta) => !carta.virada)) {
    return;
  }
  const cartasViradas = cartas.value.filter((carta) => carta.virada);
  for (let i = 0; i < cartasViradas.length; i++) {
    for (let j = i + 1; j < cartasViradas.length; j++) {
      if (cartasViradas[i].imagem === cartasViradas[j].imagem) {
        return;
      }
    }
  }
  if (pontuacaoJogador.value > pontuacaoIA.value) {
    resultado.value = "Você venceu!";
  } else if (pontuacaoIA.value > pontuacaoJogador.value) {
    resultado.value = "Você perdeu!";
  } else {
    resultado.value = "Empate!";
  }
  setTimeout(() => {
    showModal.value = true;
  }, 1000);
  showModal.value = true;
  }


function resetarJogo() {
  iniciarNovoJogo();
}

if (cartas.value.length === 0) {
  iniciarNovoJogo();
}
</script>

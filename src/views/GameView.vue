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
          Jogador: {{ pontuacaoJogador }}
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
const cartas = ref([]);
const pontuacaoJogador = ref(0);
const turnoJogador = ref(true);

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
  turnoJogador.value = Math.random() < 0.5;
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
        pontuacaoJogador.value += 1;
        cartaViradaIndex = null;
        segundaCartaViradaIndex = null;
      } else {
        setTimeout(() => {
          cartas.value[cartaViradaIndex].virada = false;
          cartas.value[segundaCartaViradaIndex].virada = false;
          cartaViradaIndex = null;
          segundaCartaViradaIndex = null;
          turnoJogador.value = true;
        }, 1000);
      }
    }
  }
}

function viraCartaIA() {
  if (!turnoJogador) {
    let parEncontrado = false;

    // Encontrar par
    for (let i = 0; i < cartasViradas.length; i++) {
      if (
        cartasViradas[i].imagem === cartaViradaIndex &&
        cartasViradas[i].jogador !== true
      ) {
        parEncontrado = true;
        segundaCartaViradaIndex = cartasViradas[i].indice;
        break;
      }
    }

    // Pontuar e virar cartas
    if (parEncontrado) {
      pontuacaoIA.value += 1;
      cartas[cartaViradaIndex].virada = true;
      cartas[segundaCartaViradaIndex].virada = true;
      cartasViradas = cartasViradas.filter(
        (carta) =>
          carta.indice !== cartaViradaIndex &&
          carta.indice !== segundaCartaViradaIndex
      );
      turnoJogador.value = true;
    } else {
      // Jogar aleatoriamente
      let cartaAleatoriaIndex = Math.floor(Math.random() * cartas.length);
      while (cartas[cartaAleatoriaIndex].virada) {
        cartaAleatoriaIndex = Math.floor(Math.random() * cartas.length);
      }
      viraCarta(cartaAleatoriaIndex);
    }
  }
}

function resetarJogo() {
  iniciarNovoJogo();
}

if (cartas.value.length === 0) {
  iniciarNovoJogo();
}
</script>

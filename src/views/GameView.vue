<template>
    <div class="game">
      <div class="game-container">
        <TituloPagina titulo="Jogar" link="/menu-principal" />
        <button @click="resetarJogo" class="game-container-reset">Resetar</button>
        <div class="game-container-player">
            <div class="game-container-player-pontuacao">Pontuação</div>
          <div class="game-container-player-i">Jogador: {{ pontuacaoJogador }}</div>
          <p v-if="!turnoJogador.value">Aguarde sua vez...</p>
          <p v-else>É a sua vez de jogar!</p>
          <p>VS.</p>
          <div class="game-container-player-ii">IA: {{ pontuacaoIA }}</div>
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
    "src/assets/img/suv.png"
  ];
  
  const NUMERO_DE_CARTAS = 12;
  
  imagens.sort(() => Math.random() - 0.5);
  
  const paresDeImagens = imagens.concat(imagens);
  
  const pontuacaoJogador = ref(0)
  const pontuacaoIA = ref(0)
  const turnoJogador = ref(true)
  
  paresDeImagens.sort(() => Math.random() - 0.5);
  
  const cartas = ref(
    paresDeImagens.map((imagem, index) => ({ virada: false, imagem }))
  );
  
  let cartaViradaIndex = null;
  let segundaCartaViradaIndex = null;
  let memoriaCartas = {};
  
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
        delete memoriaCartas[cartaViradaIndex];
        delete memoriaCartas[segundaCartaViradaIndex];
        cartaViradaIndex = null;
        segundaCartaViradaIndex = null;
        if (turnoJogador.value) {
          pontuacaoJogador.value += 1;
        } else {
          pontuacaoIA.value += 1;
        }
      } else {
        setTimeout(() => {
          cartas.value[cartaViradaIndex].virada = false;
          cartas.value[segundaCartaViradaIndex].virada = false;
          memoriaCartas[cartaViradaIndex] = true;
          memoriaCartas[segundaCartaViradaIndex] = true;
          cartaViradaIndex = null;
          segundaCartaViradaIndex = null;
          turnoJogador.value = !turnoJogador.value;
          if (!turnoJogador.value) {
            jogadaIA();
          }
        }, 1000);
      }
    }
  }
  
  function resetarJogo() {
    imagens.sort(() => Math.random() - 0.5);
    const paresDeImagens = imagens.concat(imagens);
    paresDeImagens.sort(() => Math.random() - 0.5);
  
    cartas.value.forEach((carta) => {
      carta.virada = false;
    });
  
    cartaViradaIndex = null;
    segundaCartaViradaIndex = null;
    memoriaCartas = {};
  }
  
  function jogadaIA() {
    let cartasViradas = [];
    for (const index in cartas.value) {
      if (cartas.value[index].virada && !memoriaCartas[index]) {
        cartasViradas.push(index);
      }
    }
    if (cartasViradas.length < 2) {
      return;
    }
  
    const indexCarta1 = cartasViradas[0];
    const indexCarta2 = cartasViradas[1];
  
    setTimeout(() => {
      viraCarta(indexCarta1);
    }, 500);
  
    setTimeout(() => {
      viraCarta(indexCarta2);
    }, 1000);
  }
  </script>
  
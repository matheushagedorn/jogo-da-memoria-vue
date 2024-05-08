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
        <div class="game-container-player-i">
          <p>Jogador</p>
          <div class="game-container-player-i-rodada">
            <div class="game-container-player-i-rodada-escolha">
              <img :src="imgJogador1" alt="Escolha do Jogador 1" />
              <div class="game-container-player-pontuacao">
                Pontuação: {{ pontuacaoJogador }}
              </div>
            </div>
          </div>
        </div>
        <div class="game-container-player-vs">
          <img src="@/assets/img/versus.png" alt="versus" />
        </div>
        <div class="game-container-player-ii">
          <p>IA</p>
          <div class="game-container-player-ii-rodada">
            <div class="game-container-player-ii-rodada-escolha">
              <img :src="imgJogador2" alt="Escolha do Jogador 2" />
              <div class="game-container-player-pontuacao">
                Pontuação: {{ pontuacaoIA }}
              </div>
            </div>
          </div>
        </div>
        <div class="game-container-player-turno">
          Turno: {{ contagemTurno }}
        </div>
      </div>
      <div class="game-container-escolhaJogador">
        <button
          @click="escolherItem('src/assets/img/pedra.png', 0)"
          class="game-container-escolhaJogador-pedra"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/pedra.png" alt="Pedra" />
        </button>
        <button
          @click="escolherItem('src/assets/img/papel.png', 1)"
          class="game-container-escolhaJogador-papel"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/papel.png" alt="Papel" />
        </button>
        <button
          @click="escolherItem('src/assets/img/tesoura.png', 2)"
          class="game-container-escolhaJogador-tesoura"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/tesoura.png" alt="Tesoura" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
import { ref } from "vue";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const pontuacaoJogador = ref(0);
const pontuacaoIA = ref(0);
const contagemTurno = ref(1);
const trocaTurno = ref(true);
const escolhaJogador = ref(0);
const escolhaIA = ref(0);
const imgJogador1 = ref("src/assets/img/interrogacao.png");
const imgJogador2 = ref("src/assets/img/interrogacao.png");

const escolherItem = (item, escolha) => {
  escolhaJogador.value = escolha;
  imgJogador1.value = item;
  trocaTurno.value = false;

  if (contagemTurno.value == 1) {
    escolhaIA.value = getRandomInt(3);
  }

  setTimeout(() => {
    switch (escolhaIA.value) {
      case 0:
        imgJogador2.value = "src/assets/img/pedra.png";
        break;
      case 1:
        imgJogador2.value = "src/assets/img/papel.png";
        break;
      case 2:
        imgJogador2.value = "src/assets/img/tesoura.png";
        break;
    }
    //Jogador
    if (escolhaJogador.value == 0 && escolhaIA.value == 2) {
      pontuacaoJogador.value += 1;
      escolhaIA.value = 0;
      console.log("Ponto jogador");
    } else if (escolhaJogador.value == 2 && escolhaIA.value == 1) {
      pontuacaoJogador.value += 1;
      escolhaIA.value = 2;
      console.log("Ponto Jogador");
    } else if (escolhaJogador.value == 1 && escolhaIA.value == 0) {
      pontuacaoJogador.value += 1;
      escolhaIA.value = 1;
      console.log("Ponto jogador");

      //IA
    } else if (escolhaJogador.value == 2 && escolhaIA.value == 0) {
      pontuacaoIA.value += 1;
      escolhaIA.value = 0;
      console.log("Ponto IA");
    } else if (escolhaJogador.value == 1 && escolhaIA.value == 2) {
      pontuacaoIA.value += 1;
      escolhaIA.value = 2;
      console.log("Ponto IA");
    } else if (escolhaJogador.value == 0 && escolhaIA.value == 1) {
      pontuacaoIA.value += 1;
      escolhaIA.value = 1;
      console.log("Ponto IA");
    } else {
      console.log("Empate");
    }
    setTimeout(() => {
      imgJogador1.value = "src/assets/img/interrogacao.png";
      imgJogador2.value = "src/assets/img/interrogacao.png";
      trocaTurno.value = true;
      contagemTurno.value += 1;
      if (contagemTurno.value == 6) {
        contagemTurno.value = 5;
        const vencedor =
          pontuacaoJogador.value > pontuacaoIA.value
            ? "Jogador venceu!"
            : pontuacaoIA.value > pontuacaoJogador.value
            ? "IA venceu!"
            : "Empate!";
        alert(
          "Fim de jogo, " +
            vencedor +
            "\n\nClique no botão 'Resetar' para recomeçar"
        );
        trocaTurno.value = false;
      }
    }, 2000);
  }, 1000);
};

function resetarJogo() {
  console.log("Resetar jogo");
  trocaTurno.value = true;
  imgJogador1.value = "src/assets/img/interrogacao.png";
  imgJogador2.value = "src/assets/img/interrogacao.png";
  pontuacaoJogador.value = 0;
  pontuacaoIA.value = 0;
  contagemTurno.value = 1;
}
</script>

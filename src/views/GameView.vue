<template>
  <div class="game">
    <div class="game-container">
      <TituloPagina
        titulo="Jogar"
        link="/menu-principal"
        class="game-container-title"
      />
      <div class="game-container-player">
        <div class="game-container-player-i">
          <p>{{ playerName }}</p>
          <div class="game-container-player-i-rodada">
            <div class="game-container-player-i-rodada-escolha">
              <img :src="imgJogador1" alt="Escolha do Jogador 1" :class="{ 'pulse-animation': imgJogador1 != '/src/assets/img/interrogacao.png' }" />
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
              <img :src="imgJogador2" alt="Escolha do Jogador 2" :class="{ 'pulse-animation': imgJogador2 != '/src/assets/img/interrogacao.png' }" />
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
          @click="escolherItem('/src/assets/img/pedra.png', 0)"
          class="game-container-escolhaJogador-pedra"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/pedra.png" alt="Pedra" />
        </button>
        <button
          @click="escolherItem('/src/assets/img/papel.png', 1)"
          class="game-container-escolhaJogador-papel"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/papel.png" alt="Papel" />
        </button>
        <button
          @click="escolherItem('/src/assets/img/tesoura.png', 2)"
          class="game-container-escolhaJogador-tesoura"
          :style="{ cursor: trocaTurno ? 'pointer' : 'not-allowed' }"
          :disabled="!trocaTurno"
        >
          <img src="@/assets/img/tesoura.png" alt="Tesoura" />
        </button>
      </div>
      <button @click="resetarJogo" class="game-container-reset">Resetar</button>
    </div>
  </div>
  <div v-if="showModal" class="modal-container">
    <div class="modal">
      <p>Fim de jogo! vencedor:</p>
      <br />
      <h1>{{ vencedor }}</h1>
      <br />
      <p>Clique no botão abaixo para recomeçar:</p>
      <button @click="resetarJogo" class="reset-button">Resetar</button>
    </div>
  </div>
  <audio id="pedra">
    <source src="@/assets/sounds/rock_sound.mp3" type="audio/mpeg">
  </audio>
  
  <audio id="papel">
    <source src="@/assets/sounds/paper_sound.mp3" type="audio/mpeg">
  </audio>
  
  <audio id="tesoura">
    <source src="@/assets/sounds/scissor_sound.mp3" type="audio/mpeg">
  </audio>
  <audio id="vitoria">
    <source src="@/assets/sounds/victory_sound.mp3" type="audio/mpeg">
  </audio>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const playerName = ref(router.currentRoute.value.params.name);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const pontuacaoJogador = ref(0);
const pontuacaoIA = ref(0);
const contagemTurno = ref(1);
const trocaTurno = ref(true);
const escolhaJogador = ref(0);
const escolhaIA = ref(0);
const showModal = ref(false);
const imgJogador1 = ref("/src/assets/img/interrogacao.png");
const imgJogador2 = ref("/src/assets/img/interrogacao.png");
const vencedor = ref("");

const escolherItem = (item, escolha) => {
  escolhaJogador.value = escolha;
  imgJogador1.value = item;
  trocaTurno.value = false;

  switch (escolhaJogador.value){
    case 0:
      document.getElementById("pedra").play();
      break;

    case 1:
      document.getElementById("papel").play();  
      break;
    case 2:
    document.getElementById("tesoura").play();
    break
  }

  if (contagemTurno.value == 1) {
    escolhaIA.value = getRandomInt(3);
  }

  setTimeout(() => {
    switch (escolhaIA.value) {
      case 0:
        imgJogador2.value = "/src/assets/img/pedra.png";
        document.getElementById("pedra").play();
        break;
      case 1:
        imgJogador2.value = "/src/assets/img/papel.png";
        document.getElementById("papel").play();
        break;
      case 2:
        imgJogador2.value = "/src/assets/img/tesoura.png";
        document.getElementById("tesoura").play();
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
    } else if (escolhaJogador.value == 0 && escolhaIA.value == 0) {
      escolhaIA.value = 1;
      console.log("Empate");
    } else if (escolhaJogador.value == 1 && escolhaIA.value == 1) {
      escolhaIA.value = 2;
      console.log("Empate");
    } else if (escolhaJogador.value == 3 && escolhaIA.value == 3) {
      escolhaIA.value = 1;
      console.log("Empate");
    }
    setTimeout(() => {
      imgJogador1.value = "/src/assets/img/interrogacao.png";
      imgJogador2.value = "/src/assets/img/interrogacao.png";
      trocaTurno.value = true;
      contagemTurno.value += 1;
      if (contagemTurno.value == 6) {
        contagemTurno.value = 5;
        vencedor.value =
          pontuacaoJogador.value > pontuacaoIA.value
            ? playerName.value
            : pontuacaoIA.value > pontuacaoJogador.value
            ? "IA"
            : "Empate!";
        showModal.value = true;
        document.getElementById("vitoria").play();
      }
    }, 2000);
  }, 1000);
};

function resetarJogo() {
  console.log("Resetar jogo");
  trocaTurno.value = true;
  imgJogador1.value = "/src/assets/img/interrogacao.png";
  imgJogador2.value = "/src/assets/img/interrogacao.png";
  pontuacaoJogador.value = 0;
  pontuacaoIA.value = 0;
  contagemTurno.value = 1;
  showModal.value = false;
}
</script>

<style scoped>
.play-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  font-family: "chalet", sans-serif;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  text-align: center;
  animation: login-slideIn 0.5s ease-in-out forwards
}

.modal h1{
  font-weight: bold;
  font-size: clamp(1.26rem, 1.1548rem + 0.5261vw, 1.5625rem);
}

.reset-button {
  font-family: "chalet", sans-serif;
  padding: 1.3rem 3rem;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin: 1rem;
  justify-content: center;
  text-align: center;
}
.reset-button:hover {
  background-color: black;
  color: #fff;
  transform: translateY(-7px);
  cursor: pointer;
}

.reset-button:active {
  transform: translateY(-1px);
}

.pulse-animation {
  max-width: 100%;
  max-height: 100%;
  animation: pulse 0.1s ease;
}

@keyframes pulse {
  0% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

</style>

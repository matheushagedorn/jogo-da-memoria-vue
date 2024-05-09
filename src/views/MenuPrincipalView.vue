<template>
  <div class="menu-principal">
    <div class="menu-principal-form">
      <h1>Jo-Ken-IA</h1>
      <br />
      <img src="@/assets/img/jokenpo.png" />
      <div>
        <button @mouseenter="playSound" @click="abreModal">Jogar</button>
        <router-link to="como-jogar"><button @mouseenter="playSound">Como jogar</button></router-link>
        <router-link to="creditos"><button @mouseenter="playSound">Créditos</button></router-link>
      </div>
    </div>
    <div v-if="showModal" class="modal-container" @click="fechaModal">
      <div class="modal">
        <p>Insira seu nome: </p>
        <input v-model="userName" placeholder="Seu nome" @keydown.enter="startGame" autofocus />
        <button @click="startGame" class="start-button">Iniciar</button>
      </div>
    </div>
  </div>
  <audio autoplay id="hover">
    <source src="@/assets/sounds/button_hover_sound.mp3" type="audio/mpeg">
  </audio>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showModal = ref(false);
const userName = ref("");

function abreModal() {
  showModal.value = true;
  nextTick(() => {
    document.querySelector('input').focus();
  });
}

function fechaModal(event) {
  if (!event.target.closest('.modal')){
    showModal.value = false;
  }
}

function startGame() {
  if (userName.value === "") {
    userName.value = "Jogador"
    return;
  }
  router.push({ name: "game", params: { name: userName.value } });
  showModal.value = false;
}

function playSound() {
  document.getElementById("hover").play()
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
  animation: login-slideIn 0.5s ease-in-out forwards;
}
.modal p{
  text-align: center;
}

.start-button {
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
}
.start-button:hover {
  background-color: black;
  color: #fff;
  transform: translateY(-7px);
  cursor: pointer;
}

.start-button:active {
  transform: translateY(-1px);
}
</style>

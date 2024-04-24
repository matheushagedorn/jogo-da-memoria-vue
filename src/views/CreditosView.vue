<template>
  <div class="creditos">
    <div class="creditos-container">
      <TituloPagina titulo="Créditos" link="/menu-principal" />
      <p>
        Esse é um projeto desenvolvido por alunos do curso Engenharia de
        Software na <span style="font-weight: bold">UNIVILLE</span> para a disciplina Fundamentos da Inteligência
        Artificial. O jogo que leva o nome <span style="font-weight: bold">MemórIA</span> consiste em um jogo da memória
        em que o jogador joga contra uma inteligência artificial treinada
        com a heurística. 
        <br>
        Abaixo, a lista dos membros da equipe:
      </p>
      <br>
      <br>
      <p>Alex Yohann Pereira</p>
      <div class="creditos-container-links">
          <a href="#" target="_blank">
              <img src="../assets/img/github-logo.png" alt="GitHub Logo" />
            </a>
            <a href="https://www.instagram.com/alexyohann/" target="_blank">
                <img src="../assets/img/instagram.png" alt="GitHub Logo" />
            </a>
        </div>
        <p>Gabriel Gomes Rodrigues</p>
        <div class="creditos-container-links">
            <a href="https://github.com/GabrielGomesRodrigues" target="_blank">
                <img src="../assets/img/github-logo.png" alt="GitHub Logo" />
            </a>
            <a href="https://www.instagram.com/rodriguesbaga" target="_blank">
                <img src="../assets/img/instagram.png" alt="GitHub Logo" />
            </a>
        </div>
        <p>Matheus Hagedorn</p>
        <div class="creditos-container-links">
          <a href="https://github.com/matheushagedorn" target="_blank">
            <img src="../assets/img/github-logo.png" alt="GitHub Logo" />
          </a>
          <a href="https://instagram.com/matheus_hagedorn" target="_blank">
            <img src="../assets/img/instagram.png" alt="GitHub Logo" />
          </a>
        </div>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
</script>

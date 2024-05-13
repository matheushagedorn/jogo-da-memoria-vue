<template>
  <div class="como-jogar">
    <div class="como-jogar-container">
      <TituloPagina titulo="Como jogar" link="/menu-principal" class="como-jogar-container-title"/>
      <h1 class="como-jogar-container-header">Como jogar</h1>
      <p>
        O jogo consiste basicamente em 3 itens: Pedra, Papel ou Tesoura. O
        jogador deverá escolher um desses itens para vencer o adversário. Para
        vencer, o item escolhido pelo jogador deverá ser mais forte que o
        escolhido pelo adversário seguindo a seguinte lógica:
        <br />
        <br />
        Pedra > Tesoura
        <br />
        Tesoura > Papel
        <br />
        Papel > Pedra
        <br>
        <br>
        O jogador deverá selecionar entre pedra, papel ou tesoura nos cards
        mostrados e aguardar a jogada da IA, o jogo então irá pontuar e passar
        para a próxima rodada. Quem tiver mais pontos após 5 rodadas vence o
        jogo.
      </p>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
</script>

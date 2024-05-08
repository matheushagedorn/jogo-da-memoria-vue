<template>
  <div class="como-jogar">
    <div class="como-jogar-container">
      <TituloPagina titulo="Como jogar" link="/menu-principal" />
      <h1 class="como-jogar-container-header">Objetivo do jogo</h1>
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
      </p>
      <h1 class="como-jogar-container-header">Como jogar:</h1>
      <p>
        O jogador deverá selecionar entre pedra, papel ou tesoura nos cards
        mostrados e aguardar a jogada da IA, o jogo então irá pontuar e passar
        para a próxima rodada. Quem tiver mais pontos após 5 rodadas vence o
        jogo.
      </p>
      <h1 class="como-jogar-container-header">
        Dicas para melhorar sua estratégia no jogo:
      </h1>
      <p>
        Se um dos jogadores vencer, ele vai manter a mesma jogada no próximo turno, ou seja, vai escolher o mesmo símbolo.
        <br>
        <br>
        Quando um jogador perde, normalmente ele vai mudar a direção das ações
        em um "sentido horário": pedra vira papel, papel troca por tesoura e
        tesoura alterna para pedra.
      </p>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from "@/components/helpers/TituloPagina.vue";
</script>

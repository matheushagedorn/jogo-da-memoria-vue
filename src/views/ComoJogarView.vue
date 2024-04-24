<template>
  <div class="como-jogar">
    <div class="como-jogar-container">
    <TituloPagina titulo="Como jogar" link="/menu-principal" />
      <h1 class="como-jogar-container-header">Objetivo do jogo</h1>
      <p>
        Encontre pares de cartas correspondentes em um conjunto virado para
        baixo para ganhar pontos.
      </p>
      <br>
      <h1 class="como-jogar-container-header">Preparação:</h1>
      <p>
        As cartas são embaralhadas automaticamente e dispostas viradas para
        baixo em uma grade.
      </p>
      <br>
      <h1 class="como-jogar-container-header">Como jogar:</h1>
      <p>
        Os jogadores viram duas cartas por vez. Se correspondem, ganham um ponto
        e removem as cartas. Se não, as cartas são viradas de volta. O jogo
        continua até que todas as cartas sejam combinadas.
      </p>
      <br>
      
      <h1 class="como-jogar-container-header">Dicas para melhorar sua memória no jogo:</h1>
      <p>
        Concentre-se em lembrar a localização das cartas viradas, observe
        padrões e cores, e pratique regularmente.
      </p>
      <br>
    </div>
  </div>
</template>

<script setup>
import TituloPagina from '@/components/helpers/TituloPagina.vue';
</script>

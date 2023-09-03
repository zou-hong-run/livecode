<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="top">二维码活码</div>
  <div id="content">
    <RouterView/>
  </div>
</template>

<style scoped lang="scss">
  #top{
    height: 5vh;
    font-size: 4vh;
    text-align: center;
    color: skyblue;
    border-bottom: 1px dotted pink;
  }
  #content{
    height: 95vh;
    background-color: skyblue;
  }
</style>

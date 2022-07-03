<template>
  <v-app id="inspire" style="color: #455A64; font-family: 'Tsukushi A Round Gothic','筑紫A丸ゴシック';">
    <Header></Header>
    <!-- ルートコンポーネントでページのメイン部分の表示 -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: { Header },
}
</script>
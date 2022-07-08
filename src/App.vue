<template>
  <div id="app">
    <v-app id="inspire" style="color: #455A64; font-family: 'Tsukushi A Round Gothic','筑紫A丸ゴシック';">
      <Header></Header>
      <!-- ルートコンポーネントでページのメイン部分の表示 -->
      <v-main>
        <router-view></router-view>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Footer },
}
</script>
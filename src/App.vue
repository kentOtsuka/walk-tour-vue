<template>
  <div id="app">
    <v-app id="inspire" style="color: #455A64; font-family: 'Tsukushi A Round Gothic','筑紫A丸ゴシック', '	Hiragino Maru Gothic ProN W4', 'ヒラギノ丸ゴ ProN W4';">
      <Header></Header>
      <!-- ルートコンポーネントでページのメイン部分の表示 -->
      <v-main>
        <router-view></router-view>
        <v-snackbar
          v-model="$store.state.util.snackbar"
          absolute
          top
          color="light-blue darken-1"
          text
        >
          <!-- Snackbar内に表示するテキスト -->
          {{ $store.state.util.text }}
          <template v-slot:action="{ attrs }">
            <!-- ボタンを押したらcloseする -->
            <v-btn color="info" text v-bind="attrs" @click="closeSnackbar">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue'
import Footer from './components/TheFooter.vue'
import { mapActions } from "vuex";

export default {
  components: { Header, Footer },
  methods: {
    ...mapActions("util", ["closeSnackbar"]),
  },
}
</script>
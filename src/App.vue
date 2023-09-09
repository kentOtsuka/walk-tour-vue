<template>
  <div id="app">
    <v-app
      id="inspire"
      style="color: #455A64; font-family: 'Tsukushi A Round Gothic','筑紫A丸ゴシック', 'Hiragino Maru Gothic ProN W4', 'ヒラギノ丸ゴ ProN W4';">
      <Header />
      <!-- ルートコンポーネントでページのメイン部分の表示 -->
      <v-main>
        <router-view />
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
            <v-btn color="info" text v-bind="attrs" @click="closeSnackbar"> Close </v-btn>
          </template>
        </v-snackbar>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue';
import Footer from './components/TheFooter.vue';
import { mapActions } from 'vuex';

export default {
  components: { Header, Footer },
  metaInfo: {
    title: 'VtourHub - 気になる街へ行こう',
    titleTemplate: '%s | VtourHub'
  },
  methods: {
    ...mapActions('util', ['closeSnackbar']),
  },
};
</script>

<style scoped>
.v-snack--absolute {
  z-index: 2;
}
</style>

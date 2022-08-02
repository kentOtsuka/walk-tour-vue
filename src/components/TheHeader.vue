<template>
  <div>
    <!-- ヘッダー（ナビゲーションバー） -->
    <v-app-bar app outlined color="#fff" class="elevation-2">
      <!-- ヘッダータイトル -->
      <router-link to="/" style="text-decoration: none">
        <v-icon color="blue-grey lighten-1"> VtourHub </v-icon>
      </router-link>
      <v-spacer />
      <div class="px-2 d-flex justify-end">
        <v-btn
          v-if="this.$i18n.locale === 'en'"
          color="deep-orange darken-1"
          outlined
          @click="changeLocale"
          >Japanese</v-btn
        >
        <v-btn
          v-if="this.$i18n.locale === 'ja'"
          color="deep-orange darken-1"
          outlined
          @click="changeLocale"
          >English</v-btn
        >
      </div>
      <!-- メニューアイコン -->
      <v-btn color="blue-grey lighten-1" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <Menu v-model="drawer" />
  </div>
</template>

<script>
import Menu from './BaseMenu.vue';

export default {
  components: { Menu },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ja' ? 'en' : 'ja';
    },
  },
};
</script>

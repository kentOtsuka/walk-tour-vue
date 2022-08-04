<template>
  <div>
    <!-- メニュー表の中身 -->
    <v-navigation-drawer :value="value" @input="$emit('input', $event)" app fixed temporary>
      <v-list v-if="authUser">
        <v-list-item @click.native="triggerClick('profile')" link>
          <v-list-item-avatar color="indigo" size="50">
            <span class="white--text text-h5">{{ authUser.name.charAt(0) }}</span>
          </v-list-item-avatar>
          <v-list-item-content style="color: #455a64">
            <v-list-item-title>{{ $t('defaults.my_page') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider />

      <!-- メニュー表のリスト -->
      <v-list>
        <v-list-item to="/" link>
          <v-list-item-icon style="color: #455a64">
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="color: #455a64">
            <v-list-item-title>{{ $t('menu.home') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/spotRanking" link>
          <v-list-item-icon style="color: #455a64">
            <v-icon>mdi-fire</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="color: #455a64">
            <v-list-item-title>{{ $t('defaults.hot_spot') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/newsList" link>
          <v-list-item-icon style="color: #455a64">
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="color: #455a64">
            <v-list-item-title>{{ $t('defaults.news') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider />

      <v-list dense>
        <template v-if="!authUser">
          <v-list-item to="/login" link>
            <v-list-item-icon style="color: #455a64">
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content style="color: #455a64">
              <v-list-item-title>{{ $t('menu.login') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-else>
          <!-- リストを繰り返し処理で全て表示 -->
          <v-list-item to="/spotRequest" link>
            <!-- リストのアイコン -->
            <v-list-item-icon style="color: #455a64">
              <v-icon>mdi-send-circle</v-icon>
            </v-list-item-icon>

            <!-- リストのタイトル -->
            <v-list-item-content style="color: #455a64">
              <v-list-item-title>{{ $t('defaults.request_spot') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.native="triggerClick('logout')" link>
            <!-- リストのアイコン -->
            <v-list-item-icon style="color: #455a64">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <!-- リストのタイトル -->
            <v-list-item-content style="color: #455a64">
              <v-list-item-title>{{ $t('menu.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // 親のHeader.vueから引き継ぎ
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters('users', ['authUser']),
  },
  methods: {
    ...mapActions('users', ['logoutUser']),
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    // メニューの中でログアウトメニューをクリックした時のみ発火
    triggerClick(action) {
      if (action === 'logout') {
        this.logout();
      } else if (action === 'profile') {
        this.handleProfile();
      }
    },
    // ログアウトを実行するメソッド
    async logout() {
      try {
        // ログアウト処理
        await this.logoutUser();
        // ログアウト後、ログインページに遷移させる
        this.$router.push({ name: 'Login' });
        // フラッシュメッセージの表示処理の呼び出し
        this.openSnackbar('ログアウトしました');
      } catch (error) {
        console.log(error);
      }
    },
    // マイページを開く
    handleProfile() {
      this.$router.push({ name: 'UserProfile' });
    },
  },
};
</script>

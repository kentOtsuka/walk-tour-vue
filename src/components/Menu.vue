<template>
  <div>
    <!-- メニュー表の中身 -->
    <v-navigation-drawer
      :value="value"
      @input="$emit('input', $event)"
      app
      fixed
      temporary
    >

      <v-list v-if="authUser">
        <v-list-item
          @click.native="triggerClick('profile')"
          link
        >
          <v-list-item-avatar color="indigo">
            <span class="white--text text-h5">{{ authUser.name.charAt(0) }}</span>
          </v-list-item-avatar>
          <v-list-item-content style="color: #455A64;">
            <v-list-item-title>マイページ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider></v-divider>

      <!-- メニュー表のリスト -->
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          @click.native="triggerClick(item.action)"
          link
        >
          <v-list-item-icon style="color: #455A64;">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="color: #455A64;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- 線 -->
      <v-divider></v-divider>

      <v-list dense>
        <template v-if="!authUser">
          <v-list-item
            v-for="item in smallItems"
            :key="item.title"
            :to="item.url"
            @click.native="triggerClick(item.action)"
            link
          >
            <v-list-item-icon style="color: #455A64;">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content  style="color: #455A64;">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-else>
          <!-- リストを繰り返し処理で全て表示 -->
          <v-list-item
            v-for="item in smallItemsLogin"
            :key="item.title"
            :to="item.url"
            @click.native="triggerClick(item.action)"
            link
          >
            <!-- リストのアイコン -->
            <v-list-item-icon style="color: #455A64;">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <!-- リストのタイトル -->
            <v-list-item-content style="color: #455A64;">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- プライバシーポリシーダイアログボックス -->
    <v-dialog v-model="privacyDialog" max-width="1500px">
      <Privacy @reset-dialog="handleClosePrivacy()"></Privacy>
    </v-dialog>
    <!-- 利用規約ダイアログボックス -->
    <v-dialog v-model="termsDialog" max-width="1200px">
    <UseTerms @reset-dialog="handleCloseTerms()"></UseTerms>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Privacy from './PrivacyPolicy.vue'
import UseTerms from './UseTerms.vue'

export default {
  components: { Privacy, UseTerms },
  // 親のHeader.vueから引き継ぎ
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 未ログインのメニューリスト
      items: [
        { title: 'トップページ', icon: 'mdi-home-outline', url: '/' },
        { title: 'ホットスポット', icon: 'mdi-fire', url: '/spotRanking' },
        { title: 'お知らせ', icon: 'mdi-information-outline', url: '/newsList' },
      ],
      smallItems: [
        { title: 'ログイン', icon: 'mdi-login', url: '/login' },
        { title: 'プライバシーポリシー', icon: 'mdi-lock-outline', action: "privacy" },
        { title: '利用規約', icon: 'mdi-file-document-outline', action: "terms" },
        { title: 'お問い合わせ', icon: 'mdi-email-outline', action: "contact" },
      ],
      // ログイン中のメニューリスト
      smallItemsLogin: [
        { title: 'スポットをリクエスト', icon: 'mdi-send-circle', url: '/spotRequest' },
        { title: 'ログアウト', icon: 'mdi-logout', action: "logout" },
        { title: 'プライバシーポリシー', icon: 'mdi-lock-outline', action: "privacy" },
        { title: '利用規約', icon: 'mdi-file-document-outline', action: "terms" },
        { title: 'お問い合わせ', icon: 'mdi-email-outline', action: "contact" },
      ],
      privacyDialog: false,
      termsDialog: false,
    }
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters("users", ["authUser"])
  },
  methods: {
    // mapActionでログアウト処理を呼び出し
    ...mapActions("users", ["logoutUser"]),
    // メニューの中でログアウトメニューをクリックした時のみ発火
    triggerClick(action) {
      if (action === 'logout') {
        this.logout();
      } else if (action === 'profile') {
        this.handleProfile();
      } else if (action === 'privacy') {
        this.handlePrivacy();
      } else if (action === 'terms') {
        this.handleTerms();
      } else if (action === 'contact') {
        this.handleContact();
      }
    },
    // ログアウトを実行するメソッド
    async logout() {
      try {
        // ログアウト処理
        await this.logoutUser()
        // // ログアウト後、ログインページに遷移させる
        this.$router.push({name: 'Login'})
      } catch (error) {
        console.log(error)
      }
    },
    // マイページを開く
    handleProfile() {
      this.$router.push({ name: "UserProfile" });
    },
    // プライバシーポリシーを表示する
    handlePrivacy() {
      this.privacyDialog = true;
    },
    // プライバシーポリシーを非表示にする
    handleClosePrivacy() {
      this.privacyDialog = false;
    },
    // 利用規約を表示する
    handleTerms() {
      this.termsDialog = true;
    },
    // 利用規約を非表示にする
    handleCloseTerms() {
      this.termsDialog = false;
    },
    // お問合せフォームを別タブで開く
    handleContact() {
      window.open('https://forms.gle/ywb5Q35iHSBmYM4s5', '_blank');
    }
  }
}
</script>
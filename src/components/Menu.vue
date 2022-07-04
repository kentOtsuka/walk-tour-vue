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
      <!-- 線 -->
      <v-divider></v-divider>

      <!-- メニュー表のリスト -->
      <v-list>
        <template v-if="!authUser">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.url"
            @click.native="triggerClick(item.action)"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <template v-else>
          <!-- リストを繰り返し処理で全て表示 -->
          <v-list-item
            v-for="item in itemsLogin"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
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
        // { title: 'スポットをリクエスト', icon: 'mdi-send-circle', url: '/spotRequest' },
        { title: 'ログイン', icon: 'mdi-login', url: '/login' },
        { title: '新規登録', icon: 'mdi-account-plus', url: '/register' },
      ],
      // ログイン中のメニューリスト
      itemsLogin: [
        { title: 'トップページ', icon: 'mdi-home-outline', url: '/' },
        { title: 'ホットスポット', icon: 'mdi-fire', url: '/spotRanking' },
        { title: 'お知らせ', icon: 'mdi-information-outline', url: '/newsList' },
        // { title: 'お気に入り地点', icon: 'mdi-heart-outline', url: '' },
        { title: 'スポットをリクエスト', icon: 'mdi-send-circle', url: '/spotRequest' },
        { title: 'ログアウト', icon: 'mdi-logout', action: "logout" },
      ],
      right: null,
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
        this.logout()
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
  }
}
</script>
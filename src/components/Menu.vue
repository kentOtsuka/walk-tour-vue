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
      <!-- メニュー表のリスト -->
      <v-list>
        <!-- <template v-if="!authUser">
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
        </template> -->

        <!-- <template v-else> -->
        <template>
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
// import { mapGetters, mapActions } from "vuex"

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
        // { title: 'ログイン', icon: 'mdi-login', url: '/login' },
        // { title: '新規登録', icon: 'mdi-account-plus', url: '/register' },
      ],
      // ログイン中のメニューリスト
      itemsLogin: [
        { title: 'トップページ', icon: 'mdi-home-outline', url: '/' },
        { title: 'お気に入り地点', icon: 'mdi-heart-outline', url: '' },
        { title: '地点リクエスト', icon: 'mdi-send-outline', url: '' },
        // { title: 'ログアウト', icon: 'mdi-logout', action: "logout" },
      ],
      right: null,
    }
  },
}
</script>
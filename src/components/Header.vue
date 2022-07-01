<template>
  <div>
    <!-- ヘッダー（ナビゲーションバー） -->
    <v-app-bar
      app
      color="#fff"
      class="elevation-0"
      style="border-bottom: 2px solid #B3E5FC;"
    >
      <!-- ヘッダータイトル -->
      <v-icon color="blue-grey lighten-1">
        VtourHub
      </v-icon>
      <v-spacer></v-spacer>
      <!-- メニューアイコン -->
      <v-btn color="blue-grey lighten-1" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <Menu v-model="drawer"></Menu>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
  components: { Menu },
  data () {
    return {
      drawer: false
    }
  }
}
</script>

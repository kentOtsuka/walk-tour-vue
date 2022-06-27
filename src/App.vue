<template>
  <v-app id="inspire">
    <Header></Header>
    <!-- ルートコンポーネントでページのメイン部分の表示 -->
    <v-container class="my-16">
      <router-view class="mx-lg-16 my-lg-8"></router-view>
    </v-container>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    components: {
      Header,
    },
  }
</script>
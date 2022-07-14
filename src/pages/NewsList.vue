<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom>mdi-information-outline</v-icon>
      お知らせ
    </h2>
    <v-divider class="mb-2" style="max-width: 700px; margin: auto;"></v-divider>

    <v-simple-table style="max-width: 1000px; margin: auto;">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              更新日
            </th>
            <th class="text-left">
              内容
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in newsLists"
            :key="item.id"
          >
            <td>{{ item.created_at }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from '../plugins/axios'

export default {
  data() {
    return {
      newsLists: {
        created_at: '',
        content: '',
      }
    }
  },
  created() {
    // DB内のすべての国名を取得
    this.getNews();
  },
  methods: {
    getNews() {
      axios.get('/news_lists')
      .then( res => {
        this.newsLists = res.data
      })
    },
  }
}
</script>
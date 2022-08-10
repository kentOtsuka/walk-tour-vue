<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom>mdi-information-outline</v-icon>
      {{ $t('defaults.news') }}
    </h2>
    <v-divider class="mb-2" style="max-width: 700px; margin: auto" />

    <v-simple-table style="max-width: 1000px; margin: auto">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">{{ $t('news.updated_at') }}</th>
            <th class="text-left">{{ $t('news.content') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in newsLists" :key="item.id">
            <td>{{ item.created_at }}</td>
            <template v-if="$i18n.locale === 'ja'">
              <td>{{ item.content }}</td>
            </template>
            <template v-if="$i18n.locale === 'en'">
              <td>{{ item.content_ens }}</td>
            </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      newsLists: {
        created_at: '',
        content: '',
      },
    };
  },
  created() {
    // DB内のすべての国名を取得
    this.getNews();
  },
  methods: {
    getNews() {
      axios.get('/news_lists').then((res) => {
        this.newsLists = res.data;
      });
    },
  },
};
</script>

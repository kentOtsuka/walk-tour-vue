<template>
  <div class="d-flex justify-center" style="margin: auto" max-width="1000px">
    <v-autocomplete
      v-model="value"
      :items="area_name"
      label="国名から検索しよう"
      no-data-text="データがありません"
      solo
    >
    </v-autocomplete>
    <v-btn class="ml-2 mt-1" bottom outlined small fab color="white" @click="getMap">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      areas: [],
      area_name: [],
      value: [],
    };
  },
  created() {
    this.getArea();
  },
  methods: {
    // 地点を保有するエリア（国）を全て取得
    getArea() {
      axios.get('/countries').then((res) => {
        this.areas = res.data.areas;
        for (let i = 0; i < this.areas.length; i++) {
          this.area_name.push(this.areas[i].name);
        }
      });
    },
    getMap() {
      if (this.value.length !== 0) {
        let i = 0;
        while (i < this.areas.length) {
          if (this.value == this.areas[i].name) {
            this.$router.push({ name: 'SpotResult', params: { id: this.areas[i].id } });
            break;
          }
          i++;
        }
      } else {
        alert('検索ワードを選択してください');
      }
    },
  },
};
</script>

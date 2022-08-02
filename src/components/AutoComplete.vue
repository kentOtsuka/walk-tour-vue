<template>
  <div class="d-flex justify-center" style="margin: auto" max-width="1000px">
    <template v-if="this.$i18n.locale === 'ja'">
      <v-autocomplete
        v-model="value"
        :items="areaName"
        :label="$t('autocomplete.label')"
        :no-data-text="$t('defaults.no-data')"
        solo
      >
      </v-autocomplete>
      <v-btn class="ml-2 mt-1" bottom outlined small fab color="white" @click="getMap">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <template v-if="this.$i18n.locale === 'en'">
      <v-autocomplete
        v-model="valueEns"
        :items="areaNameEns"
        :label="$t('autocomplete.label')"
        :no-data-text="$t('defaults.no-data')"
        solo
      >
      </v-autocomplete>
      <v-btn class="ml-2 mt-1" bottom outlined small fab color="white" @click="getMapEns">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
import axios from '../plugins/axios';
import { mapActions } from 'vuex';

export default {

  data() {
    return {
      areas: [],
      areaName: [],
      areaNameEns: [],
      value: [],
      valueEns: [],
    };
  },
  mounted() {
    this.getArea();
  },
  methods: {
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    // 地点を保有するエリア（国）を全て取得
    getArea() {
      axios.get('/countries').then((res) => {
        this.areas = res.data.areas;
        for (let i = 0; i < this.areas.length; i++) {
          this.areaName.push(this.areas[i].name);
        }
        for (let i = 0; i < this.areas.length; i++) {
          this.areaNameEns.push(this.areas[i].name_ens);
        }
      });
    },
    // 日本語検索で国詳細ページへ遷移
    getMap() {
      if (this.value.length !== 0) {
        let i = 0;
        while (i < this.areas.length) {
          if (this.value === this.areas[i].name || this.value === this.areas[i].name_ens) {
            this.$router.push({ name: 'SpotResult', params: { id: this.areas[i].id } });
            break;
          }
          i++;
        }
        return;
      }
      this.openSnackbar(this.$t('autocomplete.error_message'));
    },
    // 英語検索で国詳細ページへ遷移
    getMapEns() {
      if (this.valueEns.length !== 0) {
        let i = 0;
        while (i < this.areas.length) {
          if (this.valueEns === this.areas[i].name_ens) {
            this.$router.push({ name: 'SpotResult', params: { id: this.areas[i].id } });
            break;
          }
          i++;
        }
        return;
      }
      this.openSnackbar(this.$t('autocomplete.error_message'));
    },
  },
};
</script>

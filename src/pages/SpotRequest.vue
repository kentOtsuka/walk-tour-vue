<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="green darken-1">mdi-send-circle</v-icon>
      {{ $t('defaults.request_spot') }}
    </h2>
    <v-divider class="mb-4" style="max-width: 700px; margin: auto" />
    <p class="mb-1 d-flex align-center justify-center">
      {{ $t('request.main_description') }}<br />
    </p>
    <p class="d-flex justify-center" style="font-size: small">
      {{ $t('request.first_annotation') }}<br />{{ $t('request.second_annotation') }}
    </p>

    <v-row justify="center" style="max-width: 1400px; margin: auto">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <template v-if="this.$i18n.locale === 'ja'">
                <v-autocomplete
                  v-model="spotInfo.area"
                  :items="areaName"
                  prepend-icon="mdi-earth"
                  :label="$t('form.area')"
                  :no-data-text="$t('form.no_data')"
                  validate-on-blur
                  required
                >
                </v-autocomplete>
              </template>
              <template v-if="this.$i18n.locale === 'en'">
                <v-autocomplete
                  v-model="spotInfo.area"
                  :items="areaNameEns"
                  prepend-icon="mdi-earth"
                  :label="$t('form.area')"
                  :no-data-text="$t('form.no_data')"
                  validate-on-blur
                  required
                >
                </v-autocomplete>
              </template>
              <v-text-field
                v-model="spotInfo.spot"
                :rules="spotRules"
                prepend-icon="mdi-map-marker"
                :label="$t('form.spot')"
                validate-on-blur
                required
              />
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                outlined
                class="mr-2"
                type="button"
                :disabled="!valid"
                :loading="loading"
                @click="send"
              >
                {{ $t('form.request_button') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../plugins/axios';
import { mapActions } from 'vuex';

export default {
  metaInfo: {
    title: 'スポットリクエスト',
  },
  data() {
    return {
      valid: false,
      loading: false,
      areaName: [],
      areaNameEns: [],
      // フォームで選択、入力された値
      spotInfo: {
        area: null,
        spot: '',
      },
      spotRules: [
        (v) => v.length <= 20 || this.$t('validate.request_spot'),
        (v) => v.length >= 2 || this.$t('validate.request_spot'),
      ],
    };
  },
  mounted() {
    // DB内のすべての国名を取得
    this.setArea();
  },
  methods: {
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    // DB内のすべての国名を取得
    setArea() {
      axios.get('/countries').then((res) => {
        for (let i = 0; i < res.data.all_areas.length; i++) {
          this.areaName.push(res.data.all_areas[i].name);
          this.areaNameEns.push(res.data.all_areas[i].name_ens);
        }
      });
    },
    // リクエストを送信(作成)
    send() {
      axios
        .post('/requests', { request: this.spotInfo })
        .then(() => {
          this.openSnackbar(this.$t('request.send'));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

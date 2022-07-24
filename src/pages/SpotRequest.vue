<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="green darken-1">mdi-send-circle</v-icon>
      スポットをリクエスト
    </h2>
    <v-divider class="mb-4" style="max-width: 700px; margin: auto" />
    <p class="mb-1 d-flex align-center justify-center">
      本サービスの管理者に対して、地点の追加をリクエストすることができます。<br />
    </p>
    <p class="d-flex justify-center" style="font-size: small">
      ※ リクエストされた地点の内、追加を見送ることもあるのでご了承ください。<br />
      ※ お知らせ欄から追加された地点を確認することができます。
    </p>

    <v-row justify="center" style="max-width: 1400px; margin: auto">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-autocomplete
                v-model="spotInfo.area"
                :items="areas"
                prepend-icon="mdi-earth"
                label="国を選択"
                no-data-text="データがありません"
                validate-on-blur
                required
              >
              </v-autocomplete>
              <v-text-field
                v-model="spotInfo.spot"
                :rules="spotRules"
                prepend-icon="mdi-map-marker"
                label="地名を入力"
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
                :disabled="!valid || loading"
                :loading="loading"
                @click="send"
              >
                リクエストを送る
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
  data() {
    return {
      valid: false,
      loading: false,
      areas: [],
      // フォームで選択、入力された値
      spotInfo: {
        area: null,
        spot: '',
      },
      spotRules: [
        (v) => v.length <= 20 || '2〜20文字が有効です',
        (v) => v.length >= 2 || '2〜20文字が有効です',
        (v) => /^[^ -~｡-ﾟ]+$/.test(v) || '全角文字で入力してください',
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
        this.areas = res.data.areas_name;
      });
    },
    // リクエストを送信(作成)
    send() {
      axios
        .post('/requests', { request: this.spotInfo })
        .then(() => {
          this.openSnackbar('送信しました！');
          this.resetSpotInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetSpotInfo() {
      this.spotInfo.area = null;
      this.spotInfo.spot = '';
    },
  },
};
</script>

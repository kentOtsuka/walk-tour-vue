<template>
  <v-container class="mb-16">
    <h1 class="mb-3 d-flex align-center justify-center">
      <v-icon left bottom color="teal darken-1">mdi-account-circle</v-icon>
      {{ $t('defaults.my_page') }}
    </h1>

    <v-row class="mx-auto mb-10">
      <v-col cols="12">
        <v-hover v-slot="{ profileHover }">
          <v-card
            :elevation="profileHover ? 12 : 2"
            max-width="500px"
            class="mx-auto pa-5"
            @click="openEditUserDialog()"
          >
            <v-list-item>
              <v-list-item-avatar color="indigo" size="50">
                <span class="white--text text-h5">{{ authUser.name.charAt(0) }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-center">{{ authUser.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="pink">mdi-heart</v-icon>
      {{ $t('defaults.favorite_spot') }}
    </h2>

    <v-divider class="mb-2" style="max-width: 700px; margin: auto" />

    <!-- お気に入り登録されているスポットがある時に表示 -->
    <template v-if="spotDetails.length != 0">
      <div class="d-flex justify-center">
        <!-- 画面幅がxs,smの時に表示 -->
        <v-row class="mt-0 mx-auto hidden-md-and-up">
          <v-col v-for="spotDetail in spotDetails" :key="spotDetail.id" cols="12" sm="6">
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2" max-width="400px" style="margin: auto">
                <v-img
                  :src="spotDetail.video.thumbnail"
                  alt="サムネイル"
                  @click="openDialog(spotDetail)"
                  style="cursor: pointer"
                >
                </v-img>
                <FavoriteButton :is-favorite="true" :spot-detail="spotDetail" @click="unBookmark" />
                <div class="d-flex justify-space-between">
                  <v-list-item>
                    <v-list-item-content>
                      <template v-if="$i18n.locale === 'ja'">
                        <v-list-item-title>{{ spotDetail.name }}</v-list-item-title>
                        <v-list-item-subtitle class="mt-1">{{
                          spotDetail.area.name
                        }}</v-list-item-subtitle>
                      </template>
                      <template v-if="$i18n.locale === 'en'">
                        <v-list-item-title>{{ spotDetail.name_ens }}</v-list-item-title>
                        <v-list-item-subtitle class="mt-1">{{
                          spotDetail.area.name_ens
                        }}</v-list-item-subtitle>
                      </template>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1 align-center"
                      text
                      @click="setSpot(spotDetail.area, spotDetail)"
                      >{{ $t('defaults.spot_detail') }}</v-btn
                    >
                  </v-card-actions>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- 画面幅がmd, lg, xlで表示 -->
        <v-row class="hidden-sm-and-down" style="max-width: 1000px; margin: auto">
          <v-col
            v-for="spotDetail in spotDetails"
            :key="spotDetail.id"
            cols="12"
            lg="6"
            md="12"
            sm="12"
          >
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto">
                <div class="d-flex justify-space-between">
                  <div class="d-flex flex-column">
                    <FavoriteButton
                      :is-favorite="true"
                      :spot-detail="spotDetail"
                      @click="unBookmark"
                    />
                    <v-list-item style="width: 160px">
                      <v-list-item-content class="mt-3">
                        <template v-if="$i18n.locale === 'ja'">
                          <v-list-item-title>{{ spotDetail.name }}</v-list-item-title>
                          <v-list-item-subtitle class="mt-1">{{
                            spotDetail.area.name
                          }}</v-list-item-subtitle>
                        </template>
                        <template v-if="$i18n.locale === 'en'">
                          <v-list-item-title>{{ spotDetail.name_ens }}</v-list-item-title>
                          <v-list-item-subtitle class="mt-1">{{
                            spotDetail.area.name_ens
                          }}</v-list-item-subtitle>
                        </template>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                    <v-btn
                      color="blue darken-1 align-center"
                      text
                      @click="setSpot(spotDetail.area, spotDetail)"
                      >{{ $t('defaults.spot_detail') }}</v-btn
                    >
                  </div>
                  <v-img
                    :src="spotDetail.video.thumbnail"
                    alt="サムネイル"
                    @click="openDialog(spotDetail)"
                    style="cursor: pointer"
                  />
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </template>

    <!-- お気に入り登録されているスポットがない時に表示 -->
    <template v-else>
      <v-chip
        label
        large
        class="mt-10 d-flex justify-center"
        color="pink"
        text-color="white"
        style="max-width: 700px; margin: auto"
      >
        <v-icon left>mdi-heart-plus-outline</v-icon>
        {{ $t('profile.attention') }}
      </v-chip>
      <v-col class="d-flex justify-center mt-3">
        <v-btn color="black" outlined to="/" style="text-transform: none">
          <v-icon left>mdi-keyboard-backspace</v-icon>
          {{ $t('profile.home_button') }}
        </v-btn>
      </v-col>
    </template>

    <!-- ユーザ編集ダイアログボックス -->
    <v-row justify="center">
      <v-dialog persistent v-model="userDialog" max-width="600px">
        <v-card>
          <h2 class="d-flex align-center justify-center py-2">{{ $t('profile.edit') }}</h2>
          <v-divider style="max-width: 700px; margin: auto" />
          <v-form v-model="valid">
            <v-card-text class="py-0">
              <v-container>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  prepend-icon="mdi-account-circle"
                  :label="$t('form.name')"
                  placeholder="2〜10文字"
                  validate-on-blur
                  required
                />
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  :label="$t('form.email')"
                  validate-on-blur
                  required
                />
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="#78909c" text @click="resetEditUserDialog()"> Close </v-btn>
              <v-btn color="blue darken-1" text type="button" :disabled="!valid" @click="editUser">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- 動画のダイアログを表示 -->
    <v-dialog v-model="dialog" max-width="1200px">
      <Dialog
        :title="title"
        :videoId="videoId"
        :viewCount="viewCount"
        :publishedAt="publishedAt"
        :urlForEmbedVideo="urlForEmbedVideo"
        :area="area"
        :spot="spot"
        @set-spot="setSpot"
        @reset-dialog="resetDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import axios from '../plugins/axios';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Dialog from '../components/dialogs/HomeVideoDialog.vue';
import { FavoriteButton } from '@/components/elements/button';

export default {
  components: { Dialog, FavoriteButton },
  metaInfo: {
    title: 'Profile',
  },
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
      heart: [],
      // ダイアログに渡すdata
      dialog: false,
      valid: false,
      userDialog: false,
      title: '',
      videoId: '',
      viewCount: '',
      publishedAt: '',
      urlForEmbedVideo: '',
      area: {},
      spot: {},
      // プロフィール編集用プロパティ
      name: '',
      email: '',
      nameRules: [
        (v) => !!v || this.$t('validate.name_presence'),
        (v) => v.length <= 10 || this.$t('validate.name_invalid'),
        (v) => v.length >= 2 || this.$t('validate.name_invalid'),
      ],
      emailRules: [
        (v) => !!v || this.$t('validate.email_presence'),
        (v) => /.+@.+\..+/.test(v) || this.$t('validate.email_invalid'),
      ],
    };
  },
  created() {
    this.getBookmarks();
  },
  watch: {
    // ダイアログの状態を監視（表示、非表示の切り替えと同時にdataをリセット）
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters('users', ['authUser']),
  },
  methods: {
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    // クリックしたカードの地点の国の詳細ページに遷移させる処理
    setSpot(area, spot) {
      // 地点のカウント数を+1する
      this.clickCount(spot);
      axios.get(`/countries/${area.id}`).then((res) => {
        this.$router.push({
          name: 'SpotResult',
          params: { id: res.data.area.id, spotId: spot.id },
        });
      });
    },
    // カードがクリックされた時に+1カウントされる
    clickCount(spot) {
      axios
        .get(`/spots/${spot.id}/edit`)
        .catch((error) => {
          console.log(error);
        });
    },
    // お気に入りに登録されている地点を取得
    getBookmarks() {
      axios
        .get('/bookmarks')
        .then((res) => {
          this.spotDetails = res.data.spots
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // お気に入り登録を解除する
    unBookmark(id) {
      // お気に入りスポットの配列から削除（非同期処理）
      this.spotDetails = this.spotDetails.filter((item) => item.id !== id);
      axios.delete(`/bookmarks/${id}`).catch((error) => {
        console.log(error);
      });
    },
    // ユーザ編集
    async editUser() {
      await axios
        .put(`/users/${this.authUser.id}`, {
          name: this.name,
          email: this.email,
        })
        .then((res) => {
          this.resetEditUserDialog();
          // 異常系
          if (res.data.status === 'fail') {
            this.openSnackbar(this.$t('form.error'));
            return;
          }
          // 正常系
          this.openSnackbar(this.$t('form.edit_success'));
          this.authUser.name = this.name;
          this.authUser.email = this.email;
        });
    },
    // ダイアログの表示
    openDialog(spot) {
      this.dialog = true;
      this.title = spot.video.title;
      this.videoId = spot.video.video_id;
      this.viewCount = spot.video.view_count;
      this.publishedAt = spot.video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1&playlist=${this.videoId}`;
      this.area = spot.area;
      this.spot = spot;
    },
    // ダイアログを非表示にしdataを空にする
    resetDialog() {
      this.dialog = false;
      this.title = '';
      this.videoId = '';
      this.description = '';
      this.viewCount = '';
      this.urlForEmbedVideo = '';
      this.area = {};
      this.spot = {};
    },
    // ユーザ編集のダイアログを開く
    openEditUserDialog() {
      this.name = this.authUser.name;
      this.email = this.authUser.email;
      this.userDialog = true;
    },
    // ユーザ編集のダイアログを閉じる
    resetEditUserDialog() {
      this.userDialog = false;
    },
  },
};
</script>

<style scoped>
.v-responsive__content {
  position: relative;
}
.btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>

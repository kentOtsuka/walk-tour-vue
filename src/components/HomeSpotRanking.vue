<template>
  <div>
    <h2 class="d-flex align-center justify-center">
      <v-icon left bottom color="red">mdi-fire</v-icon>
      {{ $t('defaults.hot_spot') }}
    </h2>
    <v-divider class="mb-2 mx-auto" style="max-width: 1200px; width: 90%" />

    <!-- 画面幅がxs,smの時に表示 -->
    <v-row class="mx-auto mb-2 hidden-md-and-up">
      <v-col
        v-for="spotDetail in smallLimitCount"
        :key="spotDetail.id"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" max-width="400px" style="margin: auto">
            <v-img
              :src="spotDetail.video.thumbnail"
              alt="サムネイル"
              @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video)"
              style="cursor: pointer"
            />
            <template v-if="authUser">
              <FavoriteButton
                v-if="spotDetail.heart == true"
                :is-favorite="true"
                :spot-detail="spotDetail"
                @click="unBookmark"
              />

              <FavoriteButton
                v-if="spotDetail.heart == false"
                :is-favorite="false"
                :spot-detail="spotDetail"
                @click="bookmark"
              />
            </template>
            <div class="d-flex justify-space-between">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="mb-2">
                    {{ $t('defaults.spot_order', { number: spotDetail.id + 1 }) }}
                  </v-list-item-subtitle>
                  <template v-if="$i18n.locale === 'ja'">
                    <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                    <v-list-item-subtitle class="mt-1">{{
                      spotDetail.area.name
                    }}</v-list-item-subtitle>
                  </template>
                  <template v-if="$i18n.locale === 'en'">
                    <v-list-item-title>{{ spotDetail.spot.name_ens }}</v-list-item-title>
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
                  @click="setSpot(spotDetail.area, spotDetail.spot)"
                  >{{ $t('defaults.spot_detail') }}</v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- 画面幅がxlで表示 -->
    <v-sheet class="mx-auto d-none d-xl-flex" max-width="1400">
      <v-slide-group class="px-4" active-class="success" show-arrows height="400">
        <v-slide-item v-for="spotDetail in bigLimitCount" :key="spotDetail.id">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" width="300" class="ma-2" style="margin: auto">
              <v-img
                :src="spotDetail.video.thumbnail"
                alt="サムネイル"
                @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video)"
                style="cursor: pointer"
              />
              <template v-if="authUser">
                <FavoriteButton
                  v-if="spotDetail.heart == true"
                  :is-favorite="true"
                  :spot-detail="spotDetail"
                  @click="unBookmark"
                />

                <FavoriteButton
                  v-if="spotDetail.heart == false"
                  :is-favorite="false"
                  :spot-detail="spotDetail"
                  @click="bookmark"
                />
              </template>
              <div class="d-flex justify-space-between">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle class="mb-2">
                      {{ $t('defaults.spot_order', { number: spotDetail.id + 1 }) }}
                    </v-list-item-subtitle>
                    <template v-if="$i18n.locale === 'ja'">
                      <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                      <v-list-item-subtitle class="mt-1">{{
                        spotDetail.area.name
                      }}</v-list-item-subtitle>
                    </template>
                    <template v-if="$i18n.locale === 'en'">
                      <v-list-item-title>{{ spotDetail.spot.name_ens }}</v-list-item-title>
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
                    @click="setSpot(spotDetail.area, spotDetail.spot)"
                    >{{ $t('defaults.spot_detail') }}</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <!-- 画面幅がmd, lgで表示 -->
    <v-sheet class="mx-auto d-none d-md-flex d-lg-flex d-xl-none" max-width="1080">
      <v-slide-group class="px-4" active-class="success" show-arrows height="400">
        <v-slide-item v-for="spotDetail in bigLimitCount" :key="spotDetail.id">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" width="300" class="ma-2" style="margin: auto">
              <v-img
                :src="spotDetail.video.thumbnail"
                alt="サムネイル"
                @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video)"
                style="cursor: pointer"
              />
              <template v-if="authUser">
                <FavoriteButton
                  v-if="spotDetail.heart == true"
                  :is-favorite="true"
                  :spot-detail="spotDetail"
                  @click="unBookmark"
                />

                <FavoriteButton
                  v-if="spotDetail.heart == false"
                  :is-favorite="false"
                  :spot-detail="spotDetail"
                  @click="bookmark"
                />
              </template>
              <div class="d-flex justify-space-between">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle class="mb-2">
                      {{ $t('defaults.spot_order', { number: spotDetail.id + 1 }) }}
                    </v-list-item-subtitle>
                    <template v-if="$i18n.locale === 'ja'">
                      <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                      <v-list-item-subtitle class="mt-1">{{
                        spotDetail.area.name
                      }}</v-list-item-subtitle>
                    </template>
                    <template v-if="$i18n.locale === 'en'">
                      <v-list-item-title>{{ spotDetail.spot.name_ens }}</v-list-item-title>
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
                    @click="setSpot(spotDetail.area, spotDetail.spot)"
                    >{{ $t('defaults.spot_detail') }}</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-col class="d-flex justify-center">
      <v-btn color="red" outlined to="/spotRanking">
        <v-icon left class="b-1">mdi-crown</v-icon>
        {{ $t('top.ranking_button') }}
      </v-btn>
    </v-col>

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
  </div>
</template>

<script>
import axios from '../plugins/axios';
import { mapGetters } from 'vuex';
import Dialog from '../components/dialogs/HomeVideoDialog.vue';
import { FavoriteButton } from './elements/button';

export default {
  components: { Dialog, FavoriteButton },
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
      // 地点ランキング上位三つの各オブジェクトを格納する配列
      spotBookmarks: [],
      // ダイアログに渡すdata
      dialog: false,
      title: '',
      videoId: '',
      viewCount: Number,
      publishedAt: '',
      urlForEmbedVideo: '',
      area: {},
      spot: {},
    };
  },
  created() {
    // ログイン中の時のみ実行
    if (this.authUser) {
      // お気に入りに登録されている地点を取得
      this.getBookmarks();
      // すべての地点を取得し表示
      this.getSpot();
    } else {
      this.getSpot();
    }
  },
  // データの変更
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
    // 画面幅（xl, sm）に合わせてホットスポットの表示制限
    smallLimitCount() {
      return this.spotDetails.slice(0, 3);
    },
    // 画面幅（md, lg）に合わせてホットスポットの表示制限
    bigLimitCount() {
      return this.spotDetails.slice(0, 8);
    },
  },
  methods: {
    // すべての地点とその国、動画を取得
    getSpot() {
      axios.get('/spots').then((res) => {
        // クリック数順に並び替え
        res.data.spots
          .sort((a, b) => {
            return a.click_count - b.click_count;
          })
          .reverse();
        for (let i = 0; i < res.data.spots.length; i++) {
          // 取得した地点の中にユーザがお気に入り登録している地点があるかを判別する
          if (this.spotBookmarks.includes(res.data.spots[i].id)) {
            this.spotDetails.push({
              id: i,
              spot: res.data.spots[i],
              area: res.data.spots[i].area,
              video: res.data.spots[i].video,
              heart: true,
            });
          } else {
            this.spotDetails.push({
              id: i,
              spot: res.data.spots[i],
              area: res.data.spots[i].area,
              video: res.data.spots[i].video,
              heart: false,
            });
          }
        }
      });
    },
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
          for (let i = 0; i < res.data.spots.length; i++) {
            this.spotBookmarks.push(res.data.spots[i].id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // お気に入りに登録する
    bookmark(id) {
      this.spotDetails[id].heart = true;
      axios
        .post('/bookmarks', { id: this.spotDetails[id].spot.id})
        .catch((error) => {
          console.log(error);
        });
    },
    // お気に入り登録を解除する
    unBookmark(id) {
      // お気に入りスポットの配列から削除（非同期処理）
      this.spotDetails[id].heart = false;
      axios
        .delete(`/bookmarks/${this.spotDetails[id].spot.id}`)
        .catch((error) => {
          console.log(error);
        });
    },
    // ダイアログの表示
    openDialog(area, spot, video) {
      this.dialog = true;
      this.title = video.title;
      this.videoId = video.video_id;
      this.viewCount = video.view_count;
      this.publishedAt = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1&playlist=${this.videoId}`;
      this.area = area;
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

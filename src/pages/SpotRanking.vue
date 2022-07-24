<template>
  <v-container class="mb-16">
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="red">mdi-fire</v-icon>
      ホットスポット
    </h2>

    <v-divider class="mb-2" style="max-width: 700px; margin: auto" />

    <div class="d-flex justify-center">
      <!-- 画面幅がxs,smの時に表示 -->
      <v-row class="mx-auto hidden-md-and-up">
        <v-col v-for="spotDetail in spotDetails" :key="spotDetail.id" cols="12" sm="6">
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
                    <v-list-item-subtitle small
                      >ランキング第{{ spotDetail.id + 1 }}位</v-list-item-subtitle
                    >
                    <v-list-item-title class="my-1">{{ spotDetail.spot.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1 align-center"
                    text
                    @click="setSpot(spotDetail.area, spotDetail.spot)"
                    >行ってみる！</v-btn
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
                  <v-list-item style="width: 160px">
                    <template v-if="authUser">
                      <v-list-item-content class="pt-12">
                        <v-list-item-subtitle class="mb-2"
                          >ランキング第{{ spotDetail.id + 1 }}位</v-list-item-subtitle
                        >
                        <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-content>
                        <v-list-item-subtitle class="mb-2"
                          >ランキング第{{ spotDetail.id + 1 }}位</v-list-item-subtitle
                        >
                        <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-divider />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="setSpot(spotDetail.area, spotDetail.spot)"
                    >行ってみる！</v-btn
                  >
                </div>
                <v-img
                  :src="spotDetail.video.thumbnail"
                  alt="サムネイル"
                  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video)"
                  style="cursor: pointer"
                />
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>

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
import Dialog from '../components/dialogs/HomeVideoDialog.vue';
import { FavoriteButton } from '../components/elements/button';

export default {
  components: { Dialog, FavoriteButton },
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
      // ユーザがお気に入り登録している地点のidを格納する配列
      spotBookmarks: [],
      // ダイアログに渡すdata
      dialog: false,
      title: '',
      videoId: '',
      viewCount: '',
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
  },
  methods: {
    // すべての地点とその国、動画を取得
    getSpot() {
      axios.get('/spots').then((res) => {
        // クリック数順に並び替え
        res.data.ranking
          .sort((a, b) => {
            return a.click_count - b.click_count;
          })
          .reverse();
        for (let i = 0; i < res.data.ranking.length; i++) {
          // 取得した地点の中にユーザがお気に入り登録している地点があるかを判別する
          if (this.spotBookmarks.includes(res.data.ranking[i].spot.id)) {
            this.spotDetails.push({
              id: i,
              spot: res.data.ranking[i].spot,
              area: res.data.ranking[i].area,
              video: res.data.ranking[i].video,
              heart: true,
            });
          } else {
            this.spotDetails.push({
              id: i,
              spot: res.data.ranking[i].spot,
              area: res.data.ranking[i].area,
              video: res.data.ranking[i].video,
              heart: false,
            });
          }
        }
      });
    },
    // クリックしたカードの地点の国の詳細ページに遷移させる処理
    setSpot(area, spot) {
      // 地点のカウント数を+1する
      this.clickCount(spot, area);
      axios.get(`/countries/${area.id}`).then((res) => {
        this.$router.push({
          name: 'SpotResult',
          params: { id: res.data.area.id, spotId: spot.id },
        });
      });
    },
    // カードがクリックされた時に+1カウントされる
    clickCount(spot, area) {
      axios
        .get(`/countries/${area.id}/spots/${spot.id}/edit`)
        .then((res) => {
          console.log(res.data.status);
        })
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
    bookmark(id, spot) {
      this.spotDetails[id].heart = true;
      axios
        .post('/bookmarks', { spot_id: spot })
        // .then(res => {
        //   console.log(res.data.status);
        // })
        .catch((error) => {
          console.log(error);
        });
    },
    // お気に入り登録を解除する
    unBookmark(id, spot) {
      // お気に入りスポットの配列から削除（非同期処理）
      this.spotDetails[id].heart = false;
      axios
        .delete(`/bookmarks/${spot}`)
        // .then(res => {
        //   console.log(res.data.status);
        // })
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

<template>
  <div>
    <h2 class="d-flex align-center justify-center">
      <v-icon left bottom color="red">mdi-fire</v-icon>
      ホットスポット
    </h2>
    <v-divider class="mb-2 mx-auto" style="max-width: 1200px; width: 90%;"></v-divider>

    <!-- 画面幅がxs,smの時に表示 -->
    <v-row class="mx-auto mb-2 hidden-md-and-up">
      <v-col v-for="spotDetail in smallLimitCount" :key="spotDetail.id" cols="12" sm="12" md="4" lg="4">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" max-width="400px" style="margin: auto;">
            <v-img :src="spotDetail.video.thumbnail" alt="サムネイル"  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video);" style="cursor: pointer"></v-img>
            <template v-if="authUser">
              <v-btn v-if="spotDetail.heart == true" class="btn ma-2" fab small color="white" @click="unBookmark(spotDetail.id, spotDetail.spot.id)">
                <v-icon color="pink">mdi-heart</v-icon>
              </v-btn>
              <v-btn v-else class="btn ma-2" fab small color="white" @click="bookmark(spotDetail.id, spotDetail.spot.id)">
                <v-icon color="pink">mdi-heart-outline</v-icon>
              </v-btn>
            </template>
            <div class="d-flex justify-space-between">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle small>ランキング第{{ spotDetail.id + 1 }}位</v-list-item-subtitle>
                  <v-list-item-title class="my-1">{{ spotDetail.spot.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn color="blue darken-1 align-center" text  @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる！</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- 画面幅がmd, lg, xlで表示 -->
    <v-sheet class="mx-auto hidden-sm-and-down" max-width="1400">
      <v-slide-group class="px-4" active-class="success" show-arrows height="400">
        <v-slide-item
          v-for="spotDetail in bigLimitCount" :key="spotDetail.id">
          <v-hover v-slot="{ hover }">
            <v-card  :elevation="hover ? 12 : 2" width="300" class="ma-2" style="margin: auto;">
              <v-img :src="spotDetail.video.thumbnail" alt="サムネイル"  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video);" style="cursor: pointer"></v-img>
              <template v-if="authUser">
                <v-btn v-if="spotDetail.heart == true" class="btn ma-2" fab small color="white" @click="unBookmark(spotDetail.id, spotDetail.spot.id)">
                  <v-icon color="pink">mdi-heart</v-icon>
                </v-btn>
                <v-btn v-else class="btn ma-2" fab small color="white" @click="bookmark(spotDetail.id, spotDetail.spot.id)">
                  <v-icon color="pink">mdi-heart-outline</v-icon>
                </v-btn>
              </template>
              <div class="d-flex justify-space-between">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle class="mb-2">ランキング第{{ spotDetail.id + 1 }}位</v-list-item-subtitle>
                    <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                    <v-list-item-subtitle class="mt-1">{{ spotDetail.area.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-btn color="blue darken-1 align-center" text  @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる！</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-col class="d-flex justify-center">
      <v-btn
        color="red"
        outlined
        to="/spotRanking"
      >
        <v-icon left>mdi-crown</v-icon>
        ランキング一覧を見てみる
      </v-btn>
    </v-col>

    <!-- ダイアログボックス -->
    <v-dialog v-model="dialog" max-width="1200px">
      <v-card>
        <v-col>
          <v-responsive :aspect-ratio="16/9">
            <iframe
              width="100%"
              height="100%"
              :src="urlForEmbedVideo"
              frameborder="0"
              autoplay
              allowfullscreen
              modestbranding="1"
            ></iframe>
          </v-responsive>
        </v-col>
        <v-card-subtitle class="py-0 font-weight-bold secondary--text">{{ title }}</v-card-subtitle>
        <v-card-subtitle class="my-0 hidden-sm-and-down">{{ view_count.toLocaleString() }}回視聴・{{ published_at }}</v-card-subtitle>
        <v-col class="d-flex justify-center pt-2">
          <v-btn
            color="blue darken-1"
            outlined
            @click="setSpot(area, spot)"
          >
            <v-icon left>mdi-video</v-icon>
            {{ spot.name }}のVtour動画一覧
          </v-btn>
        </v-col>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetDialog()"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
      // 地点ランキング上位三つの各オブジェクトを格納する配列
      spotBookmarks: [],
      // ダイアログに渡すdata
      dialog: false,
      title: '',
      video_id: '',
      view_count: '',
      published_at: '',
      urlForEmbedVideo: '',
      area: {},
      spot: {},
    }
  },
  created() {
    // ログイン中の時のみ実行
    if(this.authUser) {
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
        this.resetDialog()
      }
    },
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters("users", ["authUser"]),
    // 画面幅（xl, sm）に合わせてホットスポットの表示制限
    smallLimitCount() {
      return this.spotDetails.slice(0,3);
    },
    // 画面幅（md, lg）に合わせてホットスポットの表示制限
    bigLimitCount() {
      return this.spotDetails.slice(0,8);
    },
  },
  methods: {
    // すべての地点とその国、動画を取得
    getSpot() {
      axios.get('/all_spot')
      .then( res => {
        for(let i = 0; i < res.data.spots.length; i++) {
          // 取得した地点の中にユーザがお気に入り登録している地点があるかを判別する
          if (this.spotBookmarks.includes(res.data.spots[i].id)) {
            this.spotDetails.push( {id: i, spot: res.data.spots[i], area: res.data.areas[i], video: res.data.videos[i], heart: true } );
          } else {
            this.spotDetails.push( {id: i, spot: res.data.spots[i], area: res.data.areas[i], video: res.data.videos[i], heart: false } );
          }
        };
      })
    },
    // クリックしたカードの地点の国の詳細ページに遷移させる処理
    setSpot(area, spot) {
      // 地点のカウント数を+1する
      this.clickCount(spot, area)
      axios.get(`/countries/${spot.country_id}/spots`)
      .then( res => {
        this.$router.push({ name: "SpotResult", params: { id: res.data.area.id, spotId: spot.id} });
      })
    },
    // カードがクリックされた時に+1カウントされる
    clickCount(spot, area) {
      axios.get(`/countries/${area.id}/spots/${spot.id}/edit`)
      .then(res => {
        console.log(res.data.status);
      })
      .catch(error => {
        console.log(error);
      })
    },
    // お気に入りに登録されている地点を取得
    getBookmarks() {
      axios.get('/bookmarks')
      .then( res => {
        for(let i = 0; i < res.data.spots.length; i++) {
          this.spotBookmarks.push(res.data.spots[i].id);
        };
      })
      .catch(error => {
        console.log(error);
      });
    },
    // お気に入りに登録する
    bookmark(id, spot) {
      this.spotDetails[id].heart = true;
      axios.post('/bookmarks', { spot_id: spot })
      // .then(res => {
      //   console.log(res.data.status);
      // })
      .catch(error => {
        console.log(error);
      });
    },
    // お気に入り登録を解除する
    unBookmark(id, spot) {
      // お気に入りスポットの配列から削除（非同期処理）
      this.spotDetails[id].heart = false;
      axios.delete(`/bookmarks/${spot}`)
      // .then(res => {
      //   console.log(res.data.status);
      // })
      .catch(error => {
        console.log(error);
      });
    },
    // ダイアログの表示
    openDialog(area, spot, video) {
      this.dialog = true;
      this.title = video.title;
      this.video_id = video.video_id;
      this.view_count = video.view_count;
      this.published_at = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.video_id}`;
      this.area =  area;
      this.spot =  spot;
    },
    // ダイアログを非表示にしdataを空にする
    resetDialog() {
      this.dialog = false;
      this.title = '';
      this.video_id = '';
      this.description = '';
      this.view_count = '';
      this.urlForEmbedVideo = '';
      this.area =  [];
      this.spot = [];
    },
  }
}
</script>

<style scoped>
.v-responsive__content{
  position: relative;
}
.btn{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>
<template>
  <div>
    <router-link to="/spotRanking" style="color: #455A64; text-decoration: none;">
      <h2 class="mb-1 d-flex align-center justify-center">
        <v-icon left bottom>mdi-map-marker-outline</v-icon>
        ホットスポット
      </h2>
    </router-link>
    <v-divider class="mb-2"></v-divider>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" class="my-1">
        <v-hover v-slot="{ hover }">
          <v-card  :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
            <v-img :src="firstVideo.thumbnail" alt="サムネイル"  @click="openDialog(firstArea, firstSpot, firstVideo);" style="cursor: pointer"></v-img>
            <div class="d-flex justify-space-between">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ firstSpot.name }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">{{ firstArea.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn color="blue darken-1 align-center" outlined  @click="setSpot(firstArea, firstSpot)">他の動画を見る</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="my-1">
        <v-hover v-slot="{ hover }">
          <v-card  :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
            <v-img :src="secondVideo.thumbnail" alt="サムネイル"  @click="openDialog(secondArea, secondSpot, secondVideo);" style="cursor: pointer"></v-img>
            <div class="d-flex justify-space-between">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ secondSpot.name }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">{{ secondArea.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn color="blue darken-1" outlined  @click="setSpot(secondArea, secondSpot)">他の動画を見る</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" class="my-1">
        <v-hover v-slot="{ hover }">
          <v-card  :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
            <v-img :src="thirdVideo.thumbnail" alt="サムネイル"  @click="openDialog(thirdArea, thirdSpot, thirdVideo);" style="cursor: pointer"></v-img>
            <div class="d-flex justify-space-between">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ thirdSpot.name }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">{{ thirdArea.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn color="blue darken-1" outlined  @click="setSpot(thirdArea, thirdSpot)">他の動画を見る</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

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
        <v-card-subtitle class="my-0 pb-1">{{ view_count.toLocaleString() }}回視聴・{{ published_at }}</v-card-subtitle>
        <v-space></v-space>
        <v-col class="d-flex justify-center pt-0">
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

export default {
  data() {
    return {
      // 地点ランキング上位三つの各オブジェクト
      firstSpot: {},
      secondSpot: {},
      thirdSpot: {},
      firstArea: {},
      secondArea: {},
      thirdArea: {},
      firstVideo: {},
      secondVideo: {},
      thirdVideo: {},
      // ダイアログに渡すdata
      dialog: false,
      title: '',
      video_id: '',
      view_count: '',
      published_at: '',
      urlForEmbedVideo: '',
      area: [],
      spot: [],
    }
  },
  created() {
    this.getSpot();
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
  methods: {
    // すべての地点とその国、動画を取得
    getSpot() {
      axios.get('/all_spot')
      .then( res => {
        this.firstSpot = res.data.spots[0]
        this.secondSpot = res.data.spots[1]
        this.thirdSpot = res.data.spots[2]
        this.firstArea = res.data.areas[0]
        this.secondArea = res.data.areas[1]
        this.thirdArea = res.data.areas[2]
        this.firstVideo = res.data.videos[0]
        this.secondVideo = res.data.videos[1]
        this.thirdVideo = res.data.videos[2]
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
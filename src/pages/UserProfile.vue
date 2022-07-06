<template>
  <v-container class="my-16">
    <h1 class="mb-3 d-flex align-center justify-center">
      <v-icon left bottom>mdi-account-circle</v-icon>
      マイページ
    </h1>

    <v-row class="mx-auto mb-10">
      <v-col cols="12">
        <v-card max-width="500px" class="mx-auto pa-5">
          <v-list-item>
            <v-list-item-avatar
              color="indigo"
              size="50"
            >
              <span class="white--text text-h5">{{ authUser.name.charAt(0) }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-center">{{ authUser.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="mb-3 d-flex align-center justify-center">
      <v-icon left bottom color="pink">mdi-cards-heart</v-icon>
      Favorite Spot
    </h2>
    <v-divider class="mb-2" style="max-width: 700px; margin: auto;"></v-divider>
    <div class="d-flex justify-center">
      <v-row style="max-width: 1000px; margin: auto;">
        <v-col v-for="spotDetail in spotDetails" :key="spotDetail.id" cols="12" lg="6" md="12" sm="12">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
              <div class="d-flex justify-space-between">
                <div class="d-flex flex-column">
                  <v-list-item style="width: 160px;">
                    <v-list-item-content>
                      <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-btn color="blue darken-1 align-center" class="hidden-sm-and-down" text @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる！</v-btn>
                </div>
                <v-img :src="spotDetail.video.thumbnail" alt="サムネイル"  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video);" class="hidden-sm-and-down" style="cursor: pointer"></v-img>
                <v-card-actions class="hidden-md-and-up">
                  <v-btn color="blue darken-1 align-center" text @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>

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
        <v-spacer></v-spacer>
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
  </v-container>
</template>

<script>
import axios from '../plugins/axios'
import { mapGetters } from "vuex"

export default {
  props: {
    id: String
  },
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
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
    this.getBookmarks()
  },
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
  },
  methods: {
    // ブックマークに登録されている地点を取得
    getBookmarks() {
      axios.get('/bookmarks')
      .then(res => {
        for(let i = 0; i < res.data.spots.length; i++) {
          this.spotDetails.push( {id: i, spot: res.data.spots[i], area: res.data.areas[i], video: res.data.videos[i]} )
        };
      })
      .catch(error => {
        console.log(error);
      });
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
  },
}
</script>
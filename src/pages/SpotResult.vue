<template>
  <v-container class="mb-16">
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="cyan darken-1">mdi-earth</v-icon>
      {{ area.name }}
    </h2>
    <v-divider class="mb-2" style="max-width: 700px; margin: auto;"></v-divider>
    <v-row no-gutters class="my-5">
      <v-col>
        <GoogleMap :area="area" :spots="spots" :spot="spot" @get-video="getVideo" @click-count="clickCount"></GoogleMap>
      </v-col>
    </v-row>

    <template v-if="videos.length != 0">
      <v-row style="max-width: 1200px; margin: auto;">
        <v-col cols="12" sm="6" md="6" lg="6" class="d-lg-flex align-lg-end d-md-flex align-md-end d-sm-flex align-sm-end pb-0">
          <h3 class="mb-2 d-flex align-center justify-center">
            <v-icon left bottom>mdi-map-marker</v-icon>
            {{ spotName }}
            <!--  ログイン中のユーザーにのみお気に入りマークを表示 -->
            <template v-if="authUser">
              <v-icon v-if="heart" right bottom class="d-flex d-sm-none" color="pink" @click="unBookmark()">mdi-heart</v-icon>
              <v-icon v-else right bottom class="d-flex d-sm-none" color="pink" @click="bookmark()">mdi-heart-outline</v-icon>
            </template>
          </h3>
          <!--  ログイン中のユーザーにのみお気に入りマークを表示 -->
          <template v-if="authUser">
            <v-icon v-if="heart" right bottom class="mb-2 d-none d-sm-flex" color="pink" @click="unBookmark()">mdi-heart</v-icon>
            <v-icon v-else right bottom class="mb-2 d-none d-sm-flex" color="pink" @click="bookmark()">mdi-heart-outline</v-icon>
          </template>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6" class="pa-0">
          <v-tabs right v-model="currentTab">
            <v-tab @click="viewOrder(videos)" :value="'viewTab'">閲覧順</v-tab>
            <v-tab @click="newOrder(videos)">新着順</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <v-divider style="max-width: 1200px; margin: auto;"></v-divider>
    </template>
    <template v-else>
      <v-chip label large class="mt-10 d-flex justify-center" color="light-blue lighten-1" text-color="white" style="max-width: 700px; margin: auto;">
        <v-icon left>mdi-cursor-default-click-outline</v-icon>
        マーカーをクリックしてください
      </v-chip>
    </template>
    <Video :videos="videos" :area="area.name" :spot="spotName"></Video>
  </v-container>
</template>

<script>
import axios from '../plugins/axios'
import { mapGetters } from "vuex"
import GoogleMap from '../components/TheGoogleMap.vue'
import Video from '../components/BaseVideo.vue'

export default {
  components: { GoogleMap, Video },
  props: {
    id: Number,
    spotId: Number
  },
  data() {
    return {
      area: {},
      spots: [],
      spot: {},
      // お気に入り登録する際に使うspotデータ
      markSpot: {},
      heart: false,
      spotName: '',
      videos: [],
      // タブのフォーカス
      currentTab: "viewTab",
    }
  },
  created() {
    // spotIdを引き継いでいれば（ホットスポットからの遷移であれば）spotIdに関する動画も一覧表示する
    if(this.spotId == undefined) {
      this.setSpot()
    } else {
      this.setSpotAndVideo()
    }
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters("users", ["authUser"]),
  },
  methods: {
    // 国に関する地点を取得
    setSpot() {
      axios.get(`/spots`, {
        params: {
          country_id: this.id
        }
      })
      .then(res => {
        this.area = res.data.area
        this.spots = res.data.spots
      })
      .catch(error => {
        console.log(error)
        this.$router.push({ name: "Home" })
      })
    },
    // 地点に関する動画一覧ページに遷移する処理
    getVideo(spot, area) {
      // マーカークリックと同時に'閲覧順'にフォーカスを当てる
      this.currentTab = "viewTab"
      axios.get(`/videos`, {
        params: {
          id: spot.id,
          area_name: area.name,
          iso: area.iso,
          spot_name: spot.name,
          spot_name_ens: spot.name_ens
        }
      })
      .then(res => {
        this.videos = res.data;
        this.spotName = spot.name
        // お気に入り登録されているかを確認
        if(this.authUser) {
          this.bookmarked(this.spot);
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 地点の表示と動画の一覧表示を同時に行う処理
    setSpotAndVideo() {
      axios.get(`/spots`, {
        params: {
          country_id: this.id
        }
      })
      .then(res => {
        this.area = res.data.area
        this.spots = res.data.spots
        let i = 0;
        // APIで取得した地点の中でpropsで引き継いだ地点と同じものを探す
        while (i < this.spots.length) {
          if (this.spots[i].id == this.spotId) {
            this.spot = this.spots[i]
            break;
          }
          i++;
        }
        // propsで引き継いだ地点の動画を取得
        this.getVideo(this.spot, this.area);
        // お気に入り登録されているかを確認
        if(this.authUser) {
          this.bookmarked(this.spot);
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push({ name: "Home" })
      })
    },
    // マーカー(地点)がクリックされた時に+1カウントされる
    clickCount(spot, area) {
      this.markSpot = spot;
      axios.get(`/countries/${area.id}/spots/${spot.id}/edit`)
      // .then(res => {
      //   console.log(res.data.status);
      // })
      .catch(error => {
        console.log(error);
      });
    },
    // お気に入り済みかを確認
    bookmarked(spot) {
      axios.get('/bookmarked', {
        params: {
          spot_id: spot.id
        }
      })
      .then(res => {
        if(res.data.status == 'yes') {
          this.heart = true;
        } else {
          this.heart = false;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    // お気に入りに登録する
    bookmark() {
      this.heart = true;
      if(this.markSpot.id == undefined) {
        axios.post('/bookmarks', { spot_id: this.spot.id })
        // .then(res => {
        //   console.log(res.data.status);
        // })
        .catch(error => {
          console.log(error);
        });
      } else {
        axios.post('/bookmarks', { spot_id: this.markSpot.id })
        // .then(res => {
        //   console.log(res.data.status);
        // })
        .catch(error => {
          console.log(error);
        });
      }
    },
    // お気に入り登録を解除する
    unBookmark() {
      this.heart = false;
      if(this.markSpot.id == undefined) {
        axios.delete(`/bookmarks/${this.spot.id}`)
        // .then(res => {
        //   console.log(res.data.status);
        // })
        .catch(error => {
          console.log(error);
        });
      } else {
        axios.delete(`/bookmarks/${this.markSpot.id}`)
        // .then(res => {
        //   console.log(res.data.status);
        // })
        .catch(error => {
          console.log(error);
        });
      }
    },
    // 動画を新着順に並び替える
    newOrder(videos) {
      this.videos = videos.sort(function(a, b) {
        return (a.published_at > b.published_at) ? -1 : 1;  //オブジェクトの昇順ソート
      });
    },
    // 動画を閲覧順に並び替える
    viewOrder(videos) {
      this.videos = videos.sort(function(a, b) {
        return (a.view_count < b.view_count) ? -1 : 1;  //オブジェクトの昇順ソート
      }).reverse();
    },
  }
}
</script>
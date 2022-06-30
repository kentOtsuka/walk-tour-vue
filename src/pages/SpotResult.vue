<template>
  <div>
    <h2>{{ area.name }}</h2>
    <v-divider class="mb-2"></v-divider>
    <v-row no-gutters class="my-5">
      <v-col>
        <GoogleMap :area="area" :spots="spots" :spot="spot" @get-video="getVideo" @click-count="clickCount"></GoogleMap>
      </v-col>
    </v-row>

    <template v-if="videos.length != 0">
      <v-row>
        <v-col lg="6" class="d-flex align-end">
          <h3>{{ spot_name }}</h3>
        </v-col>
        <v-col lg="6">
          <v-tabs right v-model="currentTab">
            <v-tab @click="viewOrder(videos)" :value="'viewTab'">閲覧順</v-tab>
            <v-tab @click="newOrder(videos)">新着順</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
    </template>
    <template v-else>
      <v-chip label large class="mt-10 d-flex justify-center" color="light-blue lighten-1" text-color="white">
        <v-icon left>mdi-cursor-default-click-outline</v-icon>
        マーカーをクリックしてください
      </v-chip>
    </template>
    <Video :videos="videos"></Video>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import GoogleMap from '../components/GoogleMap.vue'
import Video from '../components/Video.vue'

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
      spot_name: '',
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
    // 立ち上がり時に国に関する地点を取得
  },
  methods: {
    // 国に関する地点を取得
    setSpot() {
      axios.get(`/countries/${this.id}/spots`)
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
      axios.get(`/many_video`, {
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
        this.spot_name = spot.name
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 地点の表示と動画の一覧表示を同時に行う処理
    setSpotAndVideo() {
      axios.get(`/countries/${this.id}/spots`)
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
        };
        // propsで引き継いだ地点の動画を取得
        this.getVideo(this.spot, this.area);
      })
      .catch(error => {
        console.log(error)
        this.$router.push({ name: "Home" })
      })
    },
    // マーカー(地点)がクリックされた時に+1カウントされる
    clickCount(spot, area) {
      axios.get(`/countries/${area.id}/spots/${spot.id}/edit`)
      .then(res => {
        console.log(res.data.status);
      })
      .catch(error => {
        console.log(error);
      })
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
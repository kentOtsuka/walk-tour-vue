<template>
  <div>
    <BackGroundVideo :areas="areas" :spots="spots" />
    <div class="mx-lg-16 my-8" style="color: #455a64">
      <!-- jqvmapで世界地図を表示 -->
      <WorldMap class="hidden-sm-and-down" />
      <!-- サービスについての説明 -->
      <UseGuide class="mb-10" />
      <!-- 最近新たに追加されたスポットを表示 -->
      <NewSpot class="mb-10" />
      <!-- ホットスポットの上位三つを表示 -->
      <HomeRanking />
    </div>
  </div>
</template>

<script>
import WorldMap from '../components/WorldMap.vue';
import HomeRanking from '../components/HomeSpotRanking.vue';
import NewSpot from '../components/NewAddSpot.vue';
import BackGroundVideo from '../components/BackGroundVideo.vue';
import UseGuide from '../components/UseGuide.vue';
import axios from '../plugins/axios';

export default {
  components: { WorldMap, HomeRanking, NewSpot, BackGroundVideo, UseGuide },
  data() {
    return {
      areas: [],
      spots: [],
    };
  },
  created() {
    this.getArea();
    this.getSpot();
  },
  methods: {
    // 地点を保有するエリア（国）を全て取得
    getArea() {
      axios.get('/countries').then((res) => (this.areas = res.data.areas));
    },
    // 地点を全て取得
    getSpot() {
      axios.get('/spots').then((res) => (this.spots = res.data.ranking.map((obj) => obj.spot)));
    },
  },
};
</script>

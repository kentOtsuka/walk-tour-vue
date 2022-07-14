<template>
  <div>
    <BackGroundVideo></BackGroundVideo>
    <div class="mx-lg-16 my-8" style="color: #455A64;">
      <!-- 地点から動画を表示させるための検索窓 -->
      <!-- jqvmapで世界地図を表示 -->
      <WorldMap class="hidden-sm-and-down"></WorldMap>
      <!-- ホットスポットの上位三つを表示 -->
      <HomeRanking></HomeRanking>
    </div>
  </div>
</template>

<script>
import WorldMap from '../components/WorldMap.vue'
import HomeRanking from '../components/HomeSpotRanking.vue'
import BackGroundVideo from '../components/BackGroundVideo.vue'


export default {
  components: { WorldMap, HomeRanking, BackGroundVideo },
}
</script>
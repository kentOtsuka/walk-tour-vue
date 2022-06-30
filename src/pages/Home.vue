<template>
  <div style="color: #455A64;">
    <!-- 地点から動画を表示させるための検索窓 -->
    <AutoComplete></AutoComplete>
    <!-- jqvmapで世界地図を表示 -->
    <WorldMap></WorldMap>
    <!-- ホットスポットの上位三つを表示 -->
    <HomeRanking></HomeRanking>
  </div>
</template>

<script>
import AutoComplete from '../components/AutoComplete.vue'
import WorldMap from '../components/WorldMap.vue'
import HomeRanking from '../components/HomeRanking.vue'

export default {
  components: { WorldMap, AutoComplete, HomeRanking },
}
</script>
<template>
  <div>
    <!-- 地点から動画を表示させるための検索窓 -->
    <AutoComplete></AutoComplete>
    <!-- jqvmapで世界地図を表示 -->
    <WorldMap @set-area="setArea"></WorldMap>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import WorldMap from '../components/WorldMap.vue'
import AutoComplete from '../components/AutoComplete.vue'

export default {
  components: { WorldMap, AutoComplete },
  data() {
    return {
      // ダイアログの表示、非表示
      area: {},
      spots: [],
      dialog: false,
    }
  },
  watch: {
    // ダイアログの状態を監視（表示、非表示の切り替えと同時にdataをリセット）
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
  },
  methods: {
    // クリックした国に関するダイアログが表示される
    setArea(iso) {
      // iso二桁コードをもとにクリックされた国を取得
      axios.get('/countries', {
        params: {
          iso: iso
        }
      })
      .then( res => {
        this.area = res.data;
        this.$router.push({ name: "SpotResult", params: { id: this.area.id } });
      })
      .catch( res => {
        // 地点登録がない場合は遷移せずアラートで表示
        var message = res.response.data.name + 'の登録情報はありません';
        alert(message);
      });
    },
  }
}
</script>
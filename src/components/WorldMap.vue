<template>
  <div>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="blue darken-1">mdi-map-outline</v-icon>
      地図から探す
    </h2>
    <v-divider class="mb-2 mx-auto" style="max-width: 1200px; width: 90%;" ></v-divider>
    <div class="d-flex justify-center mt-5" style="margin: auto;" >
      <div
        id="vmap"
        style="width: 900px; height: 600px; margin: auto;"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios'
window.jQuery = require('jquery');
var $ = window.jQuery;

export default {
  mounted() {
    this.drawMap();
    this.checkedArea();
  },
  methods:{
    // jqvmapを描く処理
    drawMap(){
      $('#vmap').vectorMap({
        color: '#f0f0f1',
        map: 'world_en',
        backgroundColor: '#fff',
        hoverOpacity: 0.3,
        // hoverColor: '#2980b9',
        selectedColor: "#f0f0f1",
        enableZoom: true,
        // 国名をマウスオーバー時に表示させる
        showTooltip: false,
        normalizeFunction: 'polynomial',
        // 国をクリックすると発火するアクション
        onRegionClick: (element, code) => {
          var iso = code.toUpperCase();
          this.setArea(iso);
        }
      });
    },
    // 地点登録のある国のみ色付けして表示する処理
    checkedArea(){
      axios.get('/set_country')
      .then( res => {
        var areas = res.data.iso;
        for (let i = 0; i <= areas.length; i++) {
        // iso二桁コードをもとに国の色付け
          $('#vmap').vectorMap('set', 'colors', areas[i], '#5D99FF');
        };
      })
    },
    // クリックされた国の詳細ページに遷移させる処理
    setArea(iso) {
      // iso二桁コードをもとにクリックされた国を取得
      axios.get('/countries', {
        params: {
          iso: iso
        }
      })
      .then( res => {
        this.$router.push({ name: "SpotResult", params: { id: res.data.id } });
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

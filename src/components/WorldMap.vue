<template>
  <div>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="blue darken-1">mdi-map-outline</v-icon>
      {{ $t('top.world_map') }}
    </h2>
    <v-divider class="mb-2 mx-auto" style="max-width: 1200px; width: 90%" />
    <div class="d-flex justify-center mt-5" style="margin: auto">
      <div id="vmap" style="width: 900px; height: 600px" />
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';
window.jQuery = require('jquery');
let $ = window.jQuery;

export default {
  mounted() {
    this.drawMap();
    this.checkedArea();
  },
  methods: {
    // jqvmapを描く処理
    drawMap() {
      $('#vmap').vectorMap({
        color: '#f0f0f1',
        map: 'world_en',
        backgroundColor: '#fff',
        hoverOpacity: 0.3,
        // hoverColor: '#2980b9',
        selectedColor: '#f0f0f1',
        enableZoom: true,
        // 国名をマウスオーバー時に表示させる
        showTooltip: false,
        normalizeFunction: 'polynomial',
        // 国をクリックすると発火するアクション
        onRegionClick: (element, code) => {
          let iso = code.toUpperCase();
          this.setArea(iso);
        },
      });
    },
    // 地点登録のある国のみ色付けして表示する処理
    checkedArea() {
      axios.get('/countries').then((res) => {
        let areas = res.data.areas
        for (let i = 0; i < areas.length; i++) {
          // iso二桁コードをもとに国の色付け
          $('#vmap').vectorMap('set', 'colors', areas[i].iso.toLowerCase(), '#5D99FF');
        }
      });
    },
    // クリックされた国の詳細ページに遷移させる処理
    setArea(iso) {
      // iso二桁コードをもとにクリックされた国を取得
      axios.get('/countries', {
        params: {
            type: 'all',
        },
      }).then((res) => {
        let areas = res.data.areas;
        let area = areas.find(area => area.iso == String(iso))
        if (area.spots.length != 0) {
          this.$router.push({ name: 'SpotResult', params: { id: area.id } });
        } else {
          // 地点登録がない場合は遷移せずアラートで表示
          // 日本語
          if (this.$i18n.locale === 'ja') {
            alert(area.name + 'の登録情報はありません');
            return;
          }
          // 英語
          alert('There is no registration information for ' + area.name_ens);
        }
      })
    },
  },
};
</script>

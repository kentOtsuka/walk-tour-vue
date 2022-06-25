<template>
  <div ref="map" class="map"></div>
</template>

<script>
export default {
  props: {
    area: Object,
    spots: Array,
  },
  data() {
    return {
      latlng: [],
      // ダイアログの表示、非表示
      dialog: false,
      spot: '',
      title: '',
      video_id: '',
      view_count: '',
      published_at: '',
      // Youtube動画の埋め込み用URL
      videos: [],
      randomVideo: {},
      urlForEmbedVideo: '',
      // アクティブ中のマーカー
      focusMarker: null,
      // 現在開いているinfoWindow
      currentInfoWindow: null,
    };
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
  mounted() {
    let timer = setInterval(() => {

      const google = window.google;
      if (google) {
        clearInterval(timer);

        let marker = [];
        // クリック時に表示される情報ウィンドウ
        let infoWindowSpot = [];
        // カーソルホバー時に表示される情報ウィンドウ
        let infoWindowHover = [];
        const standardIcon = "http://maps.google.co.jp/mapfiles/ms/icons/blue-dot.png"
        const focusIcon = "http://maps.google.co.jp/mapfiles/ms/icons/yellow-dot.png"

        let map = new google.maps.Map(this.$refs.map, {
          // マップを全画面モードで表示するボタンを非表示
          fullscreenControl: false,
          // ストリートビューに切り替えるボタンを非表示
          streetViewControl: false,
          //地図と航空写真を切り替えるボタンを非表示
          mapTypeControl: false,
          scrollwheel: false,
          zoom: 4
        });

        // エリア（国、都道府県）から緯度経度を取得し地図に表示
        new google.maps.Geocoder().geocode({ address: this.area.name },(results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0].geometry) {
              // 緯度経度を取得
              this.latlng = results[0].geometry.location;
              // 地図の中心に配置
              map.setCenter(this.latlng);
              // 全エリアが表示されるように設定
              map.fitBounds(results[0].geometry.bounds);
            }
          } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert("見つかりません");
          } else {
            console.log(status);
            alert("エラー発生");
          }
        });

        // エリア内の各地点にマーカーを立てる
        for (let i = 0; i < this.spots.length; i++) {
          // 地点の緯度経度
          let spotLatLng = { lat: Number(this.spots[i].lat), lng: Number(this.spots[i].lng) };
          // 地点にマーカーをたてる
          marker[i] = new google.maps.Marker({
            position: spotLatLng,
            map,
            icon: standardIcon,
            animation: google.maps.Animation.DROP,
          });
          // マーカークリック時に動画の情報ウィンドウを表示
          marker[i].addListener("click", () => {
            // 開かれている情報ウィンドウがあれば閉じる処理
            if (this.currentInfoWindow) {
              this.currentInfoWindow.close();
            };
            // アクティブ状態のマーカーがあれば行う処理
            if (this.focusMarker) {
              // アクティブ中のマーカーを通常iconに戻す
              this.focusMarker.setIcon({
                url: standardIcon,
              });
              // アクティブ中のマーカーのバウンドを止める
              this.focusMarker.setAnimation(
                null
              );
            }
            // アクティブ中のマーカーのみ色を変更する
            marker[i].setIcon({
              url: focusIcon,
            });
            // アクティブ中のマーカーのみバウンドさせる
            marker[i].setAnimation(
              google.maps.Animation.BOUNCE
            );
            // 情報ウィンドウを固定で表示する
            infoWindowSpot[i].open(map, marker[i]);
            this.getVideo(marker[i], infoWindowSpot[i],this.spots[i], this.area)
          });
          // マーカーにマウスオーバー時に地点名の情報ウィンドウを表示
          marker[i].addListener("mouseover", () => {
            infoWindowHover[i].open(map, marker[i]);
          });
          // マーカーからマウスアウトした時に地点名の情報ウィンドウを非表示
          marker[i].addListener("mouseout", () => {
            infoWindowHover[i].close(map, marker[i]);
          });
          // 情報ウィンドウ内に国名を表示
          infoWindowHover[i] = new google.maps.InfoWindow({
            content: `<div class="mb-0"><h2>${this.spots[i].name}</h2></div>`
          });
          // 情報ウィンドウ内に国名を表示
          infoWindowSpot[i] = new google.maps.InfoWindow({
            content: `<div class="mb-0"><h2>${this.spots[i].name}</h2></div>`
          });
        }
      }
    }, 500);
  },
  methods: {
    // 地点に関する動画一覧ページに遷移する処理
    getVideo(marker, infoWindow, spot, area) {
      // マーカーをアクティブ状態にする
      this.focusMarker = marker
      // マーカーの情報ウィンドウに印をつける
      this.currentInfoWindow = infoWindow
      this.$emit("get-video", spot, area);
    },
    openDialog(video, spot) {
      this.dialog = true;
      this.spot = spot
      this.title = video.title;
      this.video_id = video.video_id;
      this.view_count = video.view_count;
      this.published_at = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.video_id}`;
      // this.urlForPlayYoutubeApp = `https://www.youtube.com/watch?v=${this.video_id}`;
    },
    resetDialog() {
      this.dialog = false;
      this.title = ''
      this.video_id = ''
      this.description = ''
      this.view_count = ''
      this.urlForEmbedVideo = ''
    },
  }
};
</script>

<style scoped>
.map {
  margin: auto;
  height: 400px;
  max-width: 600px;
}
</style>
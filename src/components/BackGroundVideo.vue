<template>
  <div class="mv">
    <!--  メイン全体を囲うdiv  -->
    <div class="mv-wrap">
      <!--   薄いレイヤー   -->
      <div class="mv-bg"></div>
      <!--   videoタグ   -->
      <video id="video" webkit-playsinline="" playsinline="" muted="" autoplay="" loop="" src="../assets/bgvideo_2.mp4"></video>
      <!--   動画の上に載せるテキスト   -->
      <div class="mv-txt">
        <p class="mb-0">VtourHub</p>
        <p style="font-size: xx-large;">
          気になるへ国に行こう
        </p>
        <AutoComplete></AutoComplete>
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplete from './AutoComplete.vue'

export default {
  components: { AutoComplete }
}
</script>

<style scoped>
.mv {
  width: 100%;
  /* height: 100%; */
  position: relative;
  overflow: hidden;

}

.mv-wrap {
  position: relative;
  height: 100vh;
}

video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
}

.mv-bg {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 30, 0, 0.2);
  z-index: 2;
}

.mv-txt {
  font-size: small;
  color: #fff;
  font-size: 50px;
  max-width: 600px;
  width: 90%;
  height: 250px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  margin: auto;
  text-align: center;
}
</style>
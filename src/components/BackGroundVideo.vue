<template>
  <div class="mv">
    <!--  メイン全体を囲うdiv  -->
    <div class="mv-wrap">
      <!--   薄いレイヤー   -->
      <div class="mv-bg" />
      <!--   videoタグ   -->
      <video
        id="video"
        webkit-playsinline=""
        playsinline=""
        muted=""
        autoplay=""
        loop=""
        src="../../public/bgvideo_2.mp4"
      />
      <!--   動画の上に載せるテキスト   -->
      <div class="mv-txt">
        <p class="mb-0">VtourHub</p>
        <p style="font-size: xx-large">{{ $t('top.subtitle') }}</p>
        <AutoComplete :areas="areas" />
        <p class="font-weight-black text-decoration-underline" style="font-size: x-large">
          {{ $t('top.count', { areas: areas.length, spots: spots.length }) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplete from './AutoComplete.vue';

export default {
  components: { AutoComplete },
  props: {
    areas: {
      type: Array,
      required: true,
    },
    spots: {
      type: Array,
      required: true,
    },
  },
};
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
  background-color: rgba(0, 30, 0, 0.4);
  z-index: 2;
}

.mv-txt {
  font-size: small;
  color: #fff;
  font-size: 50px;
  max-width: 600px;
  width: 90%;
  height: 400px;
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

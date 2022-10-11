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
        <!-- <p style="font-size: x-large; margin-top: 120px;">地図、新規スポット、ホットスポットから探す</p> -->
        <p class="mb-0" style="font-size: x-large; margin-top: 95px">Scroll Down</p>
        <div class="container">
          <div class="field">
            <div class="scroll"></div>
          </div>
        </div>
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

HTML SCSSResult Skip Results Iframe EDIT ON * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.field {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
}

@keyframes wheel {
  to {
    opacity: 0;
    top: 60px;
  }
}

@-webkit-keyframes wheel {
  to {
    opacity: 0;
    top: 60px;
  }
}

.scroll {
  width: 60px;
  height: 60px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
}

.scroll::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 18px;
  width: 18px;
  height: 18px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
}

@keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}

@-webkit-keyframes down {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translateY(15px);
  }
  40% {
    transform: translate(0);
  }
}

@keyframes scroll {
  0% {
    height: 40px;
  }
  30% {
    height: 70px;
  }
  60% {
    height: 40px;
  }
}

@-webkit-keyframes scroll {
  0% {
    height: 40px;
  }
  30% {
    height: 70px;
  }
  60% {
    height: 40px;
  }
}
</style>

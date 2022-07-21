<template>
  <v-card>
    <v-col>
      <v-responsive :aspect-ratio="16/9">
        <iframe
          width="100%"
          height="100%"
          :src="urlForEmbedVideo"
          frameborder="0"
          autoplay
          allowfullscreen
          modestbranding="1"
        ></iframe>
      </v-responsive>
    </v-col>
    <v-card-subtitle class="py-0 font-weight-bold secondary--text">{{ title }}</v-card-subtitle>
    <v-card-subtitle class="my-0 hidden-sm-and-down">{{ viewCount.toLocaleString() }}回視聴・{{ publishedAt }}</v-card-subtitle>
    <v-col class="d-flex justify-center pt-2">
      <v-btn
        color="blue darken-1"
        outlined
        @click="setSpot(area, spot)"
      >
        <v-icon left>mdi-video</v-icon>
        {{ spot.name }}のVtour動画一覧
      </v-btn>
    </v-col>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="resetDialog()"
      >
        CLOSE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    videoId: String,
    viewCount: String,
    publishedAt: String,
    urlForEmbedVideo: String,
    area: Object,
    spot: Object,
  },
  methods: {
    setSpot(area, spot) {
      this.$emit("set-spot", area, spot)
    },
    resetDialog() {
      this.$emit("reset-dialog")
    },
  }
}
</script>
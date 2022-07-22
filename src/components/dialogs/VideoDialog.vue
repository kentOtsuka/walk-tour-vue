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
    <v-card-subtitle class="my-0 pb-1 hidden-sm-and-down">{{ viewCount.toLocaleString() }}回視聴・{{ publishedAt }}</v-card-subtitle>
    <v-col class="d-flex justify-center pt-2">
      <v-btn
        color="blue darken-1"
        outlined
        style="text-transform: none"
        @click="shareTwitter(title, videoId)"
      >
        <v-icon left>mdi-twitter</v-icon>
        Twitterに共有
      </v-btn>
    </v-col>
    <v-divider class="mt-2"></v-divider>
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
    shareTwitter(title, videoId) {
      this.$emit("share-twitter", title, videoId)
    },
    resetDialog() {
      this.$emit("reset-dialog")
    },
  }
}
</script>
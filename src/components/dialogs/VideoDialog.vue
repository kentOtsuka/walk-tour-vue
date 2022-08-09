<template>
  <v-card>
    <v-col>
      <v-responsive :aspect-ratio="16 / 9">
        <iframe
          width="100%"
          height="100%"
          :src="urlForEmbedVideo"
          frameborder="0"
          autoplay
          allowfullscreen
          modestbranding="1"
        />
      </v-responsive>
    </v-col>
    <v-card-subtitle class="py-0 font-weight-bold secondary--text">{{ title }}</v-card-subtitle>
    <v-card-subtitle class="my-0 pb-0 hidden-sm-and-down">
      {{
        $t('defaults.video_detail', {
          count: viewCount.toLocaleString(),
          published_at: publishedAt,
        })
      }}
    </v-card-subtitle>
    <v-col class="d-flex justify-center pt-2">
      <v-btn
        color="blue darken-1"
        outlined
        style="text-transform: none"
        @click="shareTwitter(title, videoId)"
      >
        <v-icon left>mdi-twitter</v-icon>
        {{ $t('defaults.share') }}
      </v-btn>
    </v-col>
    <v-divider class="mt-2" />
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="resetDialog()"> CLOSE </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    viewCount: {
      type: [String, Number],
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    urlForEmbedVideo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    spot: {
      type: String,
      required: true,
    },
  },
  methods: {
    shareTwitter(title, videoId) {
      this.$emit('share-twitter', title, videoId);
    },
    resetDialog() {
      this.$emit('reset-dialog');
    },
  },
};
</script>

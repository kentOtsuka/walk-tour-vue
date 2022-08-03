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
    <v-card-subtitle class="my-0 hidden-sm-and-down">
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
        @click="setSpot(area, spot)"
        style="text-transform: none"
      >
        <v-icon left>mdi-video</v-icon>
        <template v-if="this.$i18n.locale === 'ja'">
          {{
            $t('defaults.videos', {
              spot: spot.name,
            })
          }}
        </template>
        <template v-if="this.$i18n.locale === 'en'">
          {{
            $t('defaults.videos', {
              spot: spot.name_ens,
            })
          }}
        </template>
      </v-btn>
    </v-col>
    <v-divider />
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
      type: String,
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
      type: Object,
      required: true,
    },
    spot: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSpot(area, spot) {
      this.$emit('set-spot', area, spot);
    },
    resetDialog() {
      this.$emit('reset-dialog');
    },
  },
};
</script>

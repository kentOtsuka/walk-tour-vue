<template>
  <div>
    <v-row style="max-width: 1200px; margin: auto">
      <v-col
        v-for="video in videos"
        :key="video.video_id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        class="my-1"
      >
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" max-width="400px" style="margin: auto">
            <v-img
              :src="video.thumbnail"
              alt="サムネイル"
              @click="openDialog(video)"
              style="cursor: pointer"
            />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ video.title }}</v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  {{
                    $t('defaults.video_detail', {
                      count: video.view_count.toLocaleString(),
                      published_at: video.published_at,
                    })
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- ダイアログボックス -->
    <v-dialog v-model="dialog" max-width="1300px">
      <Dialog
        :title="title"
        :videoId="videoId"
        :viewCount="viewCount"
        :publishedAt="publishedAt"
        :urlForEmbedVideo="urlForEmbedVideo"
        :spot="spot"
        @share-twitter="shareTwitter"
        @reset-dialog="resetDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import Dialog from '../components/dialogs/VideoDialog.vue';

export default {
  components: { Dialog },
  props: {
    videos: {
      type: Array,
      required: true,
    },
    area: {
      type: Object,
      required: true,
    },
    spot: {
      type: String,
      required: true,
    },
    spotEns: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // ダイアログの表示、非表示
      dialog: false,
      title: '',
      videoId: '',
      viewCount: '',
      publishedAt: '',
      // Youtube動画の埋め込み用URL
      urlForEmbedVideo: '',
    };
  },
  // データの変更
  watch: {
    // ダイアログの状態を監視（表示、非表示の切り替えと同時にdataをリセット）
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
  },
  methods: {
    // ダイアログの表示
    openDialog(video) {
      console.log(video.thumbnail)
      this.dialog = true;
      this.title = video.title;
      this.videoId = video.video_id;
      this.viewCount = video.view_count;
      this.publishedAt = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1&playlist=${this.videoId}`;
    },
    // ダイアログを非表示にしdataを空にする
    resetDialog() {
      this.dialog = false;
      this.title = '';
      this.videoId = '';
      this.description = '';
      this.viewCount = '';
      this.urlForEmbedVideo = '';
    },
    // VideoリンクをTwitterにシェア
    shareTwitter(videoId) {
      const spot_ens = this.spotEns.replace(/\s+/g, '');
      const area_ens = this.area.name_ens.replace(/\s+/g, '');
      var shareURL =
        'https://twitter.com/intent/tweet?text=' +
        this.$t('share.dialog.content', {
          spot: this.spot,
          spot_ens: this.spotEns,
          id: this.area.id,
        }) +
        `%0a%0a%23${this.$t('share.dialog.spot_name', { spot: this.spot, spot_ens: spot_ens })}` +
        `%0a%23${this.$t('share.dialog.area_name', {
          area: this.area.name,
          area_ens: area_ens,
        })}` +
        `%0a%23${this.$t('share.dialog.travel')}` +
        '%20%23walkingtour' +
        '%0a%23VtourHub' +
        `%0ayoutu.be/${videoId}`;
      window.open(shareURL, '_blank');
    },
  },
};
</script>

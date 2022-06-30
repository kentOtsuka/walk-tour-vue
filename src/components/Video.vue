<template>
  <div>
    <v-row>
      <v-col v-for="video in videos" :key="video.videoId" cols="12" sm="6" md="6" lg="4" class="my-1">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
            <v-img :src="video.thumbnail" alt="サムネイル"  @click="openDialog(video);" style="cursor: pointer"></v-img>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ video.title }}</v-list-item-title>
                <v-list-item-subtitle class="mt-1">{{ video.view_count.toLocaleString() }}回視聴・{{ video.published_at }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- ダイアログボックス -->
    <v-dialog v-model="dialog" max-width="1300px">
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
        <v-card-subtitle class="my-0 pb-1">{{ view_count.toLocaleString() }}回視聴・{{ published_at }}</v-card-subtitle>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    videos: Array
  },
  data() {
    return {
      // ダイアログの表示、非表示
      dialog: false,
      title: '',
      video_id: '',
      view_count: '',
      published_at: '',
      // Youtube動画の埋め込み用URL
      urlForEmbedVideo: ''
    }
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
  methods: {
    // ダイアログの表示
    openDialog(video) {
      this.dialog = true;
      this.title = video.title;
      this.video_id = video.video_id;
      this.view_count = video.view_count;
      this.published_at = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.video_id}`;
      // this.urlForPlayYoutubeApp = `https://www.youtube.com/watch?v=${this.video_id}`;
    },
    // ダイアログを非表示にしdataを空にする
    resetDialog() {
      this.dialog = false;
      this.title = '';
      this.video_id = '';
      this.description = '';
      this.view_count = '';
      this.urlForEmbedVideo = '';
    },
  }
}
</script>
<template>
  <v-container class="mb-16">
    <h1 class="mb-3 d-flex align-center justify-center">
      <v-icon left bottom color="teal darken-1">mdi-account-circle</v-icon>
      マイページ
    </h1>

    <v-row class="mx-auto mb-10">
      <v-col cols="12">
        <v-hover v-slot="{ profileHover }">
          <v-card :elevation="profileHover ? 12 : 2" max-width="500px" class="mx-auto pa-5" @click="openEditUserDialog();">
            <v-list-item>
              <v-list-item-avatar
                color="indigo"
                size="50"
              >
                <span class="white--text text-h5">{{ authUser.name.charAt(0) }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-center">{{ authUser.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom color="pink">mdi-heart</v-icon>
      Favorite Spot
    </h2>

    <v-divider class="mb-2" style="max-width: 700px; margin: auto;"></v-divider>

    <!-- お気に入り登録されているスポットがある時に表示 -->
    <template v-if="spotDetails.length != 0">
      <div class="d-flex justify-center">
        <!-- 画面幅がxs,smの時に表示 -->
        <v-row class="mt-0 mx-auto hidden-md-and-up">
          <v-col v-for="spotDetail in spotDetails" :key="spotDetail.id" cols="12" sm="6">
            <v-hover v-slot="{ hover }">
              <v-card  :elevation="hover ? 12 : 2" max-width="400px" style="margin: auto;">
                <v-img :src="spotDetail.video.thumbnail" alt="サムネイル"  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video);" style="cursor: pointer">
                </v-img>
                <v-btn class="btn ma-2" fab small color="white" @click="unBookmark(spotDetail.id, spotDetail.spot.id)">
                  <v-icon color="pink">mdi-heart</v-icon>
                </v-btn>
                <div class="d-flex justify-space-between">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="my-1">{{ spotDetail.spot.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-actions>
                    <v-btn color="blue darken-1 align-center" text  @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる！</v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <!-- 画面幅がmd, lg, xlで表示 -->
        <v-row class="hidden-sm-and-down" style="max-width: 1000px; margin: auto;">
          <v-col v-for="spotDetail in spotDetails" :key="spotDetail.id" cols="12" lg="6" md="12" sm="12">
            <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2" max-width="500px" style="margin: auto;">
                <div class="d-flex justify-space-between">
                  <div class="d-flex flex-column">
                    <v-btn class="btn ma-2" fab small color="white" @click="unBookmark(spotDetail.id, spotDetail.spot.id)">
                      <v-icon color="pink">mdi-heart</v-icon>
                    </v-btn>
                    <v-list-item style="width: 160px;">
                      <v-list-item-content class="mt-3">
                        <v-list-item-title>{{ spotDetail.spot.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ spotDetail.area.name }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-btn color="blue darken-1 align-center" text @click="setSpot(spotDetail.area, spotDetail.spot)">行ってみる！</v-btn>
                  </div>
                  <v-img :src="spotDetail.video.thumbnail" alt="サムネイル"  @click="openDialog(spotDetail.area, spotDetail.spot, spotDetail.video);" style="cursor: pointer"></v-img>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </template>

    <!-- お気に入り登録されているスポットがない時に表示 -->
    <template v-else>
      <v-chip label large class="mt-10 d-flex justify-center" color="pink" text-color="white" style="max-width: 700px; margin: auto;">
        <v-icon left>mdi-heart-plus-outline</v-icon>
        スポットをお気に入り登録してみよう！
      </v-chip>
      <v-col class="d-flex justify-center mt-3">
        <v-btn
          color="black"
          outlined
          to="/"
        >
        <v-icon left>mdi-keyboard-backspace</v-icon>
          トップページから探す
        </v-btn>
        </v-col>
    </template>

    <!-- ユーザ編集ダイアログボックス -->
    <v-row justify="center">
      <v-dialog
        v-model="userDialog"
        max-width="600px"
      >
        <v-card>
          <h2 class="d-flex align-center justify-center py-2">
            プロフィール編集
          </h2>
          <v-divider style="max-width: 700px; margin: auto;"></v-divider>
          <v-form v-model="valid">
            <v-card-text class="py-0">
              <v-container>
                <v-text-field
                  v-model="authUser.name"
                  :rules="nameRules"
                  prepend-icon="mdi-account-circle"
                  label="お名前"
                  placeholder="2〜10文字"
                  validate-on-blur
                  required
                ></v-text-field>
                <v-text-field
                  v-model="authUser.email"
                  :rules="emailRules"
                  prepend-icon="mdi-email"
                  label="メールアドレス"
                  validate-on-blur
                  required
                ></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="#78909c"
                text
                @click="resetEditUserDialog();"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                type="button"
                :disabled="!valid"
                @click="editUser"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>

        </v-card>
      </v-dialog>
    </v-row>

    <!-- ダイアログボックス -->
    <v-dialog v-model="dialog" max-width="1200px">
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
    </v-dialog>
  </v-container>
</template>

<script>
import axios from '../plugins/axios'
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      // すべての地点その国、動画オブジェクトを格納する配列
      spotDetails: [],
      heart: [],
      // ダイアログに渡すdata
      dialog: false,
      valid: false,
      userDialog: false,
      title: '',
      videoId: '',
      viewCount: '',
      publishedAt: '',
      urlForEmbedVideo: '',
      area: {},
      spot: {},
      nameRules: [
        v => !!v || 'お名前を入力してください',
        v => v.length <= 10 || '2〜10文字が有効です',
        v => v.length >= 2 || '2〜10文字が有効です',
      ],
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || '無効なメールアドレスです'
      ],
    }
  },
  created() {
    this.getBookmarks();
  },
  watch: {
    // ダイアログの状態を監視（表示、非表示の切り替えと同時にdataをリセット）
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
    userDialog() {
      if (!this.userDialog) {
        this.resetEditUserDialog();
      }
    },
  },
  computed: {
    // mapGettersでログイン中のユーザを取得
    ...mapGetters("users", ["authUser"]),
  },
  methods: {
    ...mapActions("util", ["openSnackbar", "closeSnackbar"]),
    // クリックしたカードの地点の国の詳細ページに遷移させる処理
    setSpot(area, spot) {
      // 地点のカウント数を+1する
      this.clickCount(spot, area)
      axios.get(`/spots`, {
        params: {
          country_id: spot.country_id
        }
      })
      .then( res => {
        this.$router.push({ name: "SpotResult", params: { id: res.data.area.id, spotId: spot.id} });
      })
    },
    // カードがクリックされた時に+1カウントされる
    clickCount(spot, area) {
      axios.get(`/countries/${area.id}/spots/${spot.id}/edit`)
      .then(res => {
        console.log(res.data.status);
      })
      .catch(error => {
        console.log(error);
      })
    },
    // お気に入りに登録されている地点を取得
    getBookmarks() {
      axios.get('/bookmarks')
      .then(res => {
        for(let i = 0; i < res.data.spots.length; i++) {
          this.spotDetails.push( {id: i, spot: res.data.spots[i], area: res.data.areas[i], video: res.data.videos[i]} )
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    // お気に入り登録を解除する
    unBookmark(id, spot) {
      // お気に入りスポットの配列から削除（非同期処理）
      this.spotDetails = this.spotDetails.filter((item) => item.id !== id);
      axios.delete(`/bookmarks/${spot}`)
      .catch(error => {
        console.log(error);
      });
    },
    // ユーザ編集
    async editUser() {
      await axios.put(`/users/${this.authUser.id}`, {
        name: this.authUser.name,
        email: this.authUser.email,
      })
      .then(res => {
        this.resetEditUserDialog();
        this.openSnackbar(res.data.message);
      })
    },
    // ダイアログの表示
    openDialog(area, spot, video) {
      this.dialog = true;
      this.title = video.title;
      this.videoId = video.video_id;
      this.viewCount = video.view_count;
      this.publishedAt = video.published_at;
      this.urlForEmbedVideo = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1&playlist=${this.videoId}`;
      this.area =  area;
      this.spot =  spot;
    },
    // ダイアログを非表示にしdataを空にする
    resetDialog() {
      this.dialog = false;
      this.title = '';
      this.videoId = '';
      this.description = '';
      this.viewCount = '';
      this.urlForEmbedVideo = '';
      this.area =  [];
      this.spot = [];
    },
    // ユーザ編集のダイアログを開く
    openEditUserDialog(){
      this.userDialog = true;
    },
    // ユーザ編集のダイアログを閉じる
    resetEditUserDialog() {
      this.userDialog = false;
    }
  },
}
</script>

<style scoped>
.v-responsive__content{
  position: relative;
}
.btn{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>
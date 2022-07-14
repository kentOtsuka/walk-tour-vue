<template>
  <div>
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        color="#5D99FF"
        class="white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="item in items"
            :key="item.icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon
              size="24px"
              @click.native="triggerClick(item.action)"
            >
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-text class="white--text">
          © {{ new Date().getFullYear() }} <strong>VtourHub</strong>
        </v-card-text>
      </v-card>
    </v-footer>

      <!-- プライバシーポリシーダイアログボックス -->
    <v-dialog v-model="privacyDialog" max-width="1500px">
      <Privacy @reset-dialog="closePrivacy()"></Privacy>
    </v-dialog>
    <!-- 利用規約ダイアログボックス -->
    <v-dialog v-model="termsDialog" max-width="1200px">
      <UseTerms @reset-dialog="closeTerms()"></UseTerms>
    </v-dialog>
  </div>
</template>

<script>
import Privacy from './PrivacyPolicy.vue'
import UseTerms from './UseTerms.vue'

export default {
  components: { Privacy, UseTerms },
  data() {
    return {
      items: [
        { icon: 'mdi-lock-outline', action: "privacy" },
        { icon: 'mdi-file-document-outline', action: "terms" },
        { icon: 'mdi-email-outline', action: "contact" },
        { icon: 'mdi-share-variant-outline', action: "share" },
        { icon: 'mdi-twitter', action: "twitter" },
      ],
      privacyDialog: false,
      termsDialog: false,
    }
  },
  methods: {
    triggerClick(action) {
      if (action === 'privacy') {
        this.openPrivacy();
      } else if (action === 'terms') {
        this.openTerms();
      } else if (action === 'contact') {
        this.contact();
      } else if (action === 'share') {
        this.share();
      } else if (action === 'twitter') {
        this.twitter();
      }
    },
    // プライバシーポリシーを表示する
    openPrivacy() {
      this.privacyDialog = true;
    },
    // プライバシーポリシーを非表示にする
    closePrivacy() {
      this.privacyDialog = false;
    },
    // 利用規約を表示する
    openTerms() {
      this.termsDialog = true;
    },
    // 利用規約を非表示にする
    closeTerms() {
      this.termsDialog = false;
    },
    // お問合せフォームを開く
    contact() {
      window.open('https://forms.gle/ywb5Q35iHSBmYM4s5', '_blank');
    },
    // 開発者Twitterを開く
    twitter() {
      window.open('https://twitter.com/O_H_K_N', '_blank');
    },
    // Twitterシェアを実行
    share() {
      var shareURL =
      'https://twitter.com/intent/tweet?text='
      +
      '%23VtourHub'
      +
      '%0a'
      +
      '%23walkingtour'
      +
      '%20%23citywalk'
      +
      '%20%23eveningWalk'
      +
      '%0a'
      +
      '&url='+'https://vtourhub.web.app/';
      window.open(shareURL, '_blank');
    },
  }
}
</script>
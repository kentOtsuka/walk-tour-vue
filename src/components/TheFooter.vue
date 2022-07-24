<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile width="100%" color="#5D99FF" class="white--text text-center">
        <v-card-text>
          <v-tooltip v-for="item in items" :key="item.icon" color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick(item.action)">
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>
        </v-card-text>

        <v-divider />
        <v-card-text class="white--text">
          © {{ new Date().getFullYear() }} <strong>VtourHub</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    <!-- プライバシーポリシーダイアログボックス -->
    <v-dialog v-model="privacyDialog" max-width="1500px">
      <Privacy @reset-dialog="closePrivacy()" :dialog="privacyDialog" />
    </v-dialog>
    <!-- 利用規約ダイアログボックス -->
    <v-dialog v-model="termsDialog" max-width="1200px">
      <UseTerms @reset-dialog="closeTerms()" :dialog="termsDialog" />
    </v-dialog>
  </div>
</template>

<script>
import Privacy from './PrivacyPolicy.vue';
import UseTerms from './UseTerms.vue';

export default {
  components: { Privacy, UseTerms },
  data() {
    return {
      items: [
        { icon: 'mdi-lock-outline', action: 'privacy', text: 'プライバシーポリシー' },
        { icon: 'mdi-file-document-outline', action: 'terms', text: '利用規約' },
        { icon: 'mdi-email-outline', action: 'contact', text: 'お問い合わせ' },
        { icon: 'mdi-share-variant-outline', action: 'share', text: 'Twitterシェア' },
        { icon: 'mdi-twitter', action: 'twitter', text: '開発者Twitter' },
      ],
      privacyDialog: false,
      termsDialog: false,
      obj: '',
    };
  },
  watch: {
    privacyDialog() {
      if (!this.privacyDialog) {
        this.closePrivacy();
      }
    },
    termsDialog() {
      if (!this.termsDialog) {
        this.closeTerms();
      }
    },
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
      this.obj = document.activeElement;
    },
    // プライバシーポリシーを非表示にする
    closePrivacy() {
      this.privacyDialog = false;
      this.obj.blur();
    },
    // 利用規約を表示する
    openTerms() {
      this.termsDialog = true;
      this.obj = document.activeElement;
    },
    // 利用規約を非表示にする
    closeTerms() {
      this.termsDialog = false;
      this.obj.blur();
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
        'https://twitter.com/intent/tweet?text=' +
        '%23VtourHub' +
        '%20で気になる街へ行こう' +
        '%0a' +
        '%234kwalk' +
        '%20%23citywalk' +
        '%20%23walkingtour' +
        '%0a' +
        'https://vtourhub.jp/';
      window.open(shareURL, '_blank');
    },
  },
};
</script>

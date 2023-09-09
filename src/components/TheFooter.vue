<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile width="100%" color="#5D99FF" class="white--text text-center">
        <v-card-text>
          <v-tooltip color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick('privacy')">
                  mdi-lock-outline
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('defaults.privacy') }}</span>
          </v-tooltip>
          <v-tooltip color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick('terms')">
                  mdi-file-document-outline
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('defaults.terms') }}</span>
          </v-tooltip>
          <v-tooltip color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick('contact')">
                  mdi-email-outline
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('defaults.contact') }}</span>
          </v-tooltip>
          <v-tooltip color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick('share')">
                  mdi-share-variant-outline
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('defaults.app_share') }}</span>
          </v-tooltip>
          <v-tooltip color="teal" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-4 white--text" v-bind="attrs" v-on="on" icon>
                <v-icon size="24px" @click.native="triggerClick('twitter')"> mdi-twitter </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('defaults.twitter') }}</span>
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
      <Privacy
        v-if="this.$i18n.locale === 'ja'"
        @reset-dialog="closePrivacy()"
        :dialog="privacyDialog"
      />
      <PrivacyEnglish
        v-if="this.$i18n.locale === 'en'"
        @reset-dialog="closePrivacy()"
        :dialog="privacyDialog"
      />
    </v-dialog>
    <!-- 利用規約ダイアログボックス -->
    <v-dialog v-model="termsDialog" max-width="1200px">
      <UseTerms
        v-if="this.$i18n.locale === 'ja'"
        @reset-dialog="closeTerms()"
        :dialog="termsDialog"
      />
      <UseTermsEnglish
        v-if="this.$i18n.locale === 'en'"
        @reset-dialog="closeTerms()"
        :dialog="termsDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import Privacy from './PrivacyPolicy.vue';
import PrivacyEnglish from './PrivacyPolicyEnglish.vue';
import UseTerms from './UseTerms.vue';
import UseTermsEnglish from './UseTermsEnglish.vue';

export default {
  components: { Privacy, PrivacyEnglish, UseTerms, UseTermsEnglish },
  data() {
    return {
      items: [{ icon: 'mdi-twitter', action: 'twitter', text: this.$t('defaults.twitter') }],
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
    // 公式Twitterを開く
    twitter() {
      window.open('https://twitter.com/VtourHub', '_blank');
    },
    // Twitterシェアを実行
    share() {
      var shareURL = 'https://twitter.com/intent/tweet?text=' + this.$t('share.footer.content');
      window.open(shareURL, '_blank');
    },
  },
};
</script>

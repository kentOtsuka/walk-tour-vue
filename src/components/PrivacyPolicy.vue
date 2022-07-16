<template>
  <v-card>
    <h2 class="d-flex align-center justify-center py-3">
          プライバシーポリシー
    </h2>
    <v-divider></v-divider>
    <v-col>
      <v-responsive :aspect-ratio="16/9">
        <div class="px-lg-4 px-md-3 px-sm-2">
          <h3>お客様から取得する情報</h3>
          <p class="mb-1">本サービスは、お客様から以下の情報を取得します。</p>
          <ul>
            <li>氏名(ニックネームやペンネームも含む)</li>
            <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
          </ul>
          <br>
          <h3>お客様の情報を利用する目的</h3>
          <p class="mb-1">本サービスは、お客様から取得した情報を、以下の目的のために利用します。</p>
          <ul>
            <li>本サービスに関する登録の受付、お客様の本人確認、認証のため</li>
            <li>お客様の本サービスの利用履歴を管理するため</li>
            <li>本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため</li>
            <li>提携する事業者・サービスのご案内をお送りするため</li>
            <li>お客様からのお問い合わせに対応するため</li>
            <li>本サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
            <li>以上の他、本サービスの提供、維持、保護及び改善のため</li>
          </ul>
          <br>
          <h3>安全管理のために講じた措置</h3>
          <p class="mb-1">本サービスが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。</p>
          <br>
          <h3>第三者提供</h3>
          <p class="mb-1">本サービスは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。</p>
          <ul>
            <li>個人データの取扱いを外部に委託する場合</li>
            <li>本サービスが買収された場合</li>
            <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
            <li>その他、法律によって合法的に第三者提供が許されている場合</li>
          </ul>
          <br>
          <h3>アクセス解析ツール</h3>
          <p class="mb-1">本サービスは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しく<a :href="'https://marketingplatform.google.com/about/analytics/terms/jp/'" class='text-blue-600'>こちら</a>からご確認ください。</p>
          <br>
          <h3>プライバシーポリシーの変更</h3>
          <p>本サービスは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。</p>
          <br>
          <h3>お問い合わせ</h3>
          <p>ご意見、ご要望、情報の訂正、利用停止、ユーザー情報の削除などをご希望の場合は、<a :href="'https://forms.gle/ywb5Q35iHSBmYM4s5'" target="_blank" rel="noopener noreferrer" class=" text-blue-600">こちら</a>からお問い合わせください。</p>
        </div>
      </v-responsive>
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
    dialog: Boolean,
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
  },
  methods: {
    resetDialog() {
      this.$emit("reset-dialog");
    },
  }
}
</script>
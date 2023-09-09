<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom>mdi-login</v-icon>
      {{ $t('defaults.login') }}
    </h2>
    <v-divider class="mb-4" style="max-width: 700px; margin: auto" />

    <v-row justify="center">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                prepend-icon="mdi-email"
                :label="$t('form.email')"
                validate-on-blur
                required
              />

              <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('form.password')"
                validate-on-blur
                required
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                outlined
                class="mr-2"
                width="100px"
                type="button"
                :disabled="!valid || loading"
                :loading="loading"
                @click="login"
              >
                {{ $t('defaults.login') }}
              </v-btn>
            </v-card-actions>
          </v-form>

          <v-divider />
          <v-card-text class="text-center" v-if="this.$i18n.locale === 'ja'">
            新規登録は<router-link to="/register">こちら</router-link>
          </v-card-text>
          <v-card-text class="text-center" v-if="this.$i18n.locale === 'en'">
            Click <router-link to="/register">here</router-link> for new registration
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  metaInfo: {
    title: 'ログイン',
  },
  data() {
    return {
      // ログインボタンの有効状態を表す(trueで有効)
      valid: false,
      loading: false,
      user: {
        email: '',
        password: '',
      },
      // メールアドレスのバリデーション
      emailRules: [
        (v) => !!v || this.$t('validate.email_presence'),
        (v) => /.+@.+\..+/.test(v) || this.$t('validate.email_invalid'),
      ],
      // パスワードのバリデーション
      passwordRules: [
        (v) => !!v || this.$t('validate.password_presence'),
        (v) => v.length >= 8 || this.$t('validate.password_invalid'),
        (v) => /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(v) || this.$t('validate.password_invalid'),
      ],
      // パスワードの表示状態を表す(trueで表示)
      showPassword: false,
    };
  },
  methods: {
    ...mapActions('users', ['loginUser']),
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    async login() {
      try {
        const status = await this.loginUser(this.user);

        // 異常系
        if (status === 'fail') {
          this.openSnackbar(this.$t('form.login_error'));
          return;
        }

        // 正常系
        this.$router.push({ name: 'UserProfile' });
        this.openSnackbar(this.$t('form.login_success'));
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

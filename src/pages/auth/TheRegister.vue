<template>
  <v-container>
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom>mdi-account-plus</v-icon>
      {{ $t('defaults.register') }}
    </h2>
    <v-divider class="mb-4" style="max-width: 700px; margin: auto" />

    <v-row justify="center">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                prepend-icon="mdi-account-circle"
                :label="$t('form.name')"
                validate-on-blur
                required
              />

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

              <v-text-field
                v-model="user.password_confirmation"
                :rules="passwordRules"
                prepend-icon="mdi-lock-outline"
                :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                :label="$t('form.password_confirmation')"
                validate-on-blur
                required
                @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              />
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                outlined
                class="mr-2"
                width="100px"
                type="button"
                :disabled="!valid"
                @click="register"
              >
                {{ $t('defaults.register') }}
              </v-btn>
            </v-card-actions>
          </v-form>

          <v-divider />
          <v-card-text class="text-center" v-if="this.$i18n.locale === 'ja'">
            ログインは<router-link to="/login">こちら</router-link>
          </v-card-text>
          <v-card-text class="text-center" v-if="this.$i18n.locale === 'en'">
            Click <router-link to="/login">here</router-link> for login
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
    title: '新規登録',
  },
  data() {
    return {
      valid: false,
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      nameRules: [
        (v) => !!v || this.$t('validate.name_presence'),
        (v) => v.length <= 10 || this.$t('validate.name_invalid'),
        (v) => v.length >= 2 || this.$t('validate.name_invalid'),
      ],
      emailRules: [
        (v) => !!v || this.$t('validate.email_presence'),
        (v) => /.+@.+\..+/.test(v) || this.$t('validate.email_invalid'),
      ],
      passwordRules: [
        (v) => !!v || this.$t('validate.password_presence'),
        (v) => v.length >= 8 || this.$t('validate.password_invalid'),
        (v) => /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(v) || this.$t('validate.password_invalid'),
      ],
      showPassword: false,
      showPasswordConfirmation: false,
    };
  },
  methods: {
    ...mapActions('users', ['registerUser']),
    ...mapActions('util', ['openSnackbar', 'closeSnackbar']),
    // 新規登録を実行するメソッド
    async register() {
      try {
        // 新規登録処理
        const status = await this.registerUser(this.user);

        // 異常系
        if (status === 'fail') {
          this.openSnackbar(this.$t('form.register_error'));
          return;
        }

        // 正常系
        this.$router.push({ name: 'Login' });
        this.openSnackbar(this.$t('form.register_success'));
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

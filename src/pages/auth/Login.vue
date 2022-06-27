<template>
  <div>
    <v-row justify="center">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                prepend-icon="mdi-email"
                label="メールアドレス"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="パスワード"
                placeholder="8〜12文字"
                validate-on-blur
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                outlined
                class="mr-2"
                width="100px"
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
                @click="login"
              >
                ログイン
              </v-btn>
            </v-card-actions>

          </v-form>

          <v-divider></v-divider>
          <v-card-text class="text-center">
            新規登録は<router-link to="/register">こちら</router-link>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      // ログインボタンの有効状態を表す(trueで有効)
      valid: false,
      loading: false,
      user: {
        email: "",
        password: "",
      },
      // メールアドレスのバリデーション
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || '無効なメールアドレスです'
      ],
      // パスワードのバリデーション
      passwordRules: [
        v => !!v || 'パスワードを入力してください',
        v => v.length <= 12 || '6〜12文字が有効です',
        v => v.length >= 8 || '8〜12文字が有効です',
      ],
      // パスワードの表示状態を表す(trueで表示)
      showPassword: false,
    }
  },
  methods: {
    // mapActionでログイン処理を呼び出し
    ...mapActions("users", ["loginUser"]),
    login() {
      try {
        this.loginUser(this.user);
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
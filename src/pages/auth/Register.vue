<template>
  <v-container class="my-16">
    <h2 class="mb-1 d-flex align-center justify-center">
      <v-icon left bottom>mdi-account-plus</v-icon>
      新規登録
    </h2>
    <v-divider class="mb-4" style="max-width: 700px; margin: auto;"></v-divider>

    <v-row justify="center">
      <v-col cols="11" sm="10" md="8" lg="6">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                prepend-icon="mdi-account-circle"
                label="お名前"
                placeholder="2〜10文字"
                validate-on-blur
                required
              ></v-text-field>

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

              <v-text-field
                v-model="user.password_confirmation"
                :rules="passwordRules"
                prepend-icon="mdi-lock-outline"
                :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                label="パスワード確認"
                placeholder="8〜12文字"
                validate-on-blur
                required
                @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              ></v-text-field>
            </v-card-text>

            <v-card-actions  class="justify-end">
              <v-btn
                color="info"
                outlined
                class="mr-2"
                width="100px"
                type="submit"
                :disabled="!valid" @click="register"
              >
                新規登録
              </v-btn>
            </v-card-actions>

          </v-form>

          <v-divider></v-divider>
          <v-card-text class="text-center">
            ログインは<router-link to="/login">こちら</router-link>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "RegisterIndex",
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
        v => !!v || 'お名前を入力してください',
        v => v.length <= 10 || '2〜10文字が有効です',
        v => v.length >= 2 || '2〜10文字が有効です',
      ],
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || '無効なメールアドレスです'
      ],
      passwordRules: [
        v => !!v || 'パスワードを入力してください',
        v => v.length <= 12 || '6〜12文字が有効です',
        v => v.length >= 8 || '8〜12文字が有効です',
      ],
      showPassword: false,
      showPasswordConfirmation: false,
    }
  },
  methods: {
    ...mapActions("users", ["registerUser"]),
    // 新規登録を実行するメソッド
    register() {
      try {
        // 新規登録処理
        this.registerUser(this.user);
        this.$router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

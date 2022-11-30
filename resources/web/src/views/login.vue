<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import loginApi from "@/api/login";

const router = useRouter();
const route = useRoute();

const codeUrl = ref(null);

const loading = ref(false);
const form = reactive({
  email: 'admin@demo.com', password: '123456', code: '', key: '',
});

const userStore = useUserStore();

const redirect = route.query.redirect ? route.query.redirect : '/';

const getCode = async () => {
  const { img, key } = await loginApi.getCaptch();
  codeUrl.value = img;
  form.key = key;
};

const handleSubmit = async ({ errors }) => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  if (!errors) {
    const result = await userStore.login(form);
    if (!result) {
      loading.value = false;
      return;
    }
    router.push(redirect);
  }
  loading.value = false;
};

onMounted(() => {
  getCode();
});
</script>
<template>
  <div class="login-container">
    <div class="login-width mx-auto flex justify-between h-full items-center">
      <div class="md:w12 w-11/12 md:rounded-r mx-auto pl-5 pr-5 pb-10 bg-white">
        <h2 class="mt-10 text-3xl pb-0 mb-10">{{ $t('sys.login.title') }}</h2>
        <a-form :model="form" @submit="handleSubmit">
          <a-form-item
            field="email"
            :hide-label="true"
            :rules="[{ required: true, message: $t('sys.login.emailNotice') }]"
          >
            <a-input
              v-model="form.email"
              class="w-full"
              size="large"
              :placeholder="$t('sys.login.email')"
              allow-clear
            >
              <template #prefix><icon-user /></template>
            </a-input>
          </a-form-item>

          <a-form-item
            field="password"
            :hide-label="true"
            :rules="[{ required: true, message: $t('sys.login.passwordNotice') }]"
          >
            <a-input-password
              v-model="form.password"
              :placeholder="$t('sys.login.password')"
              size="large"
              allow-clear
            >
              <template #prefix><icon-lock /></template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            field="code"
            :hide-label="true"
            :rules="[{
              required: true,
              match: /^[0-9]{4}$/,
              message: $t('sys.login.verifyCodeNotice')
            }]"
          >
            <a-input
              v-model="form.code"
              :placeholder="$t('sys.login.verifyCode')"
              size="large"
              allow-clear
            >
              <template #prefix><icon-safe /></template>
              <template #append>
                <img class="pl-5 cursor-pointer" :src="codeUrl"  @click="getCode" alt="">
              </template>
            </a-input>
          </a-form-item>

          <a-form-item :hide-label="true" class="mt-5">
            <a-button html-type="submit" type="primary" long size="large" :loading="loading">
              {{ $t('sys.login.loginBtn') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f3f6fe;

  .login-width {
    max-width: 450px;
  }

  .left-panel {
    height: 491px;
    background-image: url(@/assets/login_picture.svg);
    background-repeat: no-repeat;
    background-position: center 60px;
    background-size:contain;
  }

  :deep(.arco-input-append) {
    padding: 0 !important;
  }

  .other-login{
    cursor: pointer;
  }

  .qq:hover, .alipay:hover {
    background: #165DFF;
  }
  .wechat:hover {
    background: #0f9c02;
  }

  .weibo:hover {
    background: #f3ce2b;
  }
}
</style>

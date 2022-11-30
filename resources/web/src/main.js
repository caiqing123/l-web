import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import i18n from '@/i18n';
import tool from '@/utils/tool';
import * as common from '@/utils/common';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';

// 官方样式
// import '@arco-design/web-vue/dist/arco.css'
// themes样式
import '@arco-themes/vue-mine-admin/index.less';
import './style/skin.less';
import './style/index.css';
import './style/global.less';

const app = createApp(App);

app.use(ArcoVue, {})
  .use(ArcoVueIcon)
  .use(router)
  .use(store)
  .use(i18n)
  .use(directives)
  .use(globalComponents);

app.config.globalProperties.$tool = tool;
app.config.globalProperties.$common = common;

app.mount('#app');

import Vue from 'vue';
import ElementUI from 'element-ui'; // 引用样式框架 ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './assets/main.css';

Vue.use(ElementUI);
Vue.config.productionTip = false; // 阻止启动生产消息
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

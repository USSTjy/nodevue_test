import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/bigapp',
    name: 'Bigapp',
    component: () => import('../views/Bigapp.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../views/List.vue'),
      },
      {
        path: '/sub',
        name: 'Sub',
        component: () => import('../views/Sub.vue'),
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('../views/Question.vue'),
      },
    ],
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/list',
  //   name: 'List',
  //   component: () => import('../views/List.vue'),
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

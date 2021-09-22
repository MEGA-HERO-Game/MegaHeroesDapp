import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
        name: 'Home',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/rule',
  //       component: () => import('@/views/rule/Rule.vue'),
  //       name: 'Rule',
  //       meta: { title: '', icon: '', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    name: 'Profile',
    redirect: '/profile/register',
    children: [
      // {
      //   path: 'index',
      //   component: () => import('@/views/profile/Index.vue'),
      //   name: 'ProfileIndex',
      //   meta: { title: '', icon: '', affix: true }
      // },
      // {
      //   path: 'password',
      //   component: () => import('@/views/profile/Password.vue'),
      //   name: 'Password',
      //   meta: { title: '', icon: '', affix: true }
      // },
      {
        path: 'register',
        component: () => import('@/views/profile/Register.vue'),
        name: 'Register',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    name: 'Game',
    redirect: '/game/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/game/Index.vue'),
        name: 'GameIndex',
        meta: { title: '', icon: '', affix: true }
      },
      {
        path: 'purchase',
        component: () => import('@/views/game/Purchase.vue'),
        name: 'Purchase',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/', hidden: true, meta: {}}
]

const router = new VueRouter({
  scrollBehavior: (to, from, savePosition) => {
    return { x: 0, y: 0 }
  },
  routes
})

export default router

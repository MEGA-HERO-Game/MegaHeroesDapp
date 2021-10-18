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
  {
    path: '/card',
    component: Layout,
    name: 'Card',
    redirect: '/card/purchase',
    children: [
      {
        path: 'purchase',
        component: () => import('@/views/card/Purchase.vue'),
        name: 'CardPurchase',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  {
    path: '/pledge',
    component: Layout,
    name: 'Pledge',
    redirect: '/pledge/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pledge/Index.vue'),
        name: 'PledgeIndex',
        meta: { title: '', icon: '', affix: true }
      }, {
        path: 'form',
        component: () => import('@/views/pledge/Form.vue'),
        name: 'PledgeForm',
        meta: { title: '', icon: '', affix: true }
      }, {
        path: 'relieve',
        component: () => import('@/views/pledge/Relieve.vue'),
        name: 'RelieveForm',
        meta: { title: '', icon: '', affix: true }
      },
    ]
  },
  {
    path: '/diamonds',
    component: Layout,
    name: 'Diamonds',
    redirect: '/diamonds/deposit',
    children: [
      {
        path: 'deposit',
        component: () => import('@/views/diamonds/Deposit.vue'),
        name: 'diamondsDeposit',
        meta: { title: '', icon: '', affix: true }
      }, {
        path: 'extract',
        component: () => import('@/views/diamonds/Extract.vue'),
        name: 'diamondsExtract',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  {
    path: '/knapsack',
    component: Layout,
    name: 'Knapsack',
    redirect: '/knapsack/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/knapsack/Index.vue'),
        name: 'KnapsackIndex',
        meta: { title: '', icon: '', affix: true }
      },
      {
        path: 'deposit',
        component: () => import('@/views/knapsack/Deposit.vue'),
        name: 'KnapsackDeposit',
        meta: { title: '', icon: '', affix: true }
      },
      {
        path: 'extract',
        component: () => import('@/views/knapsack/Extract.vue'),
        name: 'KnapsackExtract',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  {
    path: '/iBox',
    component: Layout,
    name: 'IBox',
    redirect: '/iBox/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/iBox/Index.vue'),
        name: 'IBoxIndex',
        meta: { title: '', icon: '', affix: true }
      },
      {
        path: 'exchange',
        component: () => import('@/views/iBox/Exchange.vue'),
        name: 'IBoxExchange',
        meta: { title: '', icon: '', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/', hidden: true, meta: {} }
]

const router = new VueRouter({
  scrollBehavior: (to, from, savePosition) => {
    return { x: 0, y: 0 }
  },
  routes
})

export default router

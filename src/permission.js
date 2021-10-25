import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const hasToken = store.getters.account;
  if (hasToken) {
    if (to.path === '/profile/register') {
    } else {
      store.dispatch('user/userLoginFun', {
        cmd: "getNonce",
        data: {
          address: hasToken
        }
      })
    }
    next()
  } else {
    store.dispatch('web3/connectWallet')
    next()
  }
})
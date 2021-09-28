import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const hasToken = store.getters.account;
  if (hasToken) {
    next()
  } else {
    store.dispatch('web3/connectWallet')
    next()
  }
})
import { createWeb3Modal } from '@/web3/createWeb3Modal';
import Web3 from "web3";

const state = {
  web3: null,
  networkId: "",
  web3Modal: null
}

const mutations = {
  SET_WEB3: (state, web3) => {
    state.web3 = web3
  },
  SET_WEB3MODAL: (state, web3Modal) => {
    state.web3Modal = web3Modal
  },
  SET_NETWORKID: (state, networkId) => {
    state.networkId = networkId
  },
}

const actions = {
  connectWallet({ commit, dispatch}) {
    return new Promise(async (resolve, reject) => {
      const web3Modal = createWeb3Modal();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      commit('SET_WEB3', web3)
      commit('SET_WEB3MODAL', web3Modal)
      const subscribeProvider = provider => {
        if (!provider.on) {
          return;
        }
        provider.on('close', () => {
          dispatch('disconnectWallet', {web3, web3Modal})
        });
        provider.on('disconnect', async () => {
          dispatch('disconnectWallet', {web3, web3Modal})
        });
        provider.on('accountsChanged', async accounts => {
          if (accounts[0]) {
            dispatch('user/setAccount', accounts[0], { root: true })
          } else {
            dispatch('disconnectWallet', {web3, web3Modal})
          }
        });
        provider.on('chainChanged', async chainId => {
          const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
          commit('SET_NETWORKID', networkId)
        });
      };
      subscribeProvider(provider);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      let networkId = await web3.eth.getChainId();
      if (networkId === 86) {
        // Trust provider returns an incorrect chainId for BSC.
        networkId = 56;
      }
      commit('SET_NETWORKID', networkId)
      dispatch('user/setAccount', address, { root: true })
      resolve();
    })
  },
  disconnectWallet({ commit, dispatch }, info){
    const {web3, web3Modal} = info;
    return new Promise(async (resolve, reject) => {
      try {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        await web3Modal.clearCachedProvider();
        dispatch('user/setAccount', '', { root: true })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const getNetworkConnectors = t => {
  return {
    network: 'binance',
    cacheProvider: true,
    providerOptions: {
      injected: {
        display: {
          name: 'Injected',
          description: 'Home-BrowserWallet',
        },
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            1: 'https://bsc-dataseed.binance.org/',
            56: 'https://bsc-dataseed.binance.org/',
          },
        },
      },
      'custom-binance': {
        display: {
          name: 'Binance',
          description: 'Binance Chain Wallet',
          logo: require(`@/assets/wallets/binance-wallet.png`),
        },
        package: 'binance',
        connector: async (ProviderPackage, options) => {
          const provider = window.BinanceChain;
          await provider.enable();
          return provider;
        },
      },
      'custom-math': {
        display: {
          name: 'Math',
          description: 'Math Wallet',
          logo: require(`@/assets/wallets/math-wallet.svg`),
        },
        package: 'math',
        connector: connectors.injected,
      },
      'custom-twt': {
        display: {
          name: 'Trust',
          description: 'Trust Wallet',
          logo: require(`@/assets/wallets/trust-wallet.svg`),
        },
        package: 'twt',
        connector: connectors.injected,
      },
      'custom-safepal': {
        display: {
          name: 'SafePal',
          description: 'SafePal App',
          logo: require(`@/assets/wallets/safepal-wallet.svg`),
        },
        package: 'safepal',
        connector: connectors.injected,
      },
    },
  };
};
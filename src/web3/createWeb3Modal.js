import Web3Modal from 'web3modal';

import { getNetworkConnectors } from './getNetworkData';

export const createWeb3Modal = t => new Web3Modal(getNetworkConnectors(t));

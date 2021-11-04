import contract from '@truffle/contract';
import OPERATOR_PROXY_ABI from '@/contracts/OperatorProxy.json';
import Web3 from "web3";


export class OperatorProxyContract {
  async init(provider, tokenAddress) {
    const ccc = contract({ "abi": OPERATOR_PROXY_ABI });
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }

  //购买钻石卡nft
  async buyDiamondNft(tokenid, amount, v, r, s, invitation, blockNumber, account, callback) {
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.buy(tokenid, amount, v, r, s, invitation, blockNumber, {
        from:
          account
      }).on('transactionHash', function (hash) {
        txHash = hash;
      }).on('receipt', function (receipt) {
        resolve(txHash)
      }).on('error', function (error) {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  //充值购买游戏内钻石
  async recharge(tokenid, amount, v, r, s, invitation, blockNumber, account, callback) {
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.recharge(tokenid, amount, v, r, s, invitation, blockNumber, {
        from:
          account
      }).on('transactionHash', function (hash) {
        txHash = hash;
      }).on('receipt', function (receipt) {
        resolve(txHash)
      }).on('error', function (error) {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  // ibox兑换英雄及钻石卡资产
  //iboxId  ibox资产tokenid
  //mpType 兑换资产精灵、神灵类型id数组
  async exchangeIbox(iboxId, mpType, account) {
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.exchangeIbox(iboxId, mpType, {
        from:
          account
      }).on('transactionHash', function (hash) {
        txHash = hash;
      }).on('receipt', function (receipt) {
        resolve(txHash)
      }).on('error', function (error) {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  
  // ibox销毁激活
  //iboxId  ibox资产tokenid
  //mpType 兑换资产类型数组
  async activateIbox(iboxId, mpType) {
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.activateIbox(iboxId, mpType, {
        from:
          account
      }).on('transactionHash', function (hash) {
        txHash = hash;
      }).on('receipt', function (receipt) {
        resolve(txHash)
      }).on('error', function (error) {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  

  // 用户提取游戏内资产
  //mpIds 英雄类nft资产tokenid数组
  //diaIds 钻石卡tokenid数组
  //diaAmounts 每种钻石卡数量数组
  //nonce v r s 合约验证服务器钱包签名需要
  async withdraw(mpIds, diaIds, diaAmounts, nonce, v, r, s) {
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.withdraw(mpIds, diaIds, diaAmounts, nonce, v, r, s, {
        from:
          account
      }).on('transactionHash', function (hash) {
        txHash = hash;
      }).on('receipt', function (receipt) {
        resolve(txHash)
      }).on('error', function (error) {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

import contract from '@truffle/contract';
import DIAMOND_POOLS_ABI from '@/contracts/diamondPools.abi.json';
import { getUsdtPointNumber } from "../config";
import Web3 from "web3";


export class DiamondPoolsContract {
  async init(provider, tokenAddress) {
    const ccc = contract({ "abi": DIAMOND_POOLS_ABI });
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }
  async pendingAllRewards() {
    // 获取已经分出去的，但用户还没领取的usdt总额   （获取全网总收益）
    return (await this.contract.pendingAllRewards()) / parseInt(getUsdtPointNumber())
  }
  async totalAmount() {
    // 质押钻石总量
    return (await this.contract.totalAmount()) / parseInt(getUsdtPointNumber())
  }

  async pendingRewards(account) {
    // 用户未领取的usdt （查询账户可以领取的收益）
    return (await this.contract.pendingRewards(account)) / parseInt(getUsdtPointNumber())
  }

  async getUserDepositList(account) {
    // 质押的数据列表 （获取质押资产列表）
    return await this.contract.getUserDepositList(account)
  }

  async ratePerBlock() {
    // 当前一个区块时间的收益率
    return (await this.contract.ratePerBlock()) / parseInt(getUsdtPointNumber())
  }

  claim(account) {
    // 领取收益
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.claim({ from: account }).on('transactionHash', function (hash) {
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

  async withdraw(tokenid, amount, account) {
    // 解除质押
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.withdraw([tokenid], [amount], { from: account }).on('transactionHash', function (hash) {
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

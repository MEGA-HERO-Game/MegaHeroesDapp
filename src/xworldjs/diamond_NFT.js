import contract from '@truffle/contract';
import DIAMOND_NFT_ABI from '@/contracts/diamondNFT.abi.json';
import { getUsdtPointNumber } from "../config";
import Web3 from "web3";


export class DiamondNFTContract {
  async init(provider, tokenAddress) {
    const ccc = contract({ "abi": DIAMOND_NFT_ABI });
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }
  
  async balanceOf(account, tokenid) {
    // 获取用户钻石卡余额 （tokenid : 500,2000,5000）
    return await this.contract.balanceOf(account, tokenid)
  }

  async safeTransferFrom(account, diamondnftpoolAddress, tokenid, amount) {
    // 转账
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.safeTransferFrom(account, diamondnftpoolAddress, tokenid, amount, "0x", {
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
  async burn(account, tokenid, amount) {
    // 销毁
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.burn(tokenid, amount, {
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

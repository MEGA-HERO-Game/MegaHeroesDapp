import contract from '@truffle/contract';
import MP_IBOX_TOKEN_ABI from '@/contracts/IBoxToken.json';

export class IboxTokenContract {
  async init(provider, tokenAddress) {
    const ccc = contract({ "abi": MP_IBOX_TOKEN_ABI });
    ccc.setProvider(provider);
    this.tokenAddress = tokenAddress
    this.contract = await ccc.at(tokenAddress);
  }

  async getApprove(token) {
    console.log('getApproved::::', token)
    const t = await this.contract.getApproved(token)
    return t;
  }

  async approve(tokenId, to, from) {
    const address = await this.contract.getApproved(tokenId)
    console.log('ibox approve address:::', to, from)
    if (address != this.tokenAddress) {
      await this.contract.approve(to, tokenId, { from: from })
    }
  }
  
  async isApprovedForAll(owner,operator) {
    console.log('isApprovedForAll::::', owner,operator)
    const t = await this.contract.isApprovedForAll(owner,operator)
    return t;
  }

  async setApprovalForAll(owner,operator) {
    const approved = await this.contract.isApprovedForAll(owner,operator)
    console.log('isApprovedForAll:::', approved)
    if (!approved) {
      await this.contract.setApprovalForAll(operator, true, { from: owner })
    }
  }
  

  async getIboxTokenId(user) {
    let balance = await this.contract.balanceOf(user);
    balance = parseFloat(balance.toString());
    const result = [];
    for (let i = 0; i < balance; i++) {
      const token = await this.contract.tokenOfOwnerByIndex(user, i);
      result[i] = token.toString();
    }
    return result;
  }

  async burn(account, tokenid) {
    // 销毁
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.burn(tokenid, {
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

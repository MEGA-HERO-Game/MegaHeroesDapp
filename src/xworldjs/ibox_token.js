import contract from '@truffle/contract';
import MP_IBOX_TOKEN_ABI from '@/contracts/IBoxToken.json';

export class IboxTokenContract {
  async init(provider, tokenAddress) {
    const ccc = contract(MP_IBOX_TOKEN_ABI);
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

  async getIboxTokenId(user) {
    const balance = await this.contract.balanceOf(user);
    if (balance == 0) {

    }
    const result = [];
    for (let i = 0; i < balance; i++) {
      const token = await this.contract.tokenOfOwnerByIndex(user, i.id);
      result[i] = token;
    }
    return result;
  }

}

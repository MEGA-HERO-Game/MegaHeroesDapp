import contract from '@truffle/contract';
import MP_NFT_ABI from '@/contracts//MPNFT.json';

export class MPNFTContract {
  async init(provider, tokenAddress) {
    const ccc = contract(MP_NFT_ABI);
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }


  async getNFTs(user) {
    const t = await this.contract.getUserNftList(user)

    console.log('nfts:::::', t)
    const tmp = [];
    const result = [];

    t.map((v, i) => {
      console.log('v,i', v.toNumber(), i)
      tmp.push({ id: v.toNumber() })
    })


    for (const i of tmp) {
      const amount = await this.contract.balanceOf(user, i.id)
      // const uri = await this.contract.uri(i.id)
      // console.log('amount:::', amount)
      i.amount = await amount.toNumber()

      if (i.amount > 0) {
        result.push({ id: i.id, amount: i.amount })
      }
    }
    return result;
    // console.log('result::::', result)
  }
  async safeTransferFrom(from, to, tokenid, amount) {
    // 转账nft
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.safeTransferFrom(from, to, tokenid, amount, "0x", {
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


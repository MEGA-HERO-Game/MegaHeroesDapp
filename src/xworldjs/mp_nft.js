import contract from '@truffle/contract';
import MP_NFT_ABI from '@/contracts//MPNFT.json';

export class MPNFTContract {
  async init(provider, tokenAddress) {
    const ccc = contract({ "abi": MP_NFT_ABI });
    ccc.setProvider(provider);
    this.contract = await ccc.at(tokenAddress);
  }


  async getNFTs(user) {
    const t = await this.contract.getUserNftList(user)

    console.log('nfts:::::', t)
    const result = [];

    t.map((v, i) => {
      console.log('v,i', v.toNumber(), i)
      result.push({ id: v.toNumber() })
    })
    return result;
  }
  async safeTransferFrom(from, to, tokenid) {
    // 转账nft
    return new Promise((resolve, reject) => {
      let txHash = "";
      this.contract.safeTransferFrom(from, to, tokenid, "0x", {
        from:
          from
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


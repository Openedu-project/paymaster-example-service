import "dotenv/config";

const config = {
  rpc_url: process.env.PAYMASTER_RPC_URL,
  private_key: process.env.PRIVATE_KEY,
  nft_contract_address: process.env.NFT_CONTRACT_ADDRESS,
};

export default config;

import { toCoinbaseSmartAccount } from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { client } from "./viem_client.js";
import config from "./config.js";
import { abi } from "./abi.js";

const owner = privateKeyToAccount(`${config.private_key}` as `0x${string}`);

console.log("owner:", owner);

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
});

console.log("account:", account.address);

export const isMinter = await client.readContract({
  address: config.nft_contract_address as `0x${string}`,
  abi: abi,
  functionName: "hasRole",
  args: [
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
    account.address,
  ],
});

console.log("isMinter:", isMinter);

import { createBundlerClient } from "viem/account-abstraction";
import { account } from "./account.js";
import { client } from "./viem_client.js";
import { base } from "viem/chains";
import { http } from "viem";
import config from "./config.js";

export const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http(config.rpc_url),
  chain: base,
});

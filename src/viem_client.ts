import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import config from "./config.js";

export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(config.rpc_url),
});

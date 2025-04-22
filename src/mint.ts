import { bundlerClient } from "./paymaster.js";
import { account } from "./account.js";
import { abi } from "./abi.js";
import config from "./config.js";
import { EstimateUserOperationGasParameters } from "viem/account-abstraction";
const nftContractAddress = config.nft_contract_address;
const mintToAddress = "0x7f4A3Fe909524CEa8C91fFdEf717C797581AE36D";

account.userOperation = {
  estimateGas: async (userOperation) => {
    const estimate = await bundlerClient.estimateUserOperationGas(
      userOperation as EstimateUserOperationGasParameters
    );
    estimate.preVerificationGas = estimate.preVerificationGas * 2n;
    return estimate;
  },
};

try {
  const userOpHash = await bundlerClient.sendUserOperation({
    account,
    calls: [
      {
        abi: abi,
        functionName: "mint",
        to: nftContractAddress as `0x${string}`,
        args: [
          mintToAddress,
          "https://brown-interesting-eel-440.mypinata.cloud/ipfs/bafkreihh5xmatthhijqeyf7ga2je6q7tox757ss7jhdjkmcqazrmohuwnu",
        ],
      },
    ],
    paymaster: true,
  });

  const receipt = await bundlerClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  console.log("✅ Transaction successfully sponsored!");
  console.log(
    `⛽ View sponsored UserOperation on blockscout: https://base-sepolia.blockscout.com/op/${receipt.userOpHash}`
  );
  console.log(
    `🔍 View NFT mint on basescan: https://sepolia.basescan.org/address/${account.address}`
  );
  process.exit();
} catch (error) {
  console.log("Error sending trasnaction: ", error);
  process.exit(1);
}

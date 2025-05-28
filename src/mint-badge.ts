import { getSagaBadgeMetadata } from "./utils/get-uri.js";
import { sagaBadge } from "./data/saga-badge.js";
import { bundlerClient } from "./paymaster.js";
import { account } from "./account.js";
import { EstimateUserOperationGasParameters } from "viem/account-abstraction";
import config from "./config.js";
import { abi } from "./abi.js";

const nftContractAddress = config.nft_contract_address;

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
    for (let i = 0; i < sagaBadge.length; i++) {
        const badgeData = getSagaBadgeMetadata({
            studentName: sagaBadge[i].Fullname,
            studentAddress: sagaBadge[i].Address_Base,
            badgeName: sagaBadge[i].Badge,
            imageName: sagaBadge[i].Image_Name
        });

        const userOpHash = await bundlerClient.sendUserOperation({
            account,
            calls: [
                {
                    abi: abi,
                    functionName: "mint",
                    to: nftContractAddress as `0x${string}`,
                    args: [
                        sagaBadge[i].Address_Base,
                        badgeData,
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
            `⛽ View sponsored UserOperation on blockscout: https://base.blockscout.com/op/${receipt.userOpHash}`
        );
        console.log(
            `🔍 View NFT mint on basescan: https://base.basescan.org/address/${account.address}`
        );
    }
} catch (error) {
    console.log(error);
}
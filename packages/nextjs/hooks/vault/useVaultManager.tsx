import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export interface IVaultManager {
  address: string | undefined;
  totalAssets: bigint | undefined;
  totalSupply: bigint | undefined;
  maxWithdraw: bigint | undefined;
  maxRedeem: bigint | undefined;
  userGoldAllowance: bigint | undefined;
}

type VaultContractNames = "GodlVault";

/** Hook for interacting with vault contracts
 *
 * @param vaultContractName the name of the vault contract to interact with
 * @param depositAmount human readable amount of GLD to deposit
 * @param withdrawAmount human readable amount of GLD to withdraw
 * @returns
 */

export function useVaultManager(vaultContractName: VaultContractNames): IVaultManager {
  const account = useAccount();

  const { data: vaultContract } = useDeployedContractInfo(vaultContractName);

  const { data: totalAssets } = useScaffoldContractRead({
    contractName: vaultContractName,
    functionName: "totalAssets",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: vaultContractName,
    functionName: "totalSupply",
  });

  const { data: maxWithdraw } = useScaffoldContractRead({
    contractName: vaultContractName,
    functionName: "maxWithdraw",
    args: [account.address],
  });

  const { data: maxRedeem } = useScaffoldContractRead({
    contractName: vaultContractName,
    functionName: "maxRedeem",
    args: [account.address],
  });

  const { data: userGoldAllowance } = useScaffoldContractRead({
    contractName: "GodlToken",
    functionName: "allowance",
    args: [account.address, vaultContract?.address],
  });

  return {
    address: vaultContract?.address,
    totalAssets,
    totalSupply,
    maxWithdraw,
    maxRedeem,
    userGoldAllowance,
  };
}

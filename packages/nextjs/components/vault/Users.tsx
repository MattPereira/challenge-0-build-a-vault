"use client";

import { formatEther, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth/";

export const Users = () => {
  const account = useAccount();

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "balanceOf",
    args: [account?.address],
  });

  const { data: godlTokenBalanceOf } = useScaffoldContractRead({
    contractName: "GodlToken",
    functionName: "balanceOf",
    args: [account?.address],
  });

  const { writeAsync: ezMint } = useScaffoldContractWrite({
    contractName: "GodlToken",
    functionName: "ezMint",
    args: [account?.address, parseUnits("100", 18)],
  });

  console.log(formatEther(balanceOf || 0n));

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-5">USERS</h2>
      <div className="w-full bg-base-100 rounded-xl p-5">
        <div className="flex justify-between items-center mb-5">
          <Address address={account?.address} size="2xl" />
        </div>

        <div className="flex justify-start gap-4 mb-5">
          <div>
            <div className="mb-1">Vault Shares</div>
            <div className="text-xl border border-2 border-pink-500 text-pink-500 p-1 rounded-lg w-48 text-center">
              {Number(formatEther(balanceOf || 0n)).toFixed(2)} vGODL
            </div>
          </div>
          <div>
            <div className="mb-1">Token Balance</div>
            <div className="text-xl border border-2 border-yellow-500 text-yellow-500 p-1 rounded-lg w-48 text-center">
              {Number(formatEther(godlTokenBalanceOf || 0n)).toFixed(2)} GODL
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <button onClick={() => ezMint()} className="btn btn-primary rounded-lg text-lg w-full">
            GODL Faucet
          </button>
        </div>
      </div>
    </div>
  );
};

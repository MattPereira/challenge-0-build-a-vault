"use client";

import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

export const Users = () => {
  const account = useAccount();

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "balanceOf",
    args: [account?.address],
  });

  // const { data: maxWithdraw } = useScaffoldContractRead({
  //   contractName: "GodlVault",
  //   functionName: "maxWithdraw",
  //   args: [account?.address],
  // });

  // const { data: maxRedeem } = useScaffoldContractRead({
  //   contractName: "GodlVault",
  //   functionName: "maxRedeem",
  //   args: [account?.address],
  // });

  const { data: godlTokenBalanceOf } = useScaffoldContractRead({
    contractName: "GodlToken",
    functionName: "balanceOf",
    args: [account?.address],
  });

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-5">USER</h2>
      <div className="w-full bg-base-100 rounded-xl p-5">
        <div className="flex justify-between items-center mb-5">
          <Address address={account?.address} size="2xl" />
          <div className="text-2xl border border-2 border-yellow-400 text-yellow-400 p-2 rounded-lg">
            {formatEther(godlTokenBalanceOf || 0n)} GODL
          </div>
        </div>

        <table className="table text-xl">
          <thead>
            <tr className="text-lg">
              <th>Vault Method</th>
              <td>Amount</td>
              <td>Unit</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>balanceOf</th>
              <td>{formatEther(balanceOf || 0n)}</td>
              <td>Shares</td>
            </tr>
            <tr>
              <th>maxRedeem</th>
              <td>{formatEther(balanceOf || 0n)}</td>
              <td>Shares</td>
            </tr>
            <tr>
              <th>maxWithdraw</th>
              <td>{formatEther(balanceOf || 0n)}</td>
              <td>GODL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

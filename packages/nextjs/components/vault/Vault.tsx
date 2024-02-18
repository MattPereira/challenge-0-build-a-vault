"use client";

import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useVaultManager } from "~~/hooks/vault/useVaultManager";
import { formatWithCommas } from "~~/utils/formatWithCommas";

export const Vault = () => {
  const vault = useVaultManager("GodlVault");
  const account = useAccount();

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-5">VAULT</h2>
      <div className="bg-base-100 rounded-xl w-full">
        <div className="overflow-x-auto p-5">
          <h3 className="text-3xl mb-5">⚡ Turbo GODL Maximizer</h3>

          <table className="table text-xl mb-5">
            <thead>
              <tr className="text-lg">
                <th>Total</th>
                <td>Amount</td>
                <td>Unit</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Assets</th>
                <td>{formatWithCommas(Number(formatUnits(vault.totalAssets || 0n, 18)).toFixed(0))}</td>
                <td>GODL</td>
              </tr>
              <tr>
                <th>Supply</th>
                <td>{formatWithCommas(Number(formatUnits(vault.totalSupply || 0n, 18)).toFixed(0))}</td>
                <td>Shares</td>
              </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-4 justify-center">
            <button
              onClick={() => {
                const modal = document.getElementById("my_modal_2");
                if (modal instanceof HTMLDialogElement) {
                  modal.showModal();
                }
              }}
              className="btn btn-primary w-full"
            >
              Deposit
            </button>
            <button className="btn btn-outline w-full" disabled>
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <DepositModal account={account} />
    </div>
  );
};

const DepositModal = ({ account }: { account: any }) => {
  const [depositAmount, setDepositAmount] = useState("0");

  const { data: GodlVault } = useScaffoldContract({
    contractName: "GodlVault",
  });

  const { writeAsync: approve } = useScaffoldContractWrite({
    contractName: "GodlToken",
    functionName: "approve",
    args: [GodlVault?.address, parseUnits(depositAmount, 18)],
  });

  const { writeAsync: deposit } = useScaffoldContractWrite({
    contractName: "GodlVault",
    functionName: "deposit",
    args: [parseUnits(depositAmount, 18), account?.address],
  });

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "GodlToken",
    functionName: "balanceOf",
    args: [account?.address],
  });

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-base-200 border-base-300 border-2 p-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-4xl">Deposit</h3>
          <form method="dialog">
            <button className="btn text-2xl btn-circle btn-ghost">✕</button>
          </form>
        </div>
        <div className="flex justify-between mb-3">
          <div>Vault Name</div>
          <div>Turbo GODL Maximizer</div>
        </div>
        <div className="flex justify-between mb-5">
          <div>Accounting Asset</div>
          <div>🪙 GODL</div>
        </div>
        <div className="bg-base-300 p-5 rounded-lg flex gap-5">
          <div className="flex flex-col">
            <div className="font-bold text-xl mb-1">🪙 GODL</div>
            <div className="text-xs">Available: {formatUnits(balanceOf || 0n, 18)}</div>
          </div>
          <input
            onChange={e => setDepositAmount(e.target.value)}
            value={depositAmount}
            className="flex-grow bg-base-300 text-center"
          />
        </div>
        <form method="dialog">
          <button
            onClick={async () => {
              await approve();
              await deposit();
            }}
            className="btn btn-lg btn-accent text-xl w-full mt-5 mb-2"
          >
            Submit
          </button>
        </form>
        <p>Scaffold ETH DeFi challenge vaults are risk free and intended only for learning ERC-4626 mechanics</p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

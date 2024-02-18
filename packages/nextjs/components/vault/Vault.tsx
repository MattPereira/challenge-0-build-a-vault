"use client";

import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { formatWithCommas } from "~~/utils/formatWithCommas";

export const Vault = () => {
  const account = useAccount();

  const { data: totalAssets } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "totalAssets",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "totalSupply",
  });

  const { data: userGodlBalance } = useScaffoldContractRead({
    contractName: "GodlToken",
    functionName: "balanceOf",
    args: [account?.address],
  });

  const { data: userVaultShares } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "balanceOf",
    args: [account?.address],
  });

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-5">VAULT</h2>
      <div className="bg-base-100 rounded-xl w-full">
        <div className="overflow-x-auto p-5">
          <h3 className="text-3xl mb-5">⚡ Turbo GODL Maximizer</h3>

          <div>Exchange Rate</div>
          <div className="text-2xl rounded-lg p-1 mb-5">
            <span className="text-pink-500"> 1 vGODL </span> 🟰 <span className="text-yellow-500"> 1 GODL</span>
          </div>

          <div className="flex gap-5 mb-5">
            <div>
              <div className="mb-1">Total Supply</div>
              <div className="text-xl border border-2 border-pink-500 text-pink-500 p-1 rounded-lg w-48 text-center">
                {formatWithCommas(Number(formatUnits(totalSupply || 0n, 18)).toFixed(2))} vGODL
              </div>
            </div>
            <div>
              <div className="mb-1">Total Assets</div>
              <div className="text-xl border border-2 border-yellow-500 text-yellow-500 p-1 rounded-lg w-48 text-center">
                {formatWithCommas(Number(formatUnits(totalAssets || 0n, 18)).toFixed(2))} GODL
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 justify-center py-3">
            <button
              disabled={userGodlBalance || 0n > 0n ? false : true}
              className="btn text-lg rounded-lg btn-primary w-full"
              onClick={() => {
                const modal = document.getElementById("deposit_modal");
                if (modal instanceof HTMLDialogElement) {
                  modal.showModal();
                }
              }}
            >
              Deposit
            </button>
            <button
              disabled={userVaultShares || 0n > 0n ? false : true}
              className="btn text-lg rounded-lg btn-secondary w-full"
              onClick={() => {
                const modal = document.getElementById("withdraw_modal");
                if (modal instanceof HTMLDialogElement) {
                  modal.showModal();
                }
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <DepositModal account={account} userGodlBalance={userGodlBalance} />
      <WithdrawModal account={account} userVaultShares={userVaultShares} />
    </div>
  );
};

const DepositModal = ({ account, userGodlBalance }: { account: any; userGodlBalance: any }) => {
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

  return (
    <dialog id="deposit_modal" className="modal">
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
          <div className="text-yellow-500">🪙 GODL</div>
        </div>
        <div className="bg-base-300 p-5 rounded-lg flex justify-between gap-5">
          <div className="flex flex-col">
            <div className="font-bold text-xl mb-1 text-yellow-500">GODL</div>
            <div className="text-xs">Available: {formatUnits(userGodlBalance || 0n, 18)}</div>
          </div>
          <input
            onChange={e => setDepositAmount(e.target.value)}
            value={depositAmount}
            className="w-40 bg-base-300 text-center font-bold text-2xl"
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
        <p className="text-center mb-0">
          Deposit <span className="text-yellow-500">GODL</span> tokens to mint shares{" "}
          <span className="text-pink-500">vGODL</span>
        </p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const WithdrawModal = ({ account, userVaultShares }: { account: any; userVaultShares: any }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("0");

  const { writeAsync: withdraw } = useScaffoldContractWrite({
    contractName: "GodlVault",
    functionName: "withdraw",
    args: [parseUnits(withdrawAmount, 18), account?.address, account?.address],
  });

  return (
    <dialog id="withdraw_modal" className="modal">
      <div className="modal-box bg-base-200 border-base-300 border-2 p-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-4xl">Withdraw</h3>
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
          <div className="text-yellow-500">🪙 GODL</div>
        </div>
        <div className="bg-base-300 p-5 rounded-lg flex gap-5 justify-between">
          <div className="flex flex-col">
            <div className="font-bold text-xl mb-1 text-pink-500">vGODL</div>
            <div className="text-xs">Available: {formatUnits(userVaultShares || 0n, 18)}</div>
          </div>
          <input
            onChange={e => setWithdrawAmount(e.target.value)}
            value={withdrawAmount}
            className="w-40 bg-base-300 text-center font-bold text-2xl"
          />
        </div>
        <form method="dialog">
          <button
            onClick={async () => {
              await withdraw();
            }}
            className="btn btn-lg btn-accent text-xl w-full mt-5 mb-2"
          >
            Submit
          </button>
        </form>
        <p className="text-center mb-0">
          Burn shares <span className="text-pink-500">vGODL</span> in exchange for{" "}
          <span className="text-yellow-500">GODL</span>
        </p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

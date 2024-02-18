"use client";

import { parseUnits } from "viem";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Strategist = () => {
  const { data: totalAssets } = useScaffoldContractRead({
    contractName: "GodlVault",
    functionName: "totalAssets",
  });

  const { writeAsync: simulateStrategyProfit } = useScaffoldContractWrite({
    contractName: "GodlVault",
    functionName: "simulateStrategyProfit",
    args: [parseUnits("0", 18)],
  });

  const { writeAsync: simulateStrategyLoss } = useScaffoldContractWrite({
    contractName: "GodlVault",
    functionName: "simulateStrategyLoss",
    args: [parseUnits("0", 18)],
  });

  const tenPercent = (totalAssets || 0n) / 10n;
  const twentyFivePercent = (totalAssets || 0n) / 4n;
  const fiftyPercent = (totalAssets || 0n) / 2n;

  return (
    <div className="">
      <h2 className="text-4xl text-center font-bold mb-5">STRATEGIST</h2>
      <div className=" bg-base-100 rounded-lg p-5 flex flex-col gap-5">
        <button
          className="btn btn-lg btn-primary rounded-lg w-full text-xl"
          onClick={() => {
            const modal = document.getElementById("lend_modal");
            if (modal instanceof HTMLDialogElement) {
              modal.showModal();
            }
          }}
        >
          🔄 Lend & Borrow
        </button>
        <button
          className="btn btn-lg btn-primary rounded-lg w-full text-xl"
          onClick={() => {
            const modal = document.getElementById("arbitrage_modal");
            if (modal instanceof HTMLDialogElement) {
              modal.showModal();
            }
          }}
        >
          ⚖️ Arbitrage
        </button>
        <button
          className="btn btn-lg btn-primary rounded-lg w-full text-xl"
          onClick={() => {
            const modal = document.getElementById("liquidity_modal");
            if (modal instanceof HTMLDialogElement) {
              modal.showModal();
            }
          }}
        >
          💦 Provide Liquidity
        </button>
      </div>

      <StrategyModal
        title="🔄 Lend & Borrow"
        id="lend_modal"
        paragraphText="Vault strategists generate profits by lending deposited assets to earn interest and borrowing others to pursue
        high-yield opportunities. This active management strategy aims to outperform passive holding through careful
        market analysis. However, it carries risks like market volatility and potential liquidation, leading to losses
        if strategies do not align with market movements or if the cost of borrowing outweighs the returns from
        investments.."
        percentage={tenPercent}
        simulateStrategyProfit={simulateStrategyProfit}
        simulateStrategyLoss={simulateStrategyLoss}
      />

      <StrategyModal
        title="⚖️ Arbitrage"
        id="arbitrage_modal"
        paragraphText="
        Vault strategists employ arbitrage by exploiting price differences of an asset across different markets. They buy the asset where it's cheaper and sell it where it's more expensive, using the assets deposited by users in the vault. This strategy aims to capture risk-free profits from these price discrepancies. However, it can result in losses if market conditions shift unexpectedly, narrowing margins or reversing price differences before the arbitrage can be completed."
        percentage={twentyFivePercent}
        simulateStrategyProfit={simulateStrategyProfit}
        simulateStrategyLoss={simulateStrategyLoss}
      />

      <StrategyModal
        title="💦 Provide Liquidity"
        id="liquidity_modal"
        paragraphText="
        Vault strategists generate profits through liquidity provision by depositing users' assets into liquidity pools on decentralized exchanges. They earn transaction fees as rewards for providing liquidity, which can lead to profit if the fees exceed the costs and potential impermanent loss. Impermanent loss occurs when the price ratio of deposited assets changes, leading to a temporary loss in value. If not managed properly, this can result in losses for the vault."
        percentage={fiftyPercent}
        simulateStrategyProfit={simulateStrategyProfit}
        simulateStrategyLoss={simulateStrategyLoss}
      />
    </div>
  );
};

const StrategyModal = ({
  title,
  id,
  paragraphText,
  percentage,
  simulateStrategyProfit,
  simulateStrategyLoss,
}: {
  title: any;
  id: any;
  paragraphText: any;
  percentage: any;
  simulateStrategyProfit: any;
  simulateStrategyLoss: any;
}) => {
  const percent = id === "lend_modal" ? "10%" : title === "arbitrage_modal" ? "25%" : "50%";
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-base-200 border-base-300 border-2 p-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-4xl">{title}</h3>
          <form method="dialog">
            <button className="btn text-2xl btn-circle btn-ghost">✕</button>
          </form>
        </div>
        <p>{paragraphText}</p>
        <form method="dialog" className="grid grid-cols-2 gap-5">
          <button
            className="btn btn-lg btn-error text-xl w-full mt-5 mb-2"
            onClick={() => simulateStrategyLoss({ args: [percentage] })}
          >
            {percent + ` Loss`}
          </button>
          <button
            className="btn btn-lg btn-success text-xl w-full mt-5 mb-2"
            onClick={() => simulateStrategyProfit({ args: [percentage] })}
          >
            {percent + ` Profit`}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

import Image from "next/image";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-14">
        <div className="flex flex-col items-center max-w-[800px]">
          <div className="mb-3 flex flex-col items-center">
            <h3 className="text-2xl">Scaffold-ETH DeFi Challenges</h3>
            <h1 className="text-5xl font-bold">Challenge #0: 🛠️ Build a Vault</h1>
          </div>

          <div>
            <Image
              className="rounded-xl border-4 border-base-100"
              src="/vault.jpg"
              alt="Vault"
              width={800}
              height={400}
            />
          </div>

          <div>
            <p className="text-2xl text-center">
              This challenge will help you build a simplified implementation of the ERC-4626 tokenized vault standard.
              The goal is to help you understand the basic arithmetic of vaults and the flow of assets between users,
              vaults, and strategists. To get started,{" "}
              <a
                className="link text-yellow-500"
                href="https://github.com/MattPereira/challenge-0-build-a-vault?tab=readme-ov-file#-challenge-0-%EF%B8%8F-build-a-vault"
                target="_blank"
                rel="noreferrer"
              >
                go to the README
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

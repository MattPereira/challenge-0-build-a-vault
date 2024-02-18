import Image from "next/image";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center py-14">
        <div className="flex flex-col items-center max-w-[800px]">
          <div className="mb-3 flex flex-col items-center">
            <h3 className="text-xl">Scaffold-ETH DeFi Challenges</h3>
            <h1 className="text-4xl font-bold">Challenge #0: 🛡️Build a Vault</h1>
          </div>

          <div>
            <Image
              className="rounded-xl border-4 border-base-300"
              src="/vault.jpg"
              alt="Vault"
              width={800}
              height={400}
            />
          </div>

          <div>
            <p className="text-xl text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates ea repellendus possimus sit beatae
              eum numquam magni harum, dolor quaerat aut temporibus iste at? Aliquid soluta temporibus qui enim ipsa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import { Strategist, Users, Vault } from "~~/components/vault";

const Home: NextPage = () => {
  return (
    <>
      <div className="p-10 mt-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <Users />
          <Vault />
          <Strategist />
        </div>
      </div>
    </>
  );
};

export default Home;

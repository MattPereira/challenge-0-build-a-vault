//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {GodlVault} from "../contracts/GodlVault.sol";
import {GodlToken} from "../contracts/GodlToken.sol";
import "./DeployHelpers.s.sol";

/**
 *
 */
contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);

        // First, deploy the ERC-20 token contract
        GodlToken godlToken = new GodlToken();
        console.logString(
            string.concat(
                "GodlToken contract deployed at: ",
                vm.toString(address(godlToken))
            )
        );

        // Second, deploy the Vault contract using the address of the ERC-20 token contract as constructor argument
        GodlVault godlVault = new GodlVault(godlToken);
        console.logString(
            string.concat(
                "GodlVault contract deployed at: ",
                vm.toString(address(godlVault))
            )
        );

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {GodlVault} from "../contracts/GodlVault.sol";
import {GodlToken} from "../contracts/GodlToken.sol";

contract VaulttTest is Test {
    GodlVault public vault;
    GodlToken public token;

    function setUp() public {
        vault = new GodlVault(token);
    }
}

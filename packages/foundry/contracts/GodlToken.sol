//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// (ctrl + click) "ERC20" to see source code ⬇️
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title GoldToken
 *
 * ERC-20 token to deposit into the Vault.sol contract
 * inherits all the functionality of OpenZeppelin's ERC20 token contract
 */
contract GodlToken is ERC20 {
    constructor() ERC20("Godl Token", "GODL") {}

    function ezMint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

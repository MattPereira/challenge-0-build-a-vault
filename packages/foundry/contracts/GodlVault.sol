//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// (ctrl + click) "ERC4626" to see inhereted source code ⬇️
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

/**
 * @author Matt Pereira
 *
 * @notice imspired by Smart Contract Programmer => https://www.youtube.com/watch?v=HHoa0c3AOqo
 */
contract GodlVault is ERC4626 {
    constructor(
        IERC20 _asset
    ) ERC4626(_asset) ERC20("Godl Vault Token", "vGODL") {}

    /**
     * Pretend that a vault strategy resulted in loss
     */
    function simulateStrategyLoss(uint _amount) public {
        require(
            _amount <= IERC20(asset()).balanceOf(address(this)),
            "not enough tokens in vault"
        );
        IERC20(asset()).transfer(address(0xdead), _amount);
    }

    /**
     *  Pretend that a vault strategy resulted in profit
     */
    function simulateStrategyProfit(uint _amount) public {
        (bool success, ) = asset().call(
            abi.encodeWithSignature(
                "ezMint(address,uint256)",
                address(this),
                _amount
            )
        );
        require(success, "Silly mint failed");
    }
}

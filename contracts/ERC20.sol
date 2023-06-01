// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "../node_modules/@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Example is NonblockingLzApp, ERC20{
   uint public mockCounter;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) ERC20("MyToken", "MTK"){}

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
        mockCounter += 1;
        (address toAddress, uint256 amount, bool isMint) = abi.decode(_payload, (address, uint256, bool));
        if(isMint) {
            _mint(toAddress, amount);
        } else {
            _burn(toAddress, amount);
        }
    }

    function mintTokenOrBurn(uint16 _dstChainId, address _toAddress, uint256 amount, bool isMint) public payable {
        if(isMint) {
            _mint(_toAddress, amount);
        } else {
            _burn(_toAddress, amount);
        }
        bytes memory payload = abi.encode(_toAddress, amount, isMint);
        _lzSend(_dstChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }

    function circulatingSupply() public view returns (uint) {
        return totalSupply();
    }
}

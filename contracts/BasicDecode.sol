//SPDX-License-Identifier: UNDEFINED
pragma solidity 0.8.6;

import "./Metatx.sol";
import "hardhat/console.sol";

contract BasicDecode is Metatx {
    string public flag;
    uint256 public alsoFlag;
    bytes public bigStore;

    event OptionA(uint256 _x);
    event OptionB(uint256 _x);

    constructor() {
        flag = "hello";
        alsoFlag = 1;
    }

    function set(bytes memory _data) public {
        (string memory _flag, uint256 _alsoFlag, bytes memory _bigStore) = abi
            .decode(_data, (string, uint256, bytes));
        flag = _flag;
        alsoFlag = _alsoFlag;
        bigStore = _bigStore;
    }

    function secureSet(bytes calldata _data, bytes calldata _signature) public {
        (address _from, string memory _flag, uint256 _alsoFlag) = abi.decode(
            _data,
            (address, string, uint256)
        );
        console.log("From %s:", _flag);
        address _recovered = recoverKey(keccak256(_data), _signature, 0);
        console.log("Recovered (%s)", _recovered);
        // console.log("From (%s)", _from);
        // bool secure = _recovered == _from;
        // require(secure, "message not from signer!");
        // flag = _flag;
        // alsoFlag = _alsoFlag;
    }
}

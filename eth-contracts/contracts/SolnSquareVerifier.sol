pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is MarcinosERC721Token {
    Verifier verifier;

    constructor (string memory name, string memory symbol) public MarcinosERC721Token(name, symbol) {
        verifier = new Verifier();
    }

    struct Solution {
        uint256 index;
        address account;
    }

    uint256 solutionIndex = 1;
    mapping(bytes32 => Solution) private uniqueSolutions;

    event SolutionAdded(bytes32 solutionKey, address sender);

    using SafeMath for uint256;
    function addSolution(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory inputs) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, inputs));
        require(uniqueSolutions[key].index == 0, "Solution already exists");
        uniqueSolutions[key] = Solution({index : solutionIndex, account : msg.sender});

        solutionIndex.add(1);

        emit SolutionAdded(key, msg.sender);
    }

    function mintProperty(address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory inputs) public {
        require(verifier.verifyTx(a, b, c, inputs), "Solution is incorrect");

        addSolution(a, b, c, inputs);
        super.mint(to, tokenId);
    }
}
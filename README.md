# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing
product.

# Project details

All major componets (contracts, tests, etc.) are in *eth-contracts.*

Versions used is the project:

* Truffle v5.4.29 (core: 5.4.29)
* Solidity: v0.5.16 (solc-js)
* Node: v16.13.0
* Web3.js: v1.5.3
* Zokrates: 0.4.6

To install all dependencies for this project run:

```
npm install
truffle compile
```

inside the project folder.

## Testing

In separate console window run truffle development blockchain:

```
truffle develop
```

In the other console, go inside *eth-contracts* and run:

```
truffle test
```

to test all contracts.

## Deploy contracts to Rinkeby network

Run:

```
truffle deploy --network rinkeby
```

Deployment of contracts to the *Rinkeby* network, which returned contracts address:

```
Verifier:
transaction hash:    0x042a3b643132440288613c26e85e5a7fdd54c89c6862b163474d9780fbe3e761
contract address:    0xFa967c7BD6F1449061C7C75466440a2337B89265

SolnSquareVrifier:
transaction hash:    0xf7d475ac23dafd16446d34039629844a215d9c7fc8e1f6ac340dbbfb321ab3e2
contract address:    0x98A581A849FC8dC35E28a6FDdEd557E10549859d
```

You can see all transactions in ethersacn:

* https://rinkeby.etherscan.io/address/0xFa967c7BD6F1449061C7C75466440a2337B89265
* https://rinkeby.etherscan.io/address/0x98A581A849FC8dC35E28a6FDdEd557E10549859d

## OpenSea testing market

Finally, the project with 10 minted tokens was put in the OpenSea testing market:
https://testnets.opensea.io/collection/unidentified-contract-8byfj9rlvu

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

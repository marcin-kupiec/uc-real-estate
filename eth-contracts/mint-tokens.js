const Web3 = require('web3');
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const SolnSquareVerifier = '0x98A581A849FC8dC35E28a6FDdEd557E10549859d';
const contractOwner = '0x607B1e5F6eAe32e0488Ffba243691461940372FE';
const SolnSquareInterface = JSON.parse(fs.readFileSync('./build/contracts/SolnSquareVerifier.json'));

const infuraKey = fs.readFileSync(".secretInfuraKey").toString().trim();
const mnemonic = fs.readFileSync('.secretMnemonic').toString().trim();

const NUM_TOKENS = 10;
const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
const web3 = new Web3(provider);

const proofs = [];
for (let i = 0; i < NUM_TOKENS; i++) {
  proofs.push(require(`./proofs/proof${i}.json`));
}

const main = async () => {
  const contract = new web3.eth.Contract(
    SolnSquareInterface.abi,
    SolnSquareVerifier,
    { from: contractOwner },
  );

  for (let i = 0; i < NUM_TOKENS; i++) {
    try {
      const result = await contract.methods
        .mintProperty(contractOwner, i, proofs[i].proof.a, proofs[i].proof.b, proofs[i].proof.c, proofs[i].inputs)
        .send({ from: contractOwner });

      console.log(`Minted Token ${i} with Tx Hash : ${result.transactionHash}`);
    } catch (err) {
      console.log(`Error while minting Token ${i} err:`, err);
    }
  }
};

main().then(console.log).catch(console.error);

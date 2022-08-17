const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Proof = require('../../zokrates/code/square/proof.json');
const assert = require('assert');

contract('TestSolnSquareVerifier', (accounts) => {

  const accountOne = accounts[0];
  const accountTwo = accounts[1];

  const name = 'Marcinos Property';
  const symbol = 'MPT';

  const proof = Proof.proof;
  const inputs = Proof.inputs;

  let contract = null;

  beforeEach(async () => {
    contract = await SolnSquareVerifier.new(name, symbol, { from: accountOne });
  });

  // Test if a new solution can be added for contract - SolnSquareVerifier
  it('should add a solution and prohibit adding the same', async function () {
    await contract.addSolution(proof.a, proof.b, proof.c, inputs, { from: accountOne });

    let revert = false;
    try {
      await this.contract.addSolution(proof.a, proof.b, proof.c, inputs, { from: accountOne });
    } catch (error) {
      revert = true;
    }
    assert.ok(revert, 'Solution was not added correctly');
  });

  // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
  it('should mint an ERC721 token and add a new solution', async () => {
    let tokenId = 1986;
    let result = await contract.mintProperty(accountTwo, tokenId, proof.a, proof.b, proof.c, inputs);
    let owner = await contract.ownerOf(tokenId);

    assert.equal(owner, accountTwo, "Token was not minted correctly");
    assert.equal(result.logs[0].event, 'SolutionAdded');
    assert.equal(result.logs[1].event, 'Transfer');
  });
});
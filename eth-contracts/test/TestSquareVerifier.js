const Verifier = artifacts.require('Verifier');
const Proof = require('../proofs/proof.json');
const assert = require('assert');

contract('Testing verfier', accounts => {

  const accountOne = accounts[0];
  const proof = Proof.proof;
  const inputs = Proof.inputs;

  let contract = null;

  describe('Setup verifier correctness:', function () {
    beforeEach(async function () {
      contract = await Verifier.new({ from: accountOne });
    });

    it('should verify with correct proof', async function () {
      let verified = await contract.verifyTx.call(proof.a, proof.b, proof.c, inputs, { from: accountOne });
      assert.ok(verified, "cannot verify correct proof");
    });

    it('should not verify with incorrect proof', async function () {
      let inputs = ["0x3", "0x4"];
      let verified = await contract.verifyTx.call(proof.a, proof.b, proof.c, inputs, { from: accountOne });

      assert.ok(!verified, "can verify incorrect proof");
    });
  });
});
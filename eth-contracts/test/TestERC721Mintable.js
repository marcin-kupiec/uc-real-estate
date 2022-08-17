const ERC721MintableComplete = artifacts.require('MarcinosERC721Token');
const assert = require('assert');

contract('TestERC721Mintable', accounts => {

  const accountOne = accounts[0];
  const accountTwo = accounts[1];

  const name = "Marcinos Property";
  const symbol = "MPT";

  let contract = null;
  describe('match erc721 spec', () => {

    beforeEach(async () => {
      contract = await ERC721MintableComplete.new(name, symbol, { from: accountOne });

      // TODO: mint multiple tokens
      await contract.mint(accountOne, 1986, { from: accountOne });
      await contract.mint(accountOne, 1996, { from: accountOne });
      await contract.mint(accountOne, 2006, { from: accountOne });
      await contract.mint(accountTwo, 2016, { from: accountOne });
      await contract.mint(accountTwo, 2026, { from: accountOne });
    });

    it('should return total supply', async () => {
      const totalSupply = await contract.totalSupply.call();
      assert.equal(totalSupply.toNumber(), 5);
    });

    it('should get token balance', async () => {
      const balance1 = await contract.balanceOf.call(accountOne);
      const balance2 = await contract.balanceOf.call(accountTwo);

      assert.equal(balance1.toNumber(), 3);
      assert.equal(balance2.toNumber(), 2);
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async () => {
      const expectedUri = `https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1986`;
      assert.equal(await contract.tokenURI.call(1986), expectedUri);
    });

    it('should transfer token from one owner to another', async () => {
      assert.equal(await contract.ownerOf.call(2006), accountOne);
      await contract.transferFrom(accountOne, accountTwo, 2006, { from: accountOne });
      assert.equal(await contract.ownerOf.call(2006), accountTwo);
    });
  });

  describe('have ownership properties', function () {
    beforeEach(async () => {
      contract = await ERC721MintableComplete.new(name, symbol, { from: accountOne });
    });

    it('should fail when minting when address is not contract owner', async () => {
      let reverted = false;
      try {
        await contract.mint(accountOne, 2036, { from: accountTwo });
      } catch (err) {
        reverted = true;
      }
      assert.ok(reverted, "Only the owner can mint new tokens");
    });

    it('should return contract owner', async () => {
      assert.equal(await contract.getOwner.call(), accountOne);
    });
  });
});
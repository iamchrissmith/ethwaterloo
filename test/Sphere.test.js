var Sphere = artifacts.require("./Sphere.sol");
web3.eth.getTransactionReceiptMined = require("./libs/getTransactionReceiptMined.js");
const expectedExceptionPromise = require('./libs/expected_exception_testRPC_and_geth');

contract('Sphere', function(accounts) {

  const owner = accounts[0]
  const member = accounts[1]
  const nonMember = accounts[4]

  let contract

  beforeEach( () => {
    return Sphere.new(1, {from:owner})
      .then( instance => {
        contract = instance
      })
  })

  it('returns 0 initially for a member rating', () => {
    return contract.getRatingForMember(member, {from: owner})
      .then( rating => {
        assert.equal(rating[0].toNumber(), 0, 'initial member rating count is not 0')
        assert.equal(rating[1].toNumber(), 0, "initial rating total is not 0")
      })
  })

  it('returns 0 initially for a member rating count', () => {
    return contract.countRatingsReceived(member, {from: owner})
      .then(count => {
        assert.equal(count.toNumber(), 0, 'member rating count did not increase')
      })
  });

  it('a member can send a rating', () => {
    return contract.addRatingToMember(member, 10, {from:owner})
      .then( tx => {
        return contract.getRatingForMember(member, {from: owner})
      })
      .then( rating => {
        assert.equal(rating[0].toNumber(), 1, 'member rating count is not 1')
        assert.equal(rating[1].toNumber(), 10, "rating total is not 10")
        return contract.countRatingsReceived(member, {from:owner})
      })
      .then( count => {
        assert.equal(count.toNumber(), 1, 'member rating count did not increase')
      })
  })

  it('throws errors if tries to get rating count for nonMember', () => {
    return expectedExceptionPromise( () => {
      return contract.countRatingsReceived(nonMember, {from:owner})
    }, 3000000);
  })
  
  it('throws errors if nonMember tries to rate', () => {
    return expectedExceptionPromise(
      () => contract.addRatingToMember(member, 10, {from:nonMember, gas: 3000000 }),
      3000000);
  })

  it('throws errors if member tries to rate nonMember', () => {
    return expectedExceptionPromise( 
      () => contract.addRatingToMember(nonMember, 10, {from:owner, gas: 3000000 }),
      3000000);
  })
});

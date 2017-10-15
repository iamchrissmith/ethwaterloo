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
    return contract.getMemberTotal(member, {from: owner})
      .then( rating => {
        assert.equal(rating, "", 'initial member rating count is not ""')
      })
  })

  it('returns 0 initially for a member rating count', () => {
    return contract.getMemberBase(member, {from: owner})
      .then(count => {
        assert.equal(count, "", 'member rating count not initially ""')
      })
  });

  it('a member can send a rating', () => {
    return contract.addRatingToMember(member, "1", "10", {from:owner})
      .then( tx => {
        return contract.getMemberTotal(member, {from: owner})
      })
      .then( rating => {
        console.log(rating)
        assert.equal(rating, "10", "rating total is not 10")
        return contract.getMemberBase(member, {from: owner})
      })
      .then( base => {
        assert.equal(base, "1", "rating total is not 10")
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

  it('throws errors if member tries to rate self', () => {
    return expectedExceptionPromise( () => {
      return contract.addRatingToMember(owner, "1", "10", {from:owner})
    }, 3000000);
  })
  
  it('throws errors if nonMember tries to rate', () => {
    return expectedExceptionPromise(
      () => contract.addRatingToMember(member, "1", "10", {from:nonMember, gas: 3000000 }),
      3000000);
  })

  it('throws errors if member tries to rate nonMember', () => {
    return expectedExceptionPromise( 
      () => contract.addRatingToMember(nonMember, "1", "10", {from:owner, gas: 3000000 }),
      3000000);
  })
});

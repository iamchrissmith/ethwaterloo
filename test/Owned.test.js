const Owned = artifacts.require("./Owned.sol");
web3.eth.getTransactionReceiptMined = require("./libs/getTransactionReceiptMined.js");
const expectedExceptionPromise = require('./libs/expected_exception_testRPC_and_geth');

contract('Owned', function(accounts) {

  const owner = accounts[0]
  const newOwner = accounts[1]

  let contract

  beforeEach( () => {
    return Owned.new({from:owner})
      .then( instance => {
        contract = instance
      })
  })

  it('should be owned by "owner"', () => {
    return contract.owner({from:owner})
      .then( _owner => {
        assert.strictEqual(_owner, owner, "owner is not owned by 'owner'")
      })
  })

  it('allows owner to change owner', () => {
    return contract.setOwner(newOwner, {from: owner})
      .then( tx => {
        return contract.owner({from:owner})
      })
      .then( _owner => {
        assert.strictEqual(_owner, newOwner, 'owned is not owned by "newOwner"')
      })
  })

  it('rejects ownership changes from anyone but the owner', () => {
    return expectedExceptionPromise( () => {
      return contract.setOwner(newOwner, {from:newOwner})
    }, 3000000)
  })
});

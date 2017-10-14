const Pausable = artifacts.require('./Pausable.sol');
web3.eth.getTransactionReceiptMined = require("./libs/getTransactionReceiptMined.js");
const expectedExceptionPromise = require('./libs/expected_exception_testRPC_and_geth');

contract('Pausable', function(accounts) {

  const owner = accounts[0]
  const newOwner = accounts[1]

  let contract

  beforeEach( () => {
    return Pausable.new({from:owner})
      .then( instance => {
        contract = instance;
      });
  });

  it('should be running by default', () => {
    return contract.paused({from:owner})
      .then( pause => {
        assert.isFalse(pause, "is running by default");
      });
  });

  it('Owner should be able to pause the contract', () => {
    return contract.setPaused(true, {from:owner})
      .then( tx => {
        return contract.paused({from:owner});
      })
      .then( isRunning => {
        assert.isTrue(isRunning, "pausable did not turn off");
      });
  });

  it('Non-Owner should not be able to pause the contract', () => {
    return expectedExceptionPromise( () => {
      return contract.setPaused(true, {from:accounts[1]});
    }, 3000000);
  });
});
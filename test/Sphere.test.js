var Sphere = artifacts.require("./Sphere.sol");
const expectedExceptionPromise = require('./libs/expected_exception_testRPC_and_geth');

contract('Sphere', function(accounts) {

  const owner = accounts[0]
  const newOwner = accounts[1]

  let contract

  beforeEach( () => {
    return Sphere.new({from:owner})
      .then( instance => {
        contract = instance
      })
  })
});

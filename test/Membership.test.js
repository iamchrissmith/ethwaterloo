const Membership = artifacts.require('./Membership.sol');
const expectedExceptionPromise = require('./libs/expected_exception_testRPC_and_geth');

contract('Membership', function(accounts) {

  const owner = accounts[0]
  const member = accounts[1]
  const nonMember = accounts[4] //0x125b338050674ffd0d400f01311f8556f6b57a07

  let contract

  beforeEach( () => {
    return Membership.new({from:owner})
      .then( instance => {
        contract = instance;
      });
  });

  it('owner is a member', () => {
    return contract.isMember(owner, {from:owner})
      .then( isMember => {
        console.log(isMember);
        assert.isTrue(isMember, 'The owner is not a member by default')
      })
  })

  it('can get member at a specific index', () => {
    return contract.getMemberAtIndex(1, {from: owner})
      .then( _member => {
        assert.strictEqual(_member, member, 'Could not return member at 0 index')
      })
  })

  it('owner can add other members', () => {
    return contract.addMember(nonMember, {from:owner})
      .then( tx => {
        console.log(tx.logs[0].args)
        const args = tx.logs[0].args
        assert.strictEqual(args.newMember, nonMember, 'new member was not added')
        assert.equal(args.index.toNumber(), 4);
        return contract.getMemberAtIndex(args.index.toNumber(), {from:owner})
      })
      .then( _member => {
        assert.strictEqual(_member, nonMember, 'new member not at right index')
        return contract.isMember(nonMember, {from: owner})
      })
      .then( isMember => {
        assert.isTrue(isMember, 'the member does not exist')
      })
  })

  xit('non-owners cannot add members', () => {})
});
pragma solidity ^0.4.2;

import './Owned.sol';

contract Membership is Owned {

  /*----------- Globals -----------*/

  mapping(address => bool) public memberExists;

  address[] public members;

  /*----------- Events -----------*/  

  event LogNewMember(address sender, address newMember, uint index);

  /*----------- Modifiers -----------*/

  modifier fromMember() {
    require(memberExists[msg.sender]);
    _;
  }

  modifier isAMember(address member) {
    require(isMember(member));
    _;
  }

  /*----------- Constructor -----------*/

  function Membership() {
    addMember(0xBd79c7E5ae6a8604418832Cf8596b56Fb4D40eC9);
    addMember(0x3b3F565B900cE367e989909C2cE470CD0ce62BA7);
    addMember(0xCAf4ad7eddb82994B33D5a60b565E3129af80032);
    addMember(0x8e6a7eEc280a7CB433d9ef66cC60f88F12eDf8a9);
  }

  function addMember(address newMember) 
    public 
    fromOwner 
    returns(bool success)
  {
    require(!memberExists[newMember]);
    memberExists[newMember] = true;
    uint index = members.push(newMember) - 1;
    LogNewMember(msg.sender, newMember, index);
    return true;
  }

  function getMemberAtIndex(uint index) 
    public 
    constant
    returns(address member)
  {
    return members[index];
  }

  function isMember(address member) 
    public 
    constant
    returns(bool isMember)
  {
    return memberExists[member];
  }

}
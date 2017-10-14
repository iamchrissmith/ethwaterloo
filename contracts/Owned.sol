pragma solidity ^0.4.2;

contract Owned {
  address public owner;

  event LogNewOwner(address sender, address newOwner);

  modifier fromOwner {
    require(msg.sender == owner);
    _;
  }

  function Owned() {
    owner = msg.sender;
  }

  function setOwner(address newOwner) 
    public 
    fromOwner 
    returns(bool success)
  {
    require(newOwner != owner);
    owner = newOwner;
    return true;
  }

  function getOwner() 
    constant 
    public 
    returns(address owner) 
  {
    return owner;
  }
}
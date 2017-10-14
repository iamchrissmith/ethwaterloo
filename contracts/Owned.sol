pragma solidity ^0.4.2;

contract Owned {
  /*----------- Globals -----------*/

  address public owner;

  /*----------- Events -----------*/

  event LogNewOwner(address sender, address newOwner);

  /*----------- Modifiers -----------*/

  modifier fromOwner {
    require(msg.sender == owner);
    _;
  }

  /*----------- Constructor -----------*/

  function Owned() {
    owner = msg.sender;
  }

  /*----------- Owner Methods -----------*/

  function setOwner(address newOwner) 
    public 
    fromOwner 
    returns(bool success)
  {
    require(newOwner != owner);
    owner = newOwner;
    return true;
  }

  /*----------- Public Methods -----------*/

  function getOwner() 
    constant 
    public 
    returns(address owner) 
  {
    return owner;
  }
}
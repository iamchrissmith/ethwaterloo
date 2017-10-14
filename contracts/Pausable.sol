pragma solidity ^0.4.2;

import './Owned.sol';

contract Pausable is Owned {
  /*----------- Globals -----------*/
  bool public paused;

  /*----------- Modifiers -----------*/

  modifier whenPaused {
    require(paused);
    _;
  }
  modifier whenNotPaused {
    require(!paused);
    _;
  }

  /*----------- Constructor -----------*/

  function Pausible(){}

  /*----------- Owner Methods -----------*/

  function setPaused(bool newState) 
    public 
    fromOwner 
    returns(bool success)
  {
    require(paused != newState);

    paused = newState;
    return true;
  }
}
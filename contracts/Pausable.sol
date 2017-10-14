pragma solidity ^0.4.2;

import './Owned.sol';

contract Pausable is Owned {
  bool public paused;

  modifier whenPaused {
    require(paused);
    _;
  }
  modifier whenNotPaused {
    require(!paused);
    _;
  }

  function Pausible(){}

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
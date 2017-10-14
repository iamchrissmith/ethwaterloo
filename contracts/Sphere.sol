pragma solidity ^0.4.2;

contract Sphere {
  /**
   * Owned
   * * setOwner
   * * getOwner
   * * LogOwnerSet
   */
  /*address internal owner;

  modifier fromOwner {}

  function Owned() {
    owned = msg.sender;
  }

  function setOwner(address newOwner) public fromOwner returns(bool success);

  function getOwner() constant public returns(address owner);*/

  /**
   * Pausible
   * * LogPausedSet
   * * setPaused
   * * isPaused
   */
  /*bool public paused;

  modifier whenPaused {}
  modifier whenNotPaused {}

  function Pausible(bool isPaused){
    paused = isPaused;
  }

  function setPaused(bool newState) public fromOwner returns(bool success);*/
  /**
   * Members
   * * LogNewMember
   * * addMember
   * * getMemberAtIndex
   * * isMember
   */
  mapping(address => uint) public memberExists;
  address[] public members;
  uint public maxMember;

  event LogNewMember(address sender, address newMember, uint index);

  modifier fromMember {}

  function Members() {
    addMember(msg.sender);
  }

  function addMember(address newMember) public fromOwner returns(bool success);

  function getMemberAtIndex(address member) public returns(uint index);

  function isMember(address member) public returns(bool isMember);

  /**
   * Rating
   * * addRatingToMember(address, uint)
   * * * check if we completed last survey round
   * * * set new base/total
   * * * check if we completed this survey, emit LogCompleteRating event
   * * LogCompleteRating
   * * getRatingForMember
   */

    struct Rating {
      uint count;
      uint total;
    }

    mapping(address => Rating) public ratings;

    event LogCompleteRating(address member, uint base, uint rating);

    function addRatingToMember(address member, uint rating) public fromMember returns(bool success);

    function getRatingForMember(address member) public returns(uint rating);

}

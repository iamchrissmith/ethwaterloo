pragma solidity ^0.4.2;

contract Sphere {


  uint256 one;


 function Sphere(uint256 _one) {
   one = _one;
 }
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
  mapping(address => bool) public memberExists;
  address[] public members;
  /*uint8 public maxMember;*/

  /*event LogNewMember(address sender, address newMember, uint8 index);*/

  modifier fromMember() {
    require(memberExists[msg.sender]);
    _;
  }

  /*function Members() {
    addMember(msg.sender);
  }*/

  /*function addMember(address newMember) public fromOwner returns(bool success);*/

  /*function getMemberAtIndex(address member) public returns(uint index);*/

  /*function isMember(address member) public returns(bool isMember);*/

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
      uint256 count;
      uint256 total;
    }

    mapping(address => Rating) public ratings;

    event LogCompleteRating(address member, uint256 avgRating);

    function addRatingToMember(address member, uint256 rating) public fromMember returns(bool success) {
      // TODO: restrict 1 rating per period.

      ratings[member].count += one;
      ratings[member].total += rating;

      return true;
    }

    /*function getRatingForMember(address member) public returns(uint rating);*/

}

pragma solidity ^0.4.2;

import './Pausable.sol';
import './Membership.sol';

contract Sphere is Pausable, Membership {
  /**
   * Rating
   * * addRatingToMember(address, uint)
   * * * check if we completed last survey round
   * * * set new base/total
   * * * check if we completed this survey, emit LogCompleteRating event
   * * LogCompleteRating
   * * getRatingForMember
   */

    // struct Rating {
    //   uint count;
    //   uint total;
    // }

    // mapping(address => Rating) public ratings;

    // event LogCompleteRating(address member, uint base, uint rating);

    // function addRatingToMember(address member, uint rating) public fromMember returns(bool success);

    // function getRatingForMember(address member) public returns(uint rating);
}

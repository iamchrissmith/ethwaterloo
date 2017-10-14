pragma solidity ^0.4.2;

import './Pausable.sol';
import './Membership.sol'; 

contract Sphere is Membership, Pausable {
  /**
    * Rating
    * * addRatingToMember(address, uint)
    * * * check if we completed last survey round
    * * * set new base/total
    * * * check if we completed this survey, emit LogCompleteRating event
    * * LogCompleteRating
    * * getRatingForMember
    */
    /*----------- Types -----------*/

    struct Rating {
        uint256 count;
        uint256 total;
    }

    /*----------- Globals -----------*/

    uint256 one;

    mapping(address => Rating) public ratings;


    /*----------- Events -----------*/

    event LogCompleteRating(address member, uint256 avgRating);


    /*----------- Constructor -----------*/

    function Sphere(uint256 _one) {
        one = _one;
    }

    /**
     * Rating
     * * addRatingToMember(address, uint)
     * * * check if we completed last survey round
     * * * set new base/total
     * * * check if we completed this survey, emit LogCompleteRating event
     * * LogCompleteRating
     * * getRatingForMember
     */
    function addRatingToMember(address member, uint256 rating) public fromMember returns(bool success) {
        // TODO: restrict 1 rating per period.

        ratings[member].count += one;
        ratings[member].total += rating;

        return true;
    }

    /*----------- Cnstants -----------*/

    function getMemberCount() public constant returns(uint256) {
        return members.length;
    }

    /*function getRatingForMember(address member) public returns(uint rating);*/

    // function getRatingForMember(address member) public returns(uint rating);
}

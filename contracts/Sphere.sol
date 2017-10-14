pragma solidity ^0.4.2;

import './Pausable.sol';
import './Membership.sol';

contract Sphere is Membership, Pausable {
    /*----------- Types -----------*/

    struct Rating {
        uint256 count;
        uint256 total;
    }

    /*----------- Globals -----------*/

    uint256 one;

    mapping(address => Rating) public ratings;
    mapping(address => uint256) public ratingsReceived;

    /*----------- Events -----------*/

    event LogCompleteRating(address member, uint256 avgRating);


    /*----------- Constructor -----------*/

    function Sphere(uint256 _one) {
        one = _one;
    }

    /*----------- Member Methods -----------*/

    function addRatingToMember(address member, uint256 rating)
      public
      fromMember
      isAMember(member)
      returns(bool success)
    {
      // TODO: restrict 1 rating per period.
      // TODO: emit rating completed when (ratingsReceived[member] == (memberCount - 1)*2)

      ratings[member].count += one;
      ratings[member].total += rating;
      ratingsReceived[member] += 1;

      return true;
    }

<<<<<<< HEAD
    /*----------- Constants -----------*/

    function getMemberCount() public constant returns(uint256) {
        return members.length;
    }

    function getMembers() public constant returns(address[]) {
        return members;
=======
    /*----------- Public Methods -----------*/

    function getRatingForMember(address member) 
      public 
      constant
      isAMember(member)
      returns(
        uint256 count,
        uint256 total
      )
    {
      return (
        ratings[member].count,
        ratings[member].total
      );
>>>>>>> 6df9436b07b9c3ba2e7c40a95c4b4032788add82
    }

    /*function getRatingForMember(address member) public returns(uint rating);*/

    function countRatingsReceived(address member)
      public
      constant
      isAMember(member)
      returns(uint256 count)
    {
      return ratingsReceived[member];
    }
}

pragma solidity ^0.4.2;

// SafeMath helps prevent integer overflows
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
// Ownable helps streamline contract inheritance
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

// Initiates this address as the owner
contract CurseCoin is Ownable {
    // adds SafeMath methods to uint256 types
    using SafeMath for uint256;

    string public name;
    string public symbol;
    uint256 public curseCost;

    // Events are small empty functions that can be called as a signal or log.
    event Curse(address _curser, address _accursed);
    event Nullify(address _blessed);

    mapping(address => bool) public unfortunates;

    constructor() public {
        name = "CurseCoin";
        symbol = "CC";
        curseCost = 20 finney;
    }

    // curse allows msg.sender to curse a victim if they pay the curseCost
    function curse(address _victim) public payable {
        // checks that curser is sending correct amount for cursing
        require((msg.value > curseCost), "You gotta pay the troll toll");

        // first check if curse's address
        require((unfortunates[_victim] == false), "Victim is already cursed");

        unfortunates[_victim] = true;
        emit Curse(msg.sender, _victim);
    }

    // nullify allows msg.sender to uncurse themself (if applicable) if they pay the curseCost
    function nullify() public payable {
        // checks that curser is sending correct amount for uncursing
        require((msg.value > curseCost), "You gotta pay the uncursing troll toll");

        // first check if curse's address
        require((unfortunates[msg.sender] == true), "You're not even cursed 🤔");

        unfortunates[msg.sender] = false;
        emit Nullify(msg.sender);
    }

    // withdraw allows the brilliant contract writers to cash out
    function withdraw() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    // amICursed allows msg.sender to check if they're cursed
    function amICursed() public view returns (bool) {
        return unfortunates[msg.sender];
    }
}
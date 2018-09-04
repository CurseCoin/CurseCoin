var CurseCoin = artifacts.require("./CurseCoin.sol");

contract("CurseCoin", function (accounts) {
  var ccInstance;
  var curser;
  var victim;

  it("allows a curser to curse a victim", function () {
    return CurseCoin.deployed().then(function (instance) {
      ccInstance = instance;
      curser = accounts[0];
      victim = accounts[1];

      return ccInstance.curse(victim, {
        from: curser, value: web3.toWei('2', 'ether')
      }).then(function (receipt) {
        return ccInstance.unfortunates(victim);
      }).then(function (cursed) {
        assert(cursed, "the victim was marked as cursed");
        return ccInstance.unfortunates(accounts[0]);
      });
    });
  });
});
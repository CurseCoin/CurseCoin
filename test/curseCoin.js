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
        from: curser, value: web3.toWei("2", "ether")
      }).then(function (receipt) {
        return ccInstance.unfortunates(victim);
      }).then(function (cursed) {
        assert(cursed, "the victim was marked as cursed");
        return ccInstance.unfortunates(accounts[0]);
      });
    });
  });

  // it("allows an accursed account to nullify their own curse", function () {
  //   return CurseCoin.deployed().then(function (instance) {
  //     ccInstance = instance;
  //     curser = accounts[2];
  //     victim = accounts[3];

  //     return ccInstance.curse(victim, {
  //       from: curser, value: web3.toWei("2", "ether")
  //     }).then(function (receipt) {
  //       return ccInstance.nullify({
  //         from: victim, value: web3.toWei("2", "ether")
  //       });
  //     }).then(function (uncurse) {
  //       assert(!ccInstance.unfortunates(victim), "the victim is uncursed")
  //       return ccInstance.unfortunates(victim);
  //     });
  //   });
  // });

  it("allows an account to check if they're cursed", function () {
    return CurseCoin.deployed().then(function (instance) {
      ccInstance = instance;
      curser = accounts[2];
      victim = accounts[3];

      return ccInstance.curse(victim, {
        from: curser, value: web3.toWei("2", "ether")
      }).then(function (receipt) {
        var curseCheck = ccInstance.amICursed({
          from: victim, value: web3.toWei("2", "ether")
        });
        assert(curseCheck, "the victim should be cursed")
      });
    });
  });
});
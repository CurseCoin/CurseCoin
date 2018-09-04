var CurseCoin = artifacts.require("./CurseCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(CurseCoin);
};

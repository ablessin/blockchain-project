const SimpleStorage = artifacts.require("SimpleStorage");
const Bank = artifacts.require("Bank");
const Token = artifacts.require("Token");
const JeuneDiplome = artifacts.require("JeuneDiplome");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SimpleStorage);
  deployer
    .deploy(Token, 1000)
    .then(async () => {
      let instance = await Token.deployed();
      await instance.transfer(accounts[1], 500);
    })
    .then(() => deployer.deploy(JeuneDiplome, Token.address))
    .then(async () => {
      let instance = await Token.deployed();
      await instance.approve(JeuneDiplome.address, 500);
    })
    .then(() => deployer.deploy(Bank, Token.address))
    .then(async () => {
      let instance = await Token.deployed();
      await instance.approve(Bank.address, 500);
    });
};

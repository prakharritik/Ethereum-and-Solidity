const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.mneumonic,
  process.env.rinkby
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: "0x" + evm.bytecode.object,
      arguments: ["Hi! there"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
};

deploy();

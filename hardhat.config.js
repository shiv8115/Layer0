require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require(`@nomiclabs/hardhat-etherscan`);
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-deploy");
require("solidity-coverage");
require('./tasks');
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.18", 
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/r1zLtlI4VzABNRCDTlzwkUudARlrlXRV",
      accounts:
        ["29cf1b239b8a1c09bb8740673c32839d991e256b87e072bcb1f49b737e959435"],
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/XV43uAjGjyYn4FEFd202cfufmON3kMYM",
      accounts: ["29cf1b239b8a1c09bb8740673c32839d991e256b87e072bcb1f49b737e959435"],
    }
  },
};

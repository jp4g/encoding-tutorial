require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')

const { ACCOUNT_PRIVATE_KEY, MNEMONIC, INFURA } = process.env

const accounts =
  ACCOUNT_PRIVATE_KEY !== undefined
    ? //Private key overrides mnemonc- leave pkey empty in .env if using mnemonic
      [`0x${ACCOUNT_PRIVATE_KEY}`]
    : {
        mnemonic: MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      };

module.exports = {
  solidity: "0.8.6",
  networks: {
    arbitrum: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${INFURA}`,
      accounts
    }
  }
}


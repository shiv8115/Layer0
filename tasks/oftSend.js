const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");
//const {getNamedAccounts} = require('hardhat');
module.exports = async function (taskArgs, hre) {
    let signers = await ethers.getSigners()
    let owner = signers[0]
    const amount = 1000000;
    let toAddress = owner.address;
    let qty = ethers.utils.parseEther(taskArgs.qty)
    const deployer = "0x082DaA07AF2609771aA35211BC5739B16f18b93f";
    let localContract, remoteContract;
    const isMinted = taskArgs.isminted;
    const omniCounter = await ethers.getContract("ERC20Example");
    if(taskArgs.contract) {
        localContract = taskArgs.contract;
        remoteContract = taskArgs.contract;
    } else {
        localContract = taskArgs.localContract;
        remoteContract = taskArgs.remoteContract;
    }

    if(!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get remote chain id
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

    // get local contract
    const localContractInstance = await ethers.getContract(localContract)

    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example
    const payload = ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'bool'], [deployer, qty, isMinted]);

    const endpoint = await ethers.getContractAt("ILayerZeroEndpoint", ENDPOINTS[hre.network.name])
    let fees = await endpoint.estimateFees(remoteChainId, omniCounter.address, payload, false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)
    let tx = await (
      await localContractInstance.mintTokenOrBurn(
          remoteChainId,                 // remote LayerZero chainId
          deployer,                     // 'to' address to send tokens
          qty,
          isMinted,                           // amount of tokens to send (in wei)               
          { value: fees[0] }
      )
  ).wait()
    console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`)
    console.log(` tx: ${tx.transactionHash}`)
    console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`)
}

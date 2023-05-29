const {ethers, getNamedAccounts} = require('hardhat');

void (async () => {
  const {deployer} = await getNamedAccounts();

  const contract = await ethers.getContract('ERC20Example');
  console.log(`Minting token on ${deployer}`);
  const tnx = await contract.mintToken(10121, deployer, 10000, {value: 500000000});
  await tnx.wait();

  console.log(`Minted token on ${deployer} of amount ${10000}`);
})().catch(console.error);

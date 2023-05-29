const {ethers, getNamedAccounts} = require('hardhat');

void (async () => {
  const {deployer} = await getNamedAccounts();

  const contract = await ethers.getContract('ERC20Example');

  const balanceOfOwner = await contract.balanceOf(deployer);

  console.log({balanceOfOwner});

  const totalSupply = await contract.circulatingSupply();

  console.log({totalSupply});

  const cnt = await contract.mockCounter();
  console.log({cnt});
})().catch(console.error);

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('MNEMONIC: ' , process.env.MNEMONIC);
  console.log('INFURA_URL: ' , process.env.INFURA_URL);
  
  console.log('Attempting to deploy from account', accounts[0]);

  const interface = JSON.parse(compiledFactory.interface)
  const bytecode = compiledFactory.bytecode;

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
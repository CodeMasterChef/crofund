import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9eDBa2c9D1fce03AD2613b47D3c58894D6C6824c'
);

export default instance;
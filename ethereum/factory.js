import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x0348A699e995D756c60B007B2A0E5Dc530bC1f9E'
);

export default instance;
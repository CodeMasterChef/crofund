import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xDFFD62EdbCE0442681a8a87122372959C44F612a'
);

export default instance;
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x41430a8d6ad868D991620fc3C227DD0ef7353381'
);

export default instance;
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x80224659F21a4C30e688858BD9eBa1008F59728d'
);

export default instance;
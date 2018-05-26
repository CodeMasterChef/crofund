import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3536E9C8addECa0EADe810Bd9867dA2FC5e011fD'
);

export default instance;
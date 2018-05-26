import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Icon, Image, Button, Dropdown } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        // const campaigns = await factory.methods.getDeployedCampaigns().call();

        const categoryList = [
            'Games',
            'Art',
            'Film',
            'Technology',
            'Vehicle',
        ];

        const campaignListCount = await factory.methods.getCampaignListCount().call();
        console.log('count', campaignListCount);

        let campaigns = await Promise.all(
            Array(parseInt(campaignListCount))
                .fill()
                .map((element, index) => {
                    return factory.methods.campaignList(index).call();
                })
        );
        console.log('list', campaigns);

        //  campaigns = [];
        return { campaigns, categoryList };
    }

    renderCampaigns() {
        console.log(this.props.campaigns);
        const items = this.props.campaigns.map(obj => {
            return {
                header: obj.campaignAddress,
                description: (
                    <div>
                        <div>{this.props.categoryList[obj.categoryId]}</div>
                        <Link route={`/projects/${obj.campaignAddress}`}>
                            <a>Detail</a>
                        </Link>
                    </div>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Opening Projects</h3>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;
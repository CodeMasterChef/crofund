import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {

        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <a>Detail</a>
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
                    <h3>Open Project</h3>
                    <Button
                        floated="right"
                        content="Start your Project"
                        icon="add circle"
                        primary
                    />

                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;
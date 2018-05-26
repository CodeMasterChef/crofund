import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Icon, Image, Button, Grid, Menu } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        // const campaigns = await factory.methods.getDeployedCampaigns().call();
        const campaigns = [];
        return { campaigns };
    }

    renderCampaigns() {

        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/projects/${address}`}>
                        <a>Detail</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    state = { activeItem: 'All' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    renderMenu() {
        const Menus = [
            { key: 'All'   ,name: 'All' },
            { key: 'Games' ,name: 'Games' },
            { key: 'Art'   ,name: 'Art' },
            { key: 'Film'  ,name: 'Film' },
            { key: 'Techn' ,name: 'Technology' },
            { key: 'Vehic' ,name: 'Vehicle' },
        ];

        return (
            <Menu tabular defaultActiveIndex='0' items={Menus} onItemClick={this.handleItemClick}/>
        );
    }

    render() {
        return (
            <Layout>
                {this.renderMenu()}
                <h3>{this.state.activeItem}</h3>
                {this.renderCampaigns()}
            </Layout>
        )
    }
}

export default CampaignIndex;
import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Icon, Image, Button, Dropdown, Grid, Menu } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    state = {
        activeItem: 'All', activeItemIndex: -2, campaigns: [],
        categoryList: [
            'Games',
            'Art',
            'Film',
            'Technology',
            'Vehicle',
        ],
        campaignsStorage: [],
        campaignListCount: 0
    };


    static async getInitialProps() {
        // const campaigns = await factory.methods.getDeployedCampaigns().call();

        //     const categoryList = [
        //         'Games',
        //         'Art',
        //         'Film',
        //         'Technology',
        //         'Vehicle',
        //     ];

        //    const campaigns = await this.getListCampaign();

        //     // const campaigns = [];
        return {};
    }

    componentDidMount() {
        this.getListCampaign(-2);
    }

    async getListCampaign(menuIndex) {
        let campaigns;
        switch (menuIndex) {
            case -2:
                // get from server
                const campaignListCount = await factory.methods.getCampaignListCount().call();
                console.log('count', campaignListCount);

                campaigns = await Promise.all(
                    Array(parseInt(campaignListCount))
                        .fill()
                        .map((element, index) => {
                            return factory.methods.campaignList(index).call();
                        })
                );
                this.setState({ campaignsStorage: campaigns, campaignListCount: campaignListCount });
                break;
            case -1:
                // get all
                campaigns = this.state.campaignsStorage;
                break;
            default:

                campaigns = this.state.campaignsStorage.filter(item => {
                    if (item.categoryId == menuIndex) {
                        return true;
                    } else {
                        return false;
                    };
                });
                break;
        }

        this.setState({
            campaigns
        });
    }

    renderCampaigns() {
        const items = this.state.campaigns.map(obj => {
            return {
                header: obj.name,
                description: (
                    <div>
                        <div>{this.state.categoryList[obj.categoryId]}</div>
                        <img src={obj.imageUrl} style={{ maxWidth: 500, maxHeight: 150 }} />
                        <div>
                            <Link route={`/projects/${obj.campaignAddress}`}>
                                <a>Detail</a>
                            </Link>
                        </div>
                    </div>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }


    handleItemClick = async (e, obj) => {
        this.setState({ activeItem: obj.name, activeItemIndex: obj.index });
        const i = obj.index - 1;
        // get new campains
        await this.getListCampaign(i);

    }


    renderMenu() {
        const Menus = [
            { key: -1, name: 'All' },
            { key: 0, name: 'Games' },
            { key: 1, name: 'Art' },
            { key: 2, name: 'Film' },
            { key: 3, name: 'Technology' },
            { key: 4, name: 'Vehicle' },
        ];

        return (
            <Menu tabular defaultActiveIndex='0'
                items={Menus} onItemClick={this.handleItemClick} />
        );
    }

    render() {
        return (
            <Layout>
                {this.renderMenu()}
                {/* <h3>{this.state.activeItem}</h3> */}
                {this.renderCampaigns()}
            </Layout>
        )
    }
}

export default CampaignIndex;
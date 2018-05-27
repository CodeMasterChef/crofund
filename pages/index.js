import React, { Component, Dimensions } from 'react';
import factory from '../ethereum/factory';
import { Card, Icon, Image, Button, Dropdown, Grid, Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';
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
        campaignListCount: 0,
        loading: false
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
        this.setState({ loading: true });
        let campaigns = [];
        switch (menuIndex) {
            case -2:
            case -1:
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
           
                // get all
                // campaigns = this.state.campaignsStorage;
                // break;
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
            campaigns,
            loading: false
        });
    }

    getGridColumn(i) {

        return (

            <Grid.Column width={8}>
                <div style={{ border: '1px solid lightgray', borderRadius: 5, padding: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={this.state.campaigns[i].imageUrl} style={{ maxWidth: "100%", maxHeight: 300, height: 'auto' }} fluid="true" />
                    </div>
                    <h3 style={{ textAlign: 'center' }}>{this.state.campaigns[i].name}</h3>
                    <div style={{ marginBottom: 10, textAlign: 'center' }}>{this.state.categoryList[this.state.campaigns[i].categoryId]} </div>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }} fluid="true">
                        <Link route={`/projects/${this.state.campaigns[i].campaignAddress}`}>
                            <a>
                                <Button
                                    floated="left"
                                    content="Detail"
                                    icon="unordered list"
                                    color='teal'
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </Grid.Column>

        );
    }

    renderCampaigns() {
        const items = [];
        for (let i = 0; i < this.state.campaigns.length; i += 2) {
            items.push({
                description: (
                    <Grid>
                        <Grid.Row >
                            {
                                this.getGridColumn(i)
                            }
                            {
                                (this.state.campaigns[i + 1]) ? this.getGridColumn(i + 1) : ''
                            }
                        </Grid.Row>
                    </Grid>

                ),

                fluid: true
            });
        }
        // const items = this.state.campaigns.map((obj) => {
        //     return
        // });

        let styles = {
            card: {
                boxShadow: 'none !ipmortant'
            }
        };

        return (
            <Card.Group items={items} style={styles.card} />
        );
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
                {
                    this.state.loading ? (
                        <Segment>
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>

                            <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
                        </Segment>
                    ) : false
                }


                {this.renderCampaigns()}
            </Layout>
        )
    }
}

export default CampaignIndex;
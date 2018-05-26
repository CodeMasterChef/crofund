import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Dropdown, Image, Grid } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class ProjectNew extends Component {
    state = {
        minimumContrubtion: '',
        errorMessage: '',
        loading: false,
        description: '',
        name: '',
        imageUrl: '',
        categoryObj: {},
        message: ''
    }

    static async getInitialProps(props) {
        const categoryList = [
            { key: '0', value: '0', text: 'Games' },
            { key: '1', value: '1', text: 'Art' },
            { key: '2', value: '2', text: 'Film' },
            { key: '3', value: '3', text: 'Technology' },
            { key: '4', value: '4', text: 'Vehicle' },
        ];
        // ["Games", "Art", "Film", "Technology", "Vehicle"];

        return { categoryList };
    }



    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '', message: 'Please wait...' });
        try {
            const accounts = await web3.eth.getAccounts();
            const ethers = web3.utils.toWei(this.state.minimumContrubtion, 'ether');
            await factory.methods.createCampaign(ethers, parseInt(this.state.categoryObj.value), this.state.description, this.state.name, this.state.imageUrl)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute('/');
            this.setState({ loading: false, message: 'Success' });
        } catch (err) {
            this.setState({ loading: false, errorMessage: err.message, message: '' });
        }

    }

    render() {

        return (
            <Layout>
                <h1>Create a Project</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name:</label>
                        <Input
                            placeholder="Project name"
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                        <label>Description:</label>
                        <Input
                            placeholder="Description"
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                        <label>Category:</label>
                        <Dropdown placeholder='Games, Art...' fluid search selection
                            onChange={(event, data) => this.setState({ categoryObj: data })}
                            options={this.props.categoryList} />
                        <label>Minimum contribution:</label>
                        <p style={{ fontSize: '11px' }}>The least ether amount to become an approver.</p>
                        <Input
                            label="ether"
                            placeholder="0.1, 1, 2..."
                            labelPosition="right"
                            value={this.state.minimumContrubtion}
                            onChange={event => this.setState({ minimumContrubtion: event.target.value })}
                        />
                        <label>Image URL:</label>

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={13}>
                                    <Input
                                        placeholder='Ex: http://imigur.com/image.png'
                                        value={this.state.imageUrl}
                                        onChange={event => this.setState({ imageUrl: event.target.value })}
                                    />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Image src={this.state.imageUrl} size='small' fluid />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Form.Field>
                    <Message error header="Errors" content={this.state.errorMessage} />
                    <div style={{ color: '#57BEB9' }}>
                        <b>{this.state.message}</b>
                    </div>
                    <div style={{ width: '100%' }} >
                        <Button loading={this.state.loading} fluid disabled={this.state.loading} color="teal">Create</Button>
                    </div>

                </Form>
            </Layout>
        )
    }
}

export default ProjectNew;
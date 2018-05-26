import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input , Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class ProjectNew extends Component {
    state = {
        minimumContrubtion: '',
        errorMessage : '',
        loading : false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading : true , errorMessage : ''});
        try {
            const accounts = await web3.eth.getAccounts();
            const ethers = web3.utils.toWei(this.state.minimumContrubtion, 'ether');
            await factory.methods.createCampaign(ethers)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute('/');
        } catch (err) {
            console.log(err);
            this.setState({errorMessage : err.message});
        }
        this.setState({loading : false});
    }

    render() {

        return (
            <Layout>
                <h1>Create a Project</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.minimumContrubtion}
                            onChange={event => this.setState({ minimumContrubtion: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Errors" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} disabled={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default ProjectNew;
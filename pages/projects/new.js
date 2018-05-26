import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message, Dropdown } from 'semantic-ui-react';
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
        categoryObj: {}
    }

    static async getInitialProps(props) {

        // console.log('asdfasdf');
        // const categoryList = await factory.methods.getAllCategories().call();
        const categoryList = [
            { key: '0', value: '0', text: 'Games' },
            { key: '1', value: '1', text: 'Art' },
            { key: '2', value: '2', text: 'Film' },
            { key: '3', value: '3', text: 'Technology' },
            { key: '4', value: '4', text: 'Vehicle' },
        ];
        // ["Games", "Art", "Film", "Technology", "Vehicle"];
        // console.log('category list: ', categoryList);
        return { categoryList };
    }



    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            const ethers = web3.utils.toWei(this.state.minimumContrubtion, 'ether');
            console.log('mm', parseInt(this.state.categoryObj.value));
            await factory.methods.createCampaign(ethers, parseInt(this.state.categoryObj.value), this.state.description, this.state.name, this.state.imageUrl)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute('/');
        } catch (err) {
            console.log(err);
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    }

    render() {

        return (
            <Layout>
                <h1>Create a Project</h1>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name</label>
                        <Input
                            placeholder="Project name"
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                        <label>Description</label>
                        <Input
                            placeholder="Description"
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                        <label>Category</label>
                        <Dropdown placeholder='Games, Art...' fluid search selection
                            onChange={(event, data) => this.setState({ categoryObj: data })}
                            options={this.props.categoryList} />
                        <label>Minimum contribution</label>
                        <Input
                            label="ether"
                            placeholder="0.1, 1, 2..."
                            labelPosition="right"
                            value={this.state.minimumContrubtion}
                            onChange={event => this.setState({ minimumContrubtion: event.target.value })}
                        />
                        <label>Image Url:</label>
                        <Input
                            placeholder='Ex: http://image.png...'
                            value={this.state.imageUrl}
                            onChange={event => this.setState({ imageUrl: event.target.value })}
                        />


                    </Form.Field>
                    <Message error header="Errors" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} disabled={this.state.loading} color="teal">Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default ProjectNew;
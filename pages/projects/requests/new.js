import React, { Component } from 'react';
import { Form, Button, Message, Input , Icon } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: '',
    message : ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    

    return { address , balance: summary[1]};
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' , message : 'Please wait...' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/projects/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false , message : 'Success!' });
  };

  render() {
       const {balance} = this.props;
    return (
      <Layout>
        <Link route={`/projects/${this.props.address}/requests`}>
          <a style={{color: '#57BEB9'}}><Icon name='arrow left' /> Back</a>
        </Link>
        <h3>Create a Request</h3>
        <p>
        Your requests for withdrawing money from your funding.
        </p>
        <p>
        Project Balance: <b>{web3.utils.fromWei(balance, 'ether')} ether</b>
        </p>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description:</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Wanted Withdraw Amount:</label>
            <Input
              value={this.state.value}
              label="ether"
              placeholder='0.1, 0.01, 1, 2,..'
              labelPosition="right"
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient Address:</label>
            <Input
             placeholder='0x127fb6a244cA96786...'
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })}
            />
          </Form.Field>

          <Message error header="Error" content={this.state.errorMessage} />
          <div style={{color: '#57BEB9'}}>
           <b>{this.state.message}</b>
          </div>
          <div style={{width: '100%'}}>
          <Button color="teal" fluid loading={this.state.loading} disabled={this.state.loading || balance === 0 }>
            Create
          </Button>
          </div>

        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
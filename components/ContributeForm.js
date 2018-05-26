import React, { Component } from 'react';
import { Form, Input, Message, Button, Progress , Label } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    message: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    
    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' ,  message : "Please wait..." });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/projects/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '', message: 'Success!' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <h3>Amount to Contribute:</h3>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Errors" content={this.state.errorMessage} />
        <div style={{ width: '100%' }}>
          <div style={{color: '#57BEB9'}}>
           <b>{this.state.message}</b>
          </div>
          <Button color='teal' fluid loading={this.state.loading} disabled={this.state.loading}>
            Contribute
        </Button>



        </div>
      </Form>
    );
  }
}

export default ContributeForm;
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button, Image } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class ProjectShow extends Component {

  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      imageUrl: summary[6],
      description: summary[7],
      name: summary[8]

    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: 'Address of Manager',
        meta:
          'The manager created this project and can create requests to withdraw money',
        description: manager,
        style: { overflowWrap: 'break-word' }
      },
      {
        header: 'Minimum Contribution (ether)',
        meta:
          'You must contribute at least this much ether to become an approver',
        description: web3.utils.fromWei(minimumContribution, 'ether')

      },
      {
        header: 'Number of Requests',
        meta:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers',
        description: requestsCount,
      },
      {
        header: 'Number of Approvers',
        meta:
          'Number of people who have already donated to this porject',
        description: approversCount,

      },
      {
        header: 'Campaign Balance (ether)',
        meta:
          'The balance is how much money this porject has left to spend.',
        description: web3.utils.fromWei(balance, 'ether')

      }
    ];
    return <Card.Group items={items} itemsPerRow={2} />;
  }

  render() {
    return (
      <Layout>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <h2>{this.props.name}</h2>
              <p>{this.props.description}</p>
              <Image src={this.props.imageUrl} fluid />
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Minimum Contribution: {web3.utils.fromWei(this.props.minimumContribution, 'ether')} (ether)</Card.Header>
                  <Card.Meta>You must contribute at least this much ether to become an approver.</Card.Meta>
                  <Card.Description>
                    <ContributeForm address={this.props.address} />
                  </Card.Description>
                </Card.Content>
              </Card>

              <Card fluid>
                <Card.Content>
                  <Card.Header>Requests:</Card.Header>
                  <Card.Meta>Your requests for withdrawing money from your funding.</Card.Meta>
                  <Card.Description>
                    <Link route={`/projects/${this.props.address}/requests`}>
                      <a>
                        <Button color='teal' fluid>View Requests</Button>
                      </a>
                    </Link>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Layout>
    )
  }
}

export default ProjectShow;
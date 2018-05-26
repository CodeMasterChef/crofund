import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class ProjectShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
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
        meta: manager,
        description:
          'The manager created this project and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: 'Minimum Contribution (ether)',
        meta: web3.utils.fromWei(minimumContribution, 'ether'),
        description:
          'You must contribute at least this much ether to become an approver'
      },
      {
        header: 'Number of Requests',
        meta: requestsCount,
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: 'Number of Approvers',
        meta: approversCount,
        description:
          'Number of people who have already donated to this porject'
      },
      {
        header: 'Campaign Balance (ether)',
        meta: web3.utils.fromWei(balance, 'ether'),
        description:
          'The balance is how much money this porject has left to spend.'
      }
    ];
    console.log(items);
     return <Card.Group items={items} itemsPerRow={1} />;
    // return items.map((item, index) => (
    //   <div className="indent" key={index}>
    //     <div class="content" >
    //       <div class="header">{item.header}</div>
    //       <div class="meta">{item.meta}</div>
    //       <div class="description">{item.description}</div>
    //     </div>
    //   </div>
    // ));
  }

  render() {

    return (
      <Layout>
        <h3>Project Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
              <br/>
              {this.renderCards()}
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/projects/${this.props.address}/requests`}>
                <a>
                  <Button color='teal'>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default ProjectShow;
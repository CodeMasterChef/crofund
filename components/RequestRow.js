import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

    state = {
        aprroveMessage: '',
        finalizeMessage: '',
        aprroveErrorMessage: '',
        finalizeErrorMessage: '',
        approverLoading : false,
        finalizeLoading : false
    };

    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        this.setState({ approverLoading: true, aprroveErrorMessage: '' , aprroveMessage: 'Please Wait...' });
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            this.setState({  approverLoading: false, aprroveMessage: 'Success!' });
            Router.replaceRoute(`/projects/${this.props.address}/requests`);

        } catch (err) {
            this.setState({  approverLoading: false, aprroveErrorMessage: err.message, aprroveMessage: '' });

        }


    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        this.setState({ finalizeLoading: true, finalizeErrorMessage: '' , finalizeMessage: 'Please Wait...' });
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            this.setState({ finalizeLoading: false,  finalizeMessage: 'Success!' });
            Router.replaceRoute(`/projects/${this.props.address}/requests`);
        } catch (err) {
            this.setState({finalizeLoading: false,  errorMessage: err.message, aprroveMessage: '' });
        }
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        console.log(request);
        const readyToFinalize = request.approvalCount >= approversCount / 2;

        return (
            <Row
                disabled={request.complete}
                positive={readyToFinalize && !request.complete}
            >
                <Cell>{id + 1}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.reciptent}</Cell>
                <Cell>
                    {request.approvalCount}/{approversCount}
                </Cell>
                <Cell>
                    <div style={{ color: '#57BEB9' }}>
                        <b>{this.state.aprroveMessage}</b>
                    </div>
                    <div style={{ color: '##912D2B' }}>
                        <b>{this.state.aprroverErrorMessage}</b>
                    </div>
                    {request.complete ? null : (
                        <Button color="teal"
                        loading={this.state.approverLoading} disabled={this.state.approverLoading }
                         onClick={this.onApprove}>
                            Approve
            </Button>
                    )}
                   
                </Cell>
                <Cell>
                    <div style={{ color: '#57BEB9' }}>
                        <b>{this.state.finalizeMessage}</b>
                    </div>
                    <div style={{ color: '##912D2B' }}>
                        <b>{this.state.finalizeErrorMessage}</b>
                    </div>

                    {request.complete ? null : (
                        <Button color="teal" loading={this.state.finalizeLoading} disabled={this.state.finalizeLoading || !readyToFinalize} onClick={this.onFinalize}>
                            Finalize
            </Button>
                       
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
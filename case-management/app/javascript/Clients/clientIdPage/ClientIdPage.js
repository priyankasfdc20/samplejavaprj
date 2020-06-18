import React from 'react';

import ClientIdSideBar from './ClientIdSideBar';
import ClientInformation from './ClientInformation/ClientInformation';
import IndianAncestry from './ClientInformation/IndianAncestry';
import CsecInformation from './ClientInformation/CsecInformation';
import OtherClientInformation from './ClientInformation/OtherClientInformation';
import RaceAndEthnicity from './ClientInformation/RaceAndEthnicity';
import Sogie from './ClientInformation/Sogie';
import ClientService from '../../_services/client';
import RelationsCard from './Relationships/RelationsCard';
import SafetyAlertInformation from './SafetyAlertInformation';
import { DataGridCard, Header } from '../../_components';
import { PageHeader, Alert } from 'react-wood-duck';
import ChildClientService from '../../_services/child_client';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionTypes from '../constants/actionTypes';
import RelationshipService from '../../_services/relationship';
import { formatClient } from '../../_utils/formatters';
import { selectAlertRecords } from '../store/selectors';
const clientId = '7OZf8hm09b';

export class ClientIdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childClient: {
        information: [],
        XHRStatus: 'idle',
      },
      relatedClients: {
        records: [],
        XHRStatus: 'idle',
      },
      safetyAlerts: {
        XHRStatus: '',
        records: undefined,
      },
      csecResponse: {
        XHRStatus: '',
        records: undefined,
      },
      relationships: {
        records: [],
        updateStatus: false,
        XHRStatus: 'idle',
      },
      indianAncestry: {
        XHRStatus: '',
        records: undefined,
      },
    };
  }

  getAlertMessages = safetyAlerts => {
    if (safetyAlerts.length) {
      return safetyAlerts.map((item, index) => {
        return <li key={index}>{item.activation_reason_code}</li>;
      });
    }
  };

  componentDidMount() {
    this.fetchChildClient();
    this.fetchRelatedClients();
    this.setCsecData();
    this.fetchRelation();
    this.fetchIndianAncestryData();
  }

  fetchChildClient = () => {
    this.setState({ childClient: { XHRStatus: 'waiting' } });
    return ChildClientService.fetch(clientId)
      .then(response => {
        this.setState({
          childClient: {
            information: response,
            XHRStatus: 'ready',
          },
        });
      })
      .catch(() => this.setState({ childClient: { XHRStatus: 'error' } }));
  };

  setCsecData = () => {
    const id = 'AazXkWY06s';
    this.setState({ csecResponse: { XHRStatus: 'waiting' } });
    return ChildClientService.csec(id)
      .then(csecResponse => {
        this.setState({
          csecResponse: {
            XHRStatus: 'ready',
            records: csecResponse,
          },
        });
      })
      .catch(() => this.setState({ csecResponse: { XHRStatus: 'error' } }));
  };

  fetchIndianAncestryData = () => {
    const id = 'Ek694Ij0Wl';
    this.setState({ indianAncestry: { XHRStatus: 'waiting' } });
    return ChildClientService.indianAncestry(id)
      .then(indianAncestry => {
        this.setState({
          indianAncestry: {
            XHRStatus: 'ready',
            records: indianAncestry,
          },
        });
      })
      .catch(() => this.setState({ indianAncestry: { XHRStatus: 'error' } }));
  };

  fetchRelatedClients = () => {
    const clientId = 'DZGcEEgaa1';
    this.setState({ relatedClients: { XHRStatus: 'waiting' } });
    return ClientService.getRelatedClientsByChildClientId(clientId)
      .then(records => {
        const relatedClients = records.filter(
          record => record.identifier !== clientId
        );
        this.setState({
          relatedClients: {
            records: relatedClients,
            XHRStatus: 'ready',
          },
        });
      })
      .catch(() => this.setState({ relatedClients: { XHRStatus: 'error' } }));
  };

  fetchRelation = () => {
    const id = 'DZGcEEgaa1';
    this.setState({ relationships: { XHRStatus: 'waiting' } });
    return RelationshipService.fetch(id)
      .then(relationships => {
        this.setState({
          relationships: {
            records: relationships,
            XHRStatus: 'ready',
          },
        });
      })
      .catch(() => this.setState({ relationships: { XHRStatus: 'error' } }));
  };

  handleSelect = (href, event) => event.stopPropagation();

  updateRelation = relationship => {
    const { relationships } = this.state;
    return RelationshipService.update(
      relationship.client_id,
      relationship.id,
      relationship
    )
      .then(response => {
        const result = relationships.records.filter(
          record => record.id !== relationship.id
        );
        const updateRecords = [...result, ...response];
        const updatedRecord = formatClient(response[0].related_client);

        this.setState({
          relationships: {
            records: updateRecords,
            updatedRelationship: updatedRecord.name,
            updateStatus: true,
            XHRStatus: 'ready',
          },
        });
        this.fetchRelatedClients();
      })
      .catch(() => this.setState({ relationships: { XHRStatus: 'error' } }));
  };

  renderClientInformation = () => {
    return (
      <DataGridCard
        cardHeaderText="Client Information"
        cardActionButtons={true}
        status={this.state.childClient.XHRStatus}
        render={() => (
          <div>
            <ClientInformation
              anchorId="clientInformation"
              childClient={this.state.childClient.information}
            />
            <Sogie />
            <RaceAndEthnicity
              childClient={this.state.childClient.information}
            />
            <OtherClientInformation
              childClient={this.state.childClient.information}
            />
            <CsecInformation csecResponse={this.state.csecResponse.records} />

            <IndianAncestry
              indianAncestry={this.state.indianAncestry.records}
            />
          </div>
        )}
      />
    );
  };

  renderRelationships = () => {
    const { childClient, relatedClients, relationships } = this.state;
    return (
      <DataGridCard
        cardHeaderText="Relationships View"
        cardActionButtons={false}
        status={relatedClients.XHRStatus}
        render={() => (
          <RelationsCard
            anchorId="relationshipsView"
            client={childClient.information}
            relatedClients={relatedClients.records}
            relationships={relationships.records}
            updateRelation={this.updateRelation}
          />
        )}
      />
    );
  };

  render() {
    const { safetyAlerts } = this.props;
    return (
      <div>
        <Header />
        <PageHeader pageTitle="Child Name" button="" />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <ClientIdSideBar handleSelect={this.handleSelect} />
            </div>
            <div className="col-sm-9">
              {safetyAlerts && (
                <div className="col-md-12">
                  <Alert
                    alertClassName="warning"
                    faIcon="fa-warning"
                    alertCross={false}
                  >
                    <label htmlFor="Worker Safety Alerts">
                      Worker Safety Alerts
                    </label>
                    <ul>{this.getAlertMessages(safetyAlerts)}</ul>
                  </Alert>
                </div>
              )}
              {this.renderClientInformation()}
              <SafetyAlertInformation
                anchorId="safetyAlertInformation"
                safetyAlerts={this.state.safetyAlerts.records}
              />
              {this.state.relationships.updateStatus && (
                <div className="col-md-12">
                  <Alert alertClassName="success" faIcon="fa-check-circle">
                    <label htmlFor="Success Updating Relationships">
                      Relationship with{' '}
                      <q>{this.state.relationships.updatedRelationship}</q>{' '}
                      Edited
                    </label>
                  </Alert>
                </div>
              )}
              {this.renderRelationships()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    safetyAlerts: selectAlertRecords(state),
  };
};

const mapDispatchToProps = dispatch => {
  dispatch({ type: actionTypes.FETCH_SAFETY_ALERTS_API_CALL_REQUEST });
  return {};
};

ClientIdPage.propTypes = {
  safetyAlerts: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientIdPage);

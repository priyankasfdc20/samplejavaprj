import React from 'react';
import { Cards, PageHeader } from 'react-wood-duck';
import { ReferralsTable, CasesTable, Header } from '../_components';
import { FeatureService, FEATURES } from '../_services/feature';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlacementToolShown: false,
      isActionsColumnShown: false,
      features: { XHRStatus: 'idle' },
      cases: { XHRStatus: 'idle' },
      referrals: { XHRStatus: 'idle' },
    };
  }

  componentDidMount() {
    this.fetchFeatures();
  }

  onUserFetched = staffId => {
    this.setState({ staffId });
  };

  fetchFeatures = () => {
    this.setState({ features: { XHRStatus: 'waiting' } });
    return FeatureService.fetch()
      .then(this.onFetchFeaturesSuccess)
      .catch(() => this.setState({ features: { XHRStatus: 'error' } }));
  };

  onFetchFeaturesSuccess = featuresMap => {
    const isPlacementToolShown = !!featuresMap[
      FEATURES.dashboard_placement_tool
    ];
    const isActionsColumnShown = !!featuresMap[FEATURES.dashboard_case_actions];
    this.setState({
      isPlacementToolShown: isPlacementToolShown,
      isActionsColumnShown: isActionsColumnShown,
      features: {
        XHRStatus: 'ready',
        featuresMap: featuresMap,
      },
    });
  };

  renderReferenceItem = (title, href, isShown) => {
    if (!isShown) {
      return null;
    }
    return (
      <li className="h5">
        <a href={href}>{title}</a>
      </li>
    );
  };

  render() {
    const { staffId, isPlacementToolShown, isActionsColumnShown } = this.state;
    const referralsTable = staffId ? (
      <ReferralsTable staffId={staffId} />
    ) : null;
    const casesTable = staffId ? (
      <CasesTable
        staffId={staffId}
        isActionsColumnShown={isActionsColumnShown}
      />
    ) : null;

    return (
      <div>
        <Header onUserFetchedCallback={this.onUserFetched} />
        <PageHeader pageTitle="Caseworker Dashboard" button={null} />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {referralsTable}
              {casesTable}
            </div>

            <div className="col-md-3">
              <Cards cardHeaderText="References">
                <div style={{ padding: '5px 15px' }}>
                  <ul className="list-unstyled">
                    {this.renderReferenceItem(
                      'Find Placement Tool',
                      '/placement/index',
                      isPlacementToolShown
                    )}
                  </ul>
                </div>
              </Cards>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;

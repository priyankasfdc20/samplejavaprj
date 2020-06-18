import React from 'react';
import PropTypes from 'prop-types';
import RelationshipTable from './_components/relationship_table';

const propTypes = {
  anchorId: PropTypes.string.isRequired,
  client: PropTypes.object,
  relatedClients: PropTypes.array,
  relationships: PropTypes.array,
  updateRelation: PropTypes.func.isRequired,
};
const defaultProps = {
  client: {},
  relatedClients: [],
  relationships: [],
};
const RelationsCard = ({
  anchorId,
  client,
  relatedClients,
  relationships,
  updateRelation,
}) => {
  return (
    <div id={anchorId}>
      <div className="FocusChild">
        <h4>
          <b> Focus Child </b>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-2 ">
          <div
            className="img-circle"
            style={{ paddingTop: '100%', backgroundColor: 'pink' }}
          />
        </div>
        <div className="ChildName col-md-6">
          <b>
            {client.common_first_name + ' '}
            {client.common_last_name}
          </b>
        </div>
      </div>
      <RelationshipTable
        client={client}
        relatedClients={relatedClients}
        relationships={relationships}
        updateRelation={updateRelation}
      />
    </div>
  );
};

RelationsCard.propTypes = propTypes;
RelationsCard.defaultProps = defaultProps;

export default RelationsCard;

import React from 'react';
import PropTypes from 'prop-types';
import ButtonModal from '../button_modal/ButtonModal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { formatClient } from '../../../../../_utils/formatters/formatters';

const propTypes = {
  client: PropTypes.object,
  relatedClients: PropTypes.array,
  relationships: PropTypes.array,
  updateRelation: PropTypes.func,
};
const defaultProps = {
  client: {},
  relatedClients: [],
  relationships: [],
};

class RelationshipTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: { ...props.client },
      relatedClients: [...props.relatedClients],
      relationships: [...props.relationships],
    };
  }

  actions = (cell, row) => {
    const { client, relationships } = this.state;
    const relationship = relationships.find(relationship => {
      return row.id === relationship.related_client_id;
    });

    return (
      <ButtonModal
        client={client}
        relationship={relationship}
        updateRelation={this.props.updateRelation}
      />
    );
  };

  expandComponent = row => {
    return (
      <div className="expanded-row">
        <div className="col-md-4">{row.phone}</div>
        <div className="col-md-4" />
        <div className="col-md-4">{row.address}</div>
      </div>
    );
  };

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    const icon = isExpanded ? 'bottom' : 'right';

    return (
      <div>
        {isExpandableRow && (
          <span
            className={`glyphicon glyphicon-triangle-${icon}`}
            aria-hidden="true"
          />
        )}
      </div>
    );
  };

  isExpandableRow = row => row.id !== undefined;

  render() {
    const formatRelatedClients = this.state.relatedClients.map(client =>
      formatClient(client)
    );
    return (
      <BootstrapTable
        data={formatRelatedClients}
        searchPlaceholder="Quick Filter"
        search={true}
        expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
        expandColumnOptions={{
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent,
          columnWidth: 30,
        }}
        options={{ expandBy: 'column' }}
      >
        <TableHeaderColumn dataField="name" isKey={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="secondaryRelationship" width="22rem">
          Relationship to Focus Child
        </TableHeaderColumn>
        <TableHeaderColumn dataField="ageBirth">Age</TableHeaderColumn>
        <TableHeaderColumn dataField="city">City</TableHeaderColumn>
        <TableHeaderColumn
          dataFormat={this.actions}
          expandable={false}
          width="7.5rem"
        >
          Actions
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

RelationshipTable.propTypes = propTypes;
RelationshipTable.defaultProps = defaultProps;

export default RelationshipTable;

import React, { Component } from "react";
import { Table } from "semantic-ui-react";

import InputData from "./InputData";
import ConfirmDelete from "./ConfirmDelete";

class DataTable extends Component {
  render() {
    let coords = this.props.datas;
    coords = coords.map(coord => (
      <Table.Row key={coord._id}>
        <Table.Cell>{coord.AirSpaceClass}</Table.Cell>
        <Table.Cell>{coord.From_City}</Table.Cell>
        <Table.Cell>{coord.To_City}</Table.Cell>
        <Table.Cell>{coord.Price}</Table.Cell>
        <Table.Cell>{coord.AircraftModel}</Table.Cell>
        <Table.Cell>{coord.EngineModel}</Table.Cell>
        <Table.Cell>
          <InputData
            headerTitle="Edit Data"
            buttonTriggerTitle="Edit"
            buttonSubmitTitle="Save"
            buttonColor="blue"
            dataID={coord._id}
            onDataUpdated={this.props.onDataUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ConfirmDelete
            headerTitle="Delete Data"
            buttonTriggerTitle="Delete"
            buttonColor="black"
            data={coord}
            onDataDeleted={this.props.onDataDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    ));

    // Make every new data appear on top of the list
    coords = [...coords].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>AirSpaceClass</Table.HeaderCell>
            <Table.HeaderCell>From_City</Table.HeaderCell>
            <Table.HeaderCell>To_City</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>AircraftModel</Table.HeaderCell>
            <Table.HeaderCell>EngineModel</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{coords}</Table.Body>
      </Table>
    );
  }
}

export default DataTable;

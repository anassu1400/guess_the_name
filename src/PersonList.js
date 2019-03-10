import React, { Component } from "react";

class PersonList extends Component {
  render() {
    return (
      <footer>
        <table className="personList">
          <thead>
            <tr>{this.props.peepList}</tr>
          </thead>
        </table>
      </footer>
    );
  }
}
export default PersonList;

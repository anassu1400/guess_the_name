import React, { Component } from "react";

class NameList extends Component {
  newPeeps = this.props.peeps;
  componentDidMount() {
    this.props.shuffleArray(this.newPeeps);
  }
  render() {
    return (
      <ul
        style={{
          float: "right",
          backgroundColor: "white",
          border: "5px solid black"
        }}
      >
        {this.props.peeps ? (
          this.newPeeps.map(peep => <li key={peep.name[0]}>{peep.name[0]}</li>)
        ) : (
          <></>
        )}
      </ul>
    );
  }
}
export default NameList;

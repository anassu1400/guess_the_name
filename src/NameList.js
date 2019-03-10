import React, { Component } from "react";

class NameList extends Component {
  newPeeps = this.props.peeps;
  componentDidMount() {
    this.props.shuffleArray(this.newPeeps);
  }
  render() {
    const style = {
      float: "right",
      backgroundColor: "white",
      border: "5px solid black",
      color: "black",
      listStyle: "none"
    };
    return (
      <ul style={style}>
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

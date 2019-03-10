import React, { Component } from "react";
import { WSAEHOSTDOWN } from "constants";

class Person extends Component {
  person = this.props.person;
  state = {
    pic: ""
  };
  componentDidMount() {
    this.setState({ pic: this.props.chooseRandomPic(this.props.person) });
  }

  componentDidUpdate(prevProps) {
    if (this.props.person !== prevProps.person) {
      this.setState({ pic: this.props.chooseRandomPic(this.props.person) });
    }
  }

  render() {
    let pic = this.state.pic;
    return (
      <div className="Person">
        {this.state.pic && (
          <img className="picturePerson" src={require(`${pic}`)} alt="blah" />
        )}
        <div className="meterBar">
          <div
            className="meter"
            style={{
              width: (this.props.person.friendshipMeter / 3) * 100 + "%"
            }}
          />
        </div>{" "}
      </div>
    );
  }
}

export default Person;

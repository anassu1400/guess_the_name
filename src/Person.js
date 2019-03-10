import React, { Component } from "react";

class Person extends Component {
  person = this.props.person;

  render() {
    return (
      <div className="Person">
        <img
          className="picturePerson"
          src={require(`${this.props.chooseRandomPic}`)}
          alt="blah"
        />
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

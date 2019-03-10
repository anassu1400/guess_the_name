import React, { Component } from "react";

class GuessInput extends Component {
  render() {
    return (
      <div className="input-group my-3">
        <textarea
          className="form-control"
          type="text"
          value={this.props.guess}
          style={{
            width: "350px",
            height: "90px",
            fontSize: "80px",
            overflow: "hidden"
          }}
          onChange={this.props.handleChange}
        />
        <div className="input-group-append">
          <button
            onClick={() => {
              let person = this.props.choosePerson(this.props.peeps);
              while (!person) {
                person = this.props.choosePerson(this.props.peeps);
              }
              //   const pic = this.props.chooseRandomPic(person);
              this.props.handleGuess(person);
              this.props.guessValidation(this.props.guess);
            }}
            style={{
              marginLeft: "700px",
              width: "250px",
              height: "90px"
            }}
            className="input-group-text push_button red"
          >
            <h2>Guess!</h2>
          </button>
        </div>
      </div>
    );
  }
}
export default GuessInput;

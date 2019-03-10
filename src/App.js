import React, { Component } from "react";
import "./Game.css";
import Game from "./Game";
import people from "./people";

class App extends Component {
  state = {
    isOn: false
  };

  gameState = () => {
    const on = this.state.isOn;
    this.setState({ isOn: !on });
  };

  render() {
    const lst = people.map(person => (
      <td key={person.name[0]} className="listPersonStyle">
        <img
          className="mainPicture"
          src={require(`${person.picUrl[0]}`)}
          alt="blah"
        />
        <div style={{ fontWeight: "bold" }}>
          <h2>{person.name[0]}</h2>
        </div>
      </td>
    ));
    console.log(this.state.isOn);
    return (
      <div>
        <audio src={require("./bg.mp3")} autoplay="autoplay" loop="loop" />

        <div className="App">
          <header className="App-header">
            {this.state.isOn ? (
              <div className="container">
                <Game people={people} gameState={this.gameState} />
              </div>
            ) : (
              <div>
                <div>
                  <table>
                    <thead>
                      <tr>{lst}</tr>
                    </thead>
                  </table>
                </div>
                <img
                  style={{
                    width: "700px"
                  }}
                  src={require("./images/llgo.png")}
                  alt="blah"
                />
                <br />
                <button
                  onClick={this.gameState}
                  style={{
                    width: "50%",
                    paddingTop: "80px",
                    paddingBottom: "90px",
                    marginLeft: "450px"
                  }}
                  className="input-group-text push_button red"
                >
                  <h1>Start Playing!</h1>
                </button>
              </div>
            )}
          </header>
        </div>
      </div>
    );
  }
}

export default App;

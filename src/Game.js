import React, { Component } from "react";
import Person from "./Person";
import HealthBar from "./healthBar";
import NameList from "./NameList";
import GuessInput from "./GuessInput";
import PersonList from "./PersonList";
class Game extends Component {
  people = this.props.people;
  state = {
    peeps: null,
    person: null,
    health: this.fullHealth,
    guess: "",
    answer: [],
    pic: "",
    winLose: null,
    bff: [],
    enemies: []
  };

  fullHealth = this.people
    .map(person => person.friendshipMeter)
    .reduce((a, b) => a + b, 0);

  componentDidMount() {
    const peeps = this.myPeeps([...this.people], [], []);
    const person = this.choosePerson(peeps);
    const pic = this.chooseRandomPic(person);
    this.setState({
      peeps: peeps,
      person: person,
      answer: [...person.name],
      pic: pic,
      health: this.fullHealth
    });
  }

  choosePerson = peeps => {
    let p = this.myPeeps(peeps, [], []);
    const person = p[Math.floor(Math.random() * this.people.length)];
    return person;
  };

  handleChange = event => {
    this.setState({ guess: event.target.value });
  };

  guessValidation = guess => {
    let health = this.state.health;
    let p = [...this.myPeeps(this.state.peeps, [], [])];
    let person = undefined;
    while (!person) {
      person = p.find(person => person.name[0] === this.state.answer[0]);
    }
    let smth = null;
    if (this.state.answer.includes(guess)) {
      const bff = this.state.bff;
      bff.push(person);
      p = [...this.myPeeps(p, bff, [])];
      if (bff.length > p.length) {
        smth = true;
      }
      this.setState({ peeps: [...p], bff: bff, winLose: smth });
    } else {
      if (health <= 0 || p.length === 0) {
        this.setState({ winLose: false });
      } else {
        const enemies = this.state.enemies;
        person.friendshipMeter -= 1;
        if (person.friendshipMeter <= 0) {
          enemies.push(person);
        }
        p = [...this.myPeeps(p, [], enemies)];
        if (enemies.length > p.length) {
          smth = false;
        }
        this.setState({
          peeps: [...p],
          health: health,
          enemies: enemies,
          winLose: smth
        });
      }
    }
  };

  myPeeps = (peopl, b, e) => {
    if (peopl) {
      const p = [...peopl];
      return p.filter(
        peep =>
          peep.friendshipMeter > 0 && !b.includes(peep) && !e.includes(peep)
      );
    }
  };

  chooseRandomPic = person => {
    const p = person;
    if (p) {
      return p.picUrl[Math.floor(Math.random() * p.picUrl.length)];
    }
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  handleGuess = person => {
    this.setState({
      person: person,
      answer: [...person.name],
      pic: this.chooseRandomPic(person),
      guess: "",
      peeps: this.myPeeps(this.state.peeps, [], [])
    });
  };

  render() {
    let peeps = this.state.peeps;
    let peepList = [];
    let person = this.state.person;

    if (peeps) {
      peeps = this.myPeeps(this.state.peeps, [], []);
      if (!this.state.peeps.includes(person)) {
        person = this.choosePerson(this.state.peeps);
      }
      peepList = peeps.map(person => (
        <td key={person.name[0]} className="listPersonStyle">
          <img
            className="picList"
            src={require(`${person.picUrl[0]}`)}
            alt="blah"
          />
          <div className="meterBar">
            <div
              className="meter"
              style={{
                width: (person.friendshipMeter / 3) * 100 + "%",
                transition: "width 0.5s"
              }}
            />
          </div>
        </td>
      ));
    }
    const health = this.state.health;

    return (
      <div>
        {this.state.winLose === null && this.state.peeps ? (
          <div>
            <HealthBar health={health} fullHealth={this.fullHealth} />
            <NameList
              shuffleArray={this.shuffleArray}
              peeps={this.state.peeps}
            />
            <Person chooseRandomPic={this.chooseRandomPic} person={person} />
            {/* {person && this.state.pic ? (
              <div>
                
              </div>
            ) : (
              <>
                <Person
                  chooseRandomPic={this.state.pic}
                  person={this.state.person}
                />
                this is stupid
              </>
            )} */}
            <GuessInput
              peeps={this.state.peeps}
              choosePerson={this.choosePerson}
              chooseRandomPic={this.chooseRandomPic}
              handleGuess={this.handleGuess}
              handleChange={this.handleChange}
              guessValidation={this.guessValidation}
              guess={this.state.guess}
            />
            <PersonList shuffleArray={this.shuffleArray} peepList={peepList} />
          </div>
        ) : !this.state.winLose ? (
          <div style={{ color: "red", background: "black", height: "100%" }}>
            <h1>YOU LOSE!</h1>
            <br />
            <h1>almost EVERYONE HATES YOU!</h1>
            <button onClick={() => this.props.gameState()}>
              Redeem yourself!
            </button>
          </div>
        ) : (
          <div style={{ color: "green", background: "white", height: "100%" }}>
            <h1>YOU WIN!</h1>
            <br />
            <h1>almost EVERYONE LOVES YOU!</h1>
            <button onClick={() => this.props.gameState()}>Play again?</button>
          </div>
        )}
      </div>
    );
  }
}
export default Game;

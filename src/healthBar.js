import React, { Component } from "react";

class HealthBar extends Component {
  render() {
    return (
      <div>
        <div className="healthbar">
          <div
            className="health"
            style={{
              width: (this.props.health / this.props.fullHealth) * 100 + "%",
              transition: "width 0.5s"
            }}
          />
        </div>
      </div>
    );
  }
}
export default HealthBar;

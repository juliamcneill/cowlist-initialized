import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import CowList from "./CowList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/cows",
      success: (cows) => {
        console.log("set state");
        this.setState({ cows: cows });
      },
      error: (jqXHR, explanation, error) => {
        console.log("hello?");
        console.log(explanation, error);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Cow List</h1>
        <CowList cows={this.state.cows} />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

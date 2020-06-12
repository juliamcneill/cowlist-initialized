import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import CowList from "./CowList.jsx";
import Search from "./Search.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
    };
    this.search = this.search.bind(this);
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

  search(obj) {
    $.ajax({
      type: "POST",
      url: "/api/cows",
      contentType: "application/json",
      data: JSON.stringify({ name: obj.name, description: obj.description }),
      success: () => {
        this.componentDidMount();
      },
      error: (jqXHR, explanation, error) => {
        console.log(explanation, error);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Cow List</h1>
        <CowList cows={this.state.cows} />
        <Search onSearch={this.search} />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Highlight from "./Highlight.jsx";
import CowList from "./CowList.jsx";
import Search from "./Search.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: { name: "firstHighlight", description: "nextHighlight" },
      cows: [],
    };
    this.search = this.search.bind(this);
    this.setHighlightedCow = this.setHighlightedCow.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/api/cows",
      success: (cows) => {
        this.setState({ cows: cows });
      },
      error: (jqXHR, explanation, error) => {
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

  setHighlightedCow(name, description) {
    this.setState({ highlight: { name: name, description: description } });
  }

  render() {
    return (
      <div>
        <h1>Cow List</h1>
        <Highlight highlight={this.state.highlight.description} />
        <CowList cows={this.state.cows} clickHandler={this.setHighlightedCow} />
        <Search onSearch={this.search} />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

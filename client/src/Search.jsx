import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  search() {
    this.props.onSearch(this.state);
    this.setState({
      name: "",
      description: "",
    });
  }

  render() {
    return (
      <div>
        <h4>Add another cow!</h4>
        Enter a cow name:
        <input name="name" value={this.state.name} onChange={this.onChange} />
        Enter a cow description:
        <input
          name="description"
          value={this.state.description}
          onChange={this.onChange}
        />
        <button onClick={this.search}> Add Cow </button>
      </div>
    );
  }
}

export default Search;

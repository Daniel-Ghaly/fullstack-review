import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }


  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange.bind(this)}/>
      <button onClick={() => {this.props.search(this.state.term)}}> Add Repos </button>

    </div>)
  }
}

export default Search;
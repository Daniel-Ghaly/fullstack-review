import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import jquery from 'jquery'
import axios from 'axios'
import github from '../../helpers/github.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);

    // TODO


    // axios({
    //   url: '/repos',
    //   method: 'post',
    //   data: {username: term}
    // })
    // .then(res => {
    //   console.log(res.data)
    // })
    // .catch(err => {
    //   console.error(err)
    // })


    $.ajax({
      url: '/repos',
      method: 'post',
      data: JSON.stringify({username: term}),
      // dataType: 'json',
      contentType: 'application/json',
      success: data => {
        console.log('data: ',data)
        axios.get('/repos')
        .then(res => {
          console.log('t')
          this.setState({repos:res.data})
        })
        .catch(err => {
          console.error(err)
        })
      },
      error: err => {
        console.error('err: ', err)
      }
    })
  }

  componentDidMount() {
    axios.get('/repos')
    .then(res => {
      this.setState({repos:res.data})
    })
  }

  render () {
    return (
      <>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search search={this.search.bind(this)}/>
        <table>

            <tr>
              <th>Repo Owner</th>
              <th>Repo</th>
              <th>Fork Count</th>
            </tr>
          {this.state.repos.map(repo => {

            return (
              <tr>
                <td> {repo.repo_owner} </td>
                <td> <a href={repo.repo_url}>{repo.repo_name} </a> </td>
                <td> {repo.fork_count} </td>
              </tr>
            )

          })}
        </table>
      </>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('app'));
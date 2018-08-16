import React, {Component} from 'react';
import './style.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {username: '', password: ''}
  }


  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://api.haochuan.io/login',
      data: {username: this.state.username, password: this.state.password},
    })
    .then(res=>{
      console.log(res);
      this.props.validateUser();
    })
    .catch(err => {
      console.log(err);
      alert("Please input correct login info.")
    })

  }

  render() {
    if (this.props.isAuthed) {
      return <Redirect to={{pathname: '/'}} />;
    } else {
      return(
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Login</button>
        </form>

      )
    }
  }
}

export default Login;

import React from "react";
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: ''
}

class Login extends React.Component {

  state= {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res=> {
        console.log(res);
        console.log('payload', res.data.payload)
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/bubbles');
      })
      .catch(err=> {
        console.log(err);
      })

  }

  handleChange = (e) => {
    console.log('handling change!');
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  render() {
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Please Log In</h2>
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input 
            type='text'
            name='username'
            value={this.state.credentials.username}
            placeholder='username'
            onChange={this.handleChange}
            />
        </label>

        <label>
          Password:
          <input 
            type='password'
            name='password'
            value={this.state.credentials.password}
            placeholder='password'
            onChange={this.handleChange}
            />
        </label>
        <button>Log in!</button>

      </form>
    </>
  );
  }
};

export default Login;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.signupRedirect = this.signupRedirect.bind(this);
    // this.handleDemoUser = this.handleDemoUser.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  signupRedirect() {
    this.props.history.push("/register");
  }

  // handleDemoUser(e, loginUser) {
  //   e.preventDefault();
  //   loginUser({
  //     variables: {
  //       email: "demo@demo.com",
  //       password: "hunter02"
  //     }
  //   });
  // }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
        onError={error => {
          console.log("ERROR in SigninBox ", { error });
        }}
      >
        {(loginUser, {error}) => (
          <div className="login">
            <div className="signup-header">
              <Link to="/">
                <img
                  id="signup-logo"
                  src="https://spottocry.s3-us-west-1.amazonaws.com/SpotToCry2.png"
                ></img>
              </Link>
            </div>
            <div className="content-login-1">
              <h2 className="login-h2">To continue, log in to SpotToCry.</h2>
              <button
                id="login-demo"
                onClick={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: "demo@demo.com",
                      password: "hunter02"
                    }
                  });
                }}
              >
                Log in as demo user
              </button>
              {/* <button id="login-fb" onClick={this.handleDemoUser}>
                Log in as demo user
              </button> */}
              <form
                className="form"
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <br />
                <strong className="line-thru">OR</strong>
                <br />
                <label>
                  <input
                    value={this.state.email}
                    onChange={this.update("email")}
                    className="input-register-2"
                    placeholder="Email"
                  />
                </label>
                <br />
                <label>
                  <input
                    value={this.state.password}
                    onChange={this.update("password")}
                    className="input-register-2" 
                    type="password"
                    placeholder="Password"
                  />
                  { error ? <div className="input-error">{error.graphQLErrors[0].message}</div> : <div style={{ display: "none" }}>{null}</div>}
                </label>
                <br />
                <button type="submit" className="login-submit">
                  Log In
                </button>
              </form>
              <span id="no-account-q">Don't have an account?</span>
              <button
                type="submit"
                className="signup-button"
                onClick={this.signupRedirect}
              >
                Sign Up For SpotToCry
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";

const { REGISTER_USER, LOGIN_USER } = Mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  updateDemoCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <div className="auth-page-container">
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("currentUser", data.register._id);
          localStorage.setItem("auth-token", token);
        }}
        update={(client, data) => this.updateCache(client, data)}
        onError={error => {
          console.log("ERROR in SignupBox ", { error });
        }}
      >
        {(registerUser, { error }) => (
          <div className="signup">
            <div className="signup-header">
              <Link to="/" className="logo-link">
                <img
                  id="signup-logo"
                  src="https://spottocry.s3-us-west-1.amazonaws.com/SpotToCry2.png"
                  alt=""
                ></img>
              </Link>
            </div>
            <div className="content">
              <Mutation
                mutation={LOGIN_USER}
                onCompleted={data => {
                  const { token } = data.login;
                  localStorage.setItem("auth-token", token);
                  this.props.history.push("/");
                }}
                update={(client, data) => this.updateDemoCache(client, data)}
              >
                {loginUser => (
                  <button
                    id="signup-demo"
                    onClick={e => {
                      e.preventDefault();
                      console.log(loginUser);
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
                )}
              </Mutation>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  registerUser({
                    variables: {
                      name: this.state.name,
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <br />
                <strong className="line-thru">or</strong>
                <h2 className="signup-h2">Sign up with your email address</h2>
                <div className="login-form">
                  <br />
                  <label>
                    <input
                      value={this.state.name}
                      onChange={this.update("name")}
                      className="input-register-1"
                      placeholder="Name"
                    />
                  </label>
                  <br />
                  <label>
                    <input
                      value={this.state.email}
                      onChange={this.update("email")}
                      className="input-register-1"
                      placeholder="Email"
                    />
                  </label>
                  <br />
                  <label>
                    <input
                      value={this.state.password}
                      onChange={this.update("password")}
                      className="input-register-1"
                      type="password"
                      placeholder="Password"
                    />
                    {error ? (
                      <div className="input-error">
                        {error.graphQLErrors[0].message}
                      </div>
                    ) : (
                      <div style={{ display: "none" }}>{null}</div>
                    )}
                  </label>
                  <br />
                  <button type="submit" className="signup-submit">
                    Sign Up
                  </button>
                  <div className="login-prompt">
                    Already have an account?
                    <Link id="login-highlight" to="/login">
                      Log in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
      </div>
    );
  }
}

export default Register;
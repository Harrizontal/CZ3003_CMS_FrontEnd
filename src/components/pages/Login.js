import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from "../../actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    username: "",
    password: "",
    role: "",
    submitted: false,
    errors: {}
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    let errors = {};

    if (this.state.username === "" && this.state.password === "") {
      isError = true;
      errors["username"] = "Please enter valid username";
      errors["password"] = "Please enter valid password";
      {
        console.log("Enter username and password");
      }
    }
    if (this.state.username.length < 6) {
      isError = true;
      errors["username"] = "Please enter valid username";
      {
        console.log("Enter username");
      }
    }
    if (this.state.password.length < 6) {
      isError = true;
      errors["password"] = "Please enter valid password (min. 6 characters)";
      {
        console.log("Enter password");
      }
    }
    this.setState({ errors: errors });
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    const { dispatch } = this.props;
    const err = this.validate();
    if (err) {
      this.setState({
        username: "",
        password: "",
        role: "",
        submitted: false
      });
    }
    if (!err) {
      var role, submitted;
      this.state.submitted = true;
      this.setState(submitted);

      if (this.state.username.includes("op")) {
        this.state.role = "operator";
        this.setState(role);
      } else if (
        this.state.username.includes("gov") ||
        this.state.username.includes("pmo")
      ) {
        this.state.role = "gov";
        this.setState(role);
      } else {
        this.state.role = "gp";
        this.setState(role);
      }

      dispatch(login(this.state.username, this.state.password)).then(
        response => {
          this.props.history.push("/cms");
        },
        error => {
          console.log("Error!");
        }
      );
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <body className="backgroundLogin">
          <div className="loginAPP">
            <form className="containerLogin">
              <h1 className="groupName">8'S COMPLEMENT</h1>
              <h2 className="projectName">Crisis Management System</h2>
              <br />
              <TextField
                name="username"
                placeholder="Enter Username"
                value={this.state.username}
                onChange={e => this.change(e)}
              />
              <div className="errorMsg">{this.state.errors.username}</div>
              <br />
              <TextField
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={e => this.change(e)}
                type="password"
              />
              <div className="errorMsg">{this.state.errors.password}</div>
              <br />
              <br />
              <Button style={{backgroundColor:"#c51ea1"}}
                variant="contained"
                color="primary"
                type="submit"
                className="loginBTN"
                onClick={e => this.onSubmit(e)}
              >
                Login
              </Button>
            </form>
          </div>
        </body>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn // passing logging state from authentication reducer
});

export default connect(mapStateToProps)(Login);

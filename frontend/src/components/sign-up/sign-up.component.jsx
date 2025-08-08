// frontend/src/components/sign-up/sign-up.component.jsx
import React, { Component } from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { registerUser } from "../../redux/user/user.actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Option A: send these four fields; action maps to backend shape
    this.props
      .registerUser({ displayName, email, password, confirmPassword })
      .then(() => {
        // optional: clear form on success
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        // optional: show backend validation errors
        console.log("Register failed:", err);
        const msg =
          err?.message ||
          err?.email ||
          err?.name ||
          err?.password ||
          "Registration failed";
        alert(msg);
      });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I Don't have an account</h2>
        <span>Sign Up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            label="Display Name"
            required
          />

          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChange={this.handleChange}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default connect(null, { registerUser })(SignUp);

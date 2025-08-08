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
      loading: false,
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const displayName = this.state.displayName.trim();
    const email = this.state.email.trim();
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    this.setState({ loading: true });
    try {
      // Only send what the backend expects; the action maps displayName -> name
      await this.props.registerUser({ displayName, email, password });

      // Success: clear the form and notify
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
      });
      alert("Registered!");
    } catch (err) {
      // The thunk throws on non-2xx; show a useful message
      const msg =
        err?.message ||
        err?.response?.data?.message ||
        "Registration failed";
      alert(msg);
      this.setState({ loading: false });
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, loading } =
      this.state;

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

          <CustomButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default connect(null, { registerUser })(SignUp);

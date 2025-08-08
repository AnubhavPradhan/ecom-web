// frontend/src/components/sign-in/sign-in.component.jsx
import React, { Component } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user.actions";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const email = this.state.email.trim();
    const { password } = this.state;

    this.setState({ loading: true });
    try {
      await this.props.loginUser({ email, password }, this.props.history);
      // success: optional clear
      this.setState({ email: "", password: "", loading: false });
    } catch (err) {
      alert(err.message || "Login failed. Please check your email and password.");
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
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

          <div className="buttons">
            <CustomButton type="submit" disabled={loading}>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </CustomButton>

            <CustomButton isGoogleSignIn={true} type="button">
              SIGN IN With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

// withRouter should wrap the connected component so it receives route updates
export default withRouter(connect(null, { loginUser })(SignIn));

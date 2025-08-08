// frontend/src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx
import React from "react";
import { withRouter } from "react-router-dom";
import "./sign-in-and-sign-up.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInAndSignUpPage = ({ history }) => (
  <div className="sign-in-and-sign-up">
    {/* pass history down so SignIn/SignUp can redirect or show errors */}
    <SignIn history={history} />
    <SignUp history={history} />
  </div>
);

export default withRouter(SignInAndSignUpPage);

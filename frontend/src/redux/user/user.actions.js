// frontend/src/redux/user/user.actions.js
import { UserActionTypes } from "./user.types";
import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  const payload = {
    name: user.displayName ?? user.name,
    email: user.email,
    password: user.password,
    password2: user.confirmPassword ?? user.password2,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("REGISTER OK:", res.data);
    return res.data;
  } catch (err) {
    const serverMsg = err.response?.data || { message: err.message || "Registration failed" };
    console.log("REGISTER ERR:", serverMsg);
    throw serverMsg;
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      user,
      { headers: { "Content-Type": "application/json" } }
    );

    const { token, user: userObj } = res.data;

    localStorage.setItem("jwtToken", token);
    dispatch(setCurrentUser(userObj));

    if (history) history.push("/shop");
  } catch (err) {
    console.log("LOGIN ERR:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(setCurrentUser(null));
};

// frontend/src/redux/user/user.actions.js
import { UserActionTypes } from "./user.types";
import axios from "axios";

export const registerUser = (user) => async () => {
  const payload = {
    name: user.displayName ?? user.name,
    email: user.email,
    password: user.password,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data; // 2xx only
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Registration failed";
    throw new Error(msg);
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
    // Surface a human-friendly message to the caller (component)
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Login failed";
    throw new Error(msg);
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

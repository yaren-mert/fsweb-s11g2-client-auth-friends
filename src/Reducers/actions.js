import axios from "axios";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const CALL_FRIENDS = "CALL_FRIENDS";
export const ADD_FRIEND = "ADD_FRIEND";

export function loginProcess(token) {
  return { type: LOG_IN, payload: token };
}

export function logoutProcess(token) {
  return { type: LOG_OUT, payload: token };
}

export function friendsData(list) {
  return { type: CALL_FRIENDS, payload: list };
}

export function addFriend(list) {
  return { type: ADD_FRIEND, payload: list };
}

const axiosWithAuth = (token) => {
  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export const fetchLogin = (log) => (dispatch) => {
  axios.post("http://localhost:9000/api/login", log).then((res) => {
    dispatch(loginProcess(res.data.token));
    console.log("fewtchlogin");
    window.localStorage.setItem("token", res.data.token);
  });
};

export const fetchLogout = () => (dispatch) => {
  console.log("fetchlogout");
  axiosWithAuth(localStorage.getItem("token"))
    .post("http://localhost:9000/api/logout")
    .then((res) => {
      console.log(res.data);
      dispatch(logoutProcess(res.data.token2));
      window.localStorage.setItem("token", res.data.token2);
    })
    .catch((err) => console.log(err));
};

export const fetchAddFriend = (friend) => (dispatch) => {
  axiosWithAuth(localStorage.getItem("token"))
    .post("http://localhost:9000/api/friends", friend)
    .then((res) => dispatch(addFriend(res.data)));
};

export const callFriends = () => (dispatch) => {
  axiosWithAuth(localStorage.getItem("token"))
    .get("http://localhost:9000/api/friends")
    .then((res) => {
      console.log(res.data);
      dispatch(friendsData(res.data));
    });
};

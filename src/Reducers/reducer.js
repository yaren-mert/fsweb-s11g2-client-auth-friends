import React from "react";
import { LOG_IN, CALL_FRIENDS, LOG_OUT, ADD_FRIEND } from "./actions";

const initialState = {
  loginForm: { username: "workintech", password: "wecandoit" },
  token: "",
  newFriend: {},
  friendLists: [],
  log: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      console.log(action.payload);
      return { ...state, log: true, token: action.payload };
    case LOG_OUT:
      console.log(action.payload);
      return { ...state, log: false, token: action.payload };
    case CALL_FRIENDS:
      console.log(action.payload);
      return { ...state, friendLists: action.payload };
    case ADD_FRIEND:
      console.log(action.payload);
      return { ...state, friendLists: action.payload };

    default:
      return state;
  }
};

export default reducer;

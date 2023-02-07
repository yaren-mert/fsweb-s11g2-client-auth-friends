import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, callFriends } from "../Reducers/actions";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginData = useSelector((store) => store.loginForm);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  function onSubmit(log) {
    dispatch(fetchLogin(loginData));
    setTimeout(() => {
      dispatch(callFriends());
      history.push("/friends");
      reset();
    }, 50);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-80 mx-auto mt-8">
        <label className="block ml-12 text-left mb-0" htmlFor="username">
          Username
        </label>
        <br />
        <input
          className="px-8 py-4 bg-black mb-4 mt-0 rounded-md text-white border-b-1 border-black"
          id="username"
          name="username"
          type="text"
          {...register("username", {
            required: "İsim yazmalısınız",
            minLength: {
              value: 3,
              message: "İsim en az 3 karakter olmalı",
            },
          })}
        />
        {errors.friendName && (
          <p className="px-8 py-4 bg-red-500 mb-4 mt-0 rounded-md text-white border-b-1 border-red-900 w-30">
            {errors.friendName.message}
          </p>
        )}
      </div>
      <div className="w-80 mx-auto mt-4">
        <label className="block ml-12 text-left mb-0" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="px-8 py-4 bg-black mb-4 mt-0 rounded-md text-white border-b-1 border-black"
          id="password"
          type="text"
          {...register("password", {
            validate: {
              passwordRequired: (p) =>
                p.length <= 10 || "En fazla 10 karakter girmelisiniz",
              minFive: (p) =>
                p.length >= 5 || "En az 5 karakter girmeniz gerekir",
            },
          })}
        />
        {errors.password && (
          <p className="px-8 py-4 bg-red-500 mb-4 mt-0 rounded-md text-white border-b-1 border-red-900 w-30">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="px-8 py-4 bg-black mb-4 mt-0 rounded-md text-white border-b-1 border-black"
      >
        Submit
      </button>
    </form>
  );
}

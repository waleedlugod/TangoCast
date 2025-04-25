import React, { useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function Register() {
  const formRef = useRef(null);

  const {
    mutate: register,
    error: errorRegister,
    isError: isErrorRegister,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => {
      return axios.post("http://localhost:8000/register/", formRef.current);
    },
  });

  return (
    <div>
      <h2>Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
        ref={formRef}
      >
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <label>
          <input type="radio" name="role" value="listenerUser" id="listener" />
          Listener
        </label>
        <label>
          <input type="radio" name="role" value="creatorUser" id="creator" />
          Creator
        </label>
        <button type="submit">Register</button>
      </form>
      {isErrorRegister && JSON.stringify(errorRegister.response.data)}
    </div>
  );
}

export default Register;

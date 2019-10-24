import React, { FC, useState } from 'react';
import { useHistory } from "react-router-dom";
import { createOwner } from "../../requests/owner-requests";

import '../../pages/landing.css';

const OwnerSignUp: FC = () => {
  const [ name, setName ] = useState("");
  const history = useHistory();

  const submit = () => {
    createOwner(name)
    .then((result: any) =>{
      console.log(result);
      history.push("/add-fields");
    })
    .catch((e: any) => {
      console.log(e);
    });
  };

  return (
    <div className="login-box align-center">
      <p className="login-title">
        Owner Sign Up
      </p>
      <input
        className="login-input"
        onChange={(e) => setName(e.target.value)}
      />
      <a
        className="login-button"
        onClick={submit}
      >
        Send
      </a>
    </div>
  );
}

export default OwnerSignUp;

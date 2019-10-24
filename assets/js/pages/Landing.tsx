import React, { FC } from 'react';
import OwnerSignUp from "../components/auths/OwnerSignUp";

import './landing.css';

const Landing: FC = () => (
  <div className="pricing-container flex align-center column">
    <h2>You are not logged in yet</h2>
    <div className="flex column">
      <div className="flex">
        <div className="flex row flex-one space-around pricing-row">
          <OwnerSignUp />
          <div className="login-box align-center">
            <p className="login-title">
              Owner Log In
            </p>
            <input className="login-input"/>
            <a className="login-button">
              Send
            </a>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex row flex-one space-around pricing-row">
          <div className="login-box align-center">
            <p className="login-title">
              End User Sign Up
            </p>
            <input className="login-input"/>
            <a className="login-button">
              Send
            </a>
          </div>
          <div className="login-box align-center">
            <p className="login-title">
              End User Log In
            </p>
            <input className="login-input"/>
            <a className="login-button">
              Send
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Landing;

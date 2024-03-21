import React from "react";
import "./auththeme.css";

export const CommonAuthTheme = ({ children }: { children: any }) => {
  return (
    <div id="hero-section">
      <div className="animation">
        <div className="ball-container">
          <div className="ball1"></div>
          <div className="ball2"></div>
          <div className="ball3"></div>
          <div className="ball4"></div>
        </div>
        <div className="blue-img" />
        <div className="grain-img" />
      </div>
      <div id="login" className="container">
        <div className="login-container">
          <div className="login-form card m-0 mb-2">
            <p className="text-center">
              {/* <img
										src="/Logo/creatorx-black.webp"
										alt="logo"
										className="logo"
									/> */}
            </p>
            {children}
          </div>
          {/* <div className="text-center text-light">
              <span className="opacity-50">Don't have an account?&nbsp;</span>
              <Link to="/register">
                <strong>Sign Up</strong>
              </Link>
            </div> */}
        </div>
      </div>
    </div>
  );
};

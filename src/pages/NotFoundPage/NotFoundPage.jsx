import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.notfound}>
      <h2>Page is not found...</h2>
      <NavLink to="/" className={setActiveClass}>
        Return to main page
      </NavLink>
    </div>
  );
};

export default NotFoundPage;

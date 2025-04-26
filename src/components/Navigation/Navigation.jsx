import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

const Navigation = () => {
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <>
      <nav className={s.navigation}>
        <NavLink to="/" className={setActiveClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={setActiveClass}>
          Movies
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;

import React from "react";
import { useLocation } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import SearchBar from "../SearchBar/SearchBar";
import getRandomChar from "./getRandomChar";
import links from "./links";
import styles from "./NavBar.module.css"; // Asegúrate de usar el nombre correcto de tu archivo CSS

const NavBar = ({ onSearch, logOut }) => {
  const clickHandler = () => {
    onSearch(getRandomChar());
  };
  const { pathname } = useLocation();
  return (
    <div className={styles.navContainer}>
      {pathname === "/home" && <SearchBar onSearch={onSearch} />}
      {pathname === "/home" && <button className={styles.randomButton} 
      onClick={clickHandler}>RANDOM!</button>}
      {links.map(({ to, content }) => (
        <NavButton to={to} content={content}/>
      ))}
      <button className={styles.logoutButton} onClick={logOut}>
        logOut
      </button>
    </div>
  );
};

export default NavBar;

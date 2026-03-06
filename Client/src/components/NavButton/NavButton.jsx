import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavButton.module.css"; // Asegúrate de usar el nombre correcto de tu archivo CSS

const NavButton = ({ to, content }) => {
  return (
    <Link to={to} className={styles.navButton}>
      {content}
    </Link>
  );
};

export default NavButton;

import React, { useState } from "react";
import styles from "./SearchBar.module.css"; // Asegúrate de usar el nombre correcto de tu archivo CSS

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  }

  const handleSearch = () => {
    onSearch(id);
    setId(""); // Limpiar el campo de búsqueda después de la búsqueda
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.inputField}
        placeholder="Id..."
        type="search"
        value={id}
        onChange={handleChange}
      />
      <button className={styles.addButton} onClick={handleSearch}>
        ADD
      </button>
    </div>
  );
}


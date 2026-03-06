import styled from "styled-components";
import { Link } from "react-router-dom";

// Define los estilos para el botón de favoritos con temática de Rick and Morty antes de usarlo
export const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
`;

export const CloseButton = FavoriteButton

// Ahora puedes usar FavoriteButton en CardContainer sin problemas
export const CardContainer = styled.div`
  background-color:black;
  border:1px solid white;
  border-radius: 1em;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  transition: transform 0.2s ease; /* Transición suave al pasar el cursor */
  overflow: hidden;
  color: #fff;
  

  img {
    max-width: 95%;
    height: auto;
    margin:10px;
    position:relative;
    border-radius:1em;
  };
`;

// Define los estilos para el nombre del personaje
export const CharacterName = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
`;

// Define los estilos para los enlaces con temática de Rick and Morty
export const DetailLink = styled(Link)`
  text-decoration: none;
  color: #61dafb;
  font-weight: bold;
`;

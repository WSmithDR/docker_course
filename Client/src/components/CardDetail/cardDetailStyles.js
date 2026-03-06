// cardDetailStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled.div`
  background-color: #282c35;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  transition: transform 0.2s ease; /* Transición suave al pasar el cursor */
  overflow: hidden;
  color: #fff;
  margin: 20px; /* Espacio entre las tarjetas */
  
  &:hover {
    transform: translateY(-5px); /* Efecto de elevación al pasar el cursor */
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

// Define los estilos para los botones de favorito
export const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
  display: none; /* Inicialmente oculto */

  ${CardContainer}:hover & {
    display: block; /* Mostrar el botón al pasar el cursor */
  }
`;

// Define los estilos para el botón de cerrar
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
`;

// Define los estilos para los enlaces con temática de Rick and Morty
export const DetailLink = styled(Link)`
  text-decoration: none;
  color: #61dafb;
  font-weight: bold;
`;

import React, { useState } from "react";
import { addFav, removeFav } from "../../redux/actions/actions";
import { connect } from "react-redux";
import {
  CardContainer,
  FavoriteButton,
  DetailLink,
  CharacterName,
  CloseButton,
} from "./cardStyles";

const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
  addFav,
  removeFav
}) => {
  const [isFav, setIsFav] = useState(false);

  const favoriteHandler = () => {
    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav({
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
      });
    }
  };
  return (
    <CardContainer>
      <img src={image} alt={name} />
      <CloseButton onClick={() => onClose(id)}>❌</CloseButton>
      {isFav ? (
        <FavoriteButton onClick={favoriteHandler}>❤️</FavoriteButton>
      ) : (
        <FavoriteButton onClick={favoriteHandler}>🤍</FavoriteButton>
      )}
      <DetailLink to={`/detail/${id}`}>
        <CharacterName>{name}</CharacterName>
      </DetailLink>
    </CardContainer>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};

export default connect(null, mapDispatchToProps)(Card);

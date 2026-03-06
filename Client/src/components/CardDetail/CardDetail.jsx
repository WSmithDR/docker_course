import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions/actions";
import { CardContainer, FavoriteButton, CloseButton} from "./cardDetailStyles"; // Importa los estilos

const CardDetail = ({
   id,
   name,
   status,
   species,
   gender,
   origin,
   image,
   onClose,
   addFav,
   removeFav,
   myFavorites
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
   }

   useEffect(() => {
      myFavorites.forEach(favChar => {
         favChar.id === id && setIsFav(true);
      });
   }, [myFavorites]);

   return (
      <CardContainer>
         {isFav ? (
            <FavoriteButton onClick={favoriteHandler}>❤️</FavoriteButton>
         ) : (
            <FavoriteButton onClick={favoriteHandler}>🤍</FavoriteButton>
         )}
         <CloseButton onClick={() => onClose(id)}>X</CloseButton>
         <p><strong>Name: </strong>{name}</p>
         <p><strong>Status: </strong>{status}</p>
         <p><strong>Species: </strong>{species}</p>
         <p><strong>Gender: </strong>{gender}</p>
         <p><strong>Origin: </strong>{origin}</p>
         <img src={image} alt={name} />
      </CardContainer>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id)),
   };
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites,
   };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CardDetail);

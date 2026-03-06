import Card from '../Card/Card';
import StyledCardsContainer from './styledCardsContainer';

export default function Cards({characters, onClose}) {
   return (
   <StyledCardsContainer>
      {
         characters.map(character => <Card
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin.name}
            image={character.image}
            onClose={onClose}
         />)
      }
   </StyledCardsContainer>
   )
}

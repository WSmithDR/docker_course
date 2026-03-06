import axios from "axios"
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import config from "../../config" 
const Detail = ()=>{
    const {id} = useParams()
    const[character, setCharacter] = useState({})
    
    useEffect(() => {
        axios(`${config.api.baseURL}/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id])

    return(
        <div>
            {
                character.name && <div>
                    <p><strong>Name: </strong>{character.name}</p>
                    <p><strong>Status: </strong>{character.status}</p>
                    <p><strong>Species: </strong>{character.species}</p>
                    <p><strong>Gender: </strong>{character.gender}</p>
                    <p><strong>Origin: </strong>{character.origin.name}</p>
                    <img src={character.image} alt={character.name} />
                </div>
            }
        </div>
    )
}

export default Detail
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { useState, useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, rehydrateAuth } from './redux/actions/actions'
import About from './components/About/About';
import Detail from "./components/Detail/Detail"
import Favorites from './components/Favorites/Favorites';
import Login from './components/Login/Login';
import Cards from './components/Cards/Cards';
import axios from 'axios';
import config from "./config";

function App() {
   //Hooks
   const [characters, setCharacters] = useState([])
   const location = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // Obtener estado del Redux store
   const { access, user } = useSelector(state => state)

   // Verificar autenticación al iniciar la app
   useEffect(() => {
      const { hasSession } = dispatch(rehydrateAuth())
      if (!hasSession) {
         navigate('/')
      }
   }, [dispatch, navigate])

   // Redirigir si no hay acceso
   useEffect(() => {
      console.log('Access changed:', access)
      if (!access) {
         console.log('Navigating to /')
         navigate('/')
      }
   }, [access, navigate])
   //Handlers
   const onSearch = async (id) => {
      try {
         const { data } = await axios(`${config.api.baseURL}/character/${id}`)

         if (data.name) setCharacters([...characters, data])

      } catch (error) {
         alert("¡No hay personaje con este Id!")
      }
   }

   const onClose = (id) => {
      const filteredCharacters = characters.filter(character => character.id !== Number(id))
      setCharacters(filteredCharacters)
   }

   const handleLogin = async (userData) => {
      console.log('handleLogin called')
      const result = await dispatch(login(userData))
      console.log('Login result:', result)

      if (result.success) {
         console.log('Navigating to /home')
         navigate("/home")
      } else {
         console.log('Login failed:', result.error)
         alert(result.error || 'Login failed')
      }
   }

   const handleLogout = () => {
      dispatch(logout())
      navigate("/")
   }

   return (
      <div className='App'>
         {
            location.pathname !== "/" ? <NavBar onSearch={onSearch} logOut={handleLogout} /> : null
         }
         <Routes>
            <Route path="/" element={<Login login={handleLogin} />} />
            <Route path="/home" element={<Cards characters={characters} onClose={onClose} />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites onClose={onClose} />} />
         </Routes>
      </div>
   );
}

export default App;
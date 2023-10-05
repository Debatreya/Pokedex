import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
function App() {
  return (
    <>
      <h1 id="pokedex-heading"><Link to='/'>Pokedex</Link></h1>
      <CustomRoutes />
    </>
  )
}

export default App

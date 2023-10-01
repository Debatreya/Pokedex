import "./Pokedex.css"
import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"
export default function Pokedex(){
    
    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">Pokedex</h1>
            <Search />
            <PokemonList />
        </div>
    )
}
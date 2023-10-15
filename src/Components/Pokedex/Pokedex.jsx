import "./Pokedex.css"
import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"
import { useState } from "react"
import PokemonDetails from "../PokemonDetails/PokemonDetails";
export default function Pokedex(){
    const [searchTerm, setsearchTerm] = useState('');
    return(
        <div className="pokedex-wrapper">
            <Search updateSearchTerm={setsearchTerm} />
            {(!searchTerm) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} />}
        </div>
    )
}
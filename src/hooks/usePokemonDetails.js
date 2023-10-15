import axios from "axios";
import { useState, useEffect } from "react";
import usePokemonList from "./usePokemonList";
import { useParams } from "react-router-dom";

export default function usePokemonDetails(id, pokemonName){
    const [pokemon, setPokemon] = useState({});
    const [pokemonListState, setPokemonListState] = usePokemonList(`https://pokeapi.co/api/v2/type/fire`, true)
    async function downloadPokemon(){
        let response;
        if(pokemonName)
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        else
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            moreTypes: response.data.types[0].type.name
        })
        setPokemonListState((state) => ({
            ...state,
            pokedexUrl: `https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : 'fire'}`
        }))
    }
    // console.log(pokemon.types[0]);
    useEffect(() => {
        downloadPokemon();
    }, []);
    return [pokemonListState, pokemon];
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import "./PokemonDetails.css"
import usePokemonDetails from "../../hooks/usePokemonDetails";

export default function PokemonDetails({pokemonName}){
    // let pokemonName
    const {id} = useParams();
    console.log(id);
    const [pokemonListState, pokemon] = usePokemonDetails(id, pokemonName);
    return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} />
            <div className="pokemon-details-name title"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>
            <div>
                More {pokemon.moreTypes} type Pokemons
                <ul>
                    {pokemonListState.PokemonList && pokemonListState.PokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                </ul>
            </div>
        </div>
    )
}
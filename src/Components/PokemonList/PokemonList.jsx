import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

export default function PokemonList() {
    const [pokemonListState, setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon', false);
    return (
        <div className="pokemon-list-wrapper">
            <h3>Pokemon List</h3>
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? 'Loading.....' : 
                    pokemonListState.PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="controls">
                <button className="prev" disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState((state) => ({...state, pokedexUrl: state.prevUrl}))}>Prev</button>
                <button className="next" disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState((state) => ({...state, pokedexUrl: state.nextUrl}))}>Next</button>
            </div>
        </div>
    );
}
